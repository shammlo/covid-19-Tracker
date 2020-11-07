//*** ----------------- IMPORTS ----------------- ***\\
import { DOM } from "./base";

//*************************************************************************************\\
//*** ------------ PRIVATE FUNCTIONS ------------ ***\\

//*************************************************************************************\\

//*** ---------------- CHARTS UI ---------------- ***\\
//- Getting the data from the Api

export const allCountrySearch = (data) => {
    let result = $.map(data, (object) => {
        object.id = object.id || object.countryInfo._id;
        object.text = object.text || object.country;
        object.flag = object.flag || object.countryInfo.flag;
        return object;
    });

    $(".js-data-filter").select2({
        data: result,
        templateResult: formatCountry,
        placeholder: "Country Search",
        allowClear: true,
    });
    $(".pieChart-filler").select2({
        data: result,
        templateResult: formatCountry,
        placeholder: "Country Search",
        allowClear: true,
    });
};

//- Rendering The Filter Country Names and Flag
const formatCountry = (country) => {
    try {
        if (!country) {
            return country.flag;
        }
        if (typeof country.flag === "undefined") {
            // var $state = $(
            //     '<span><img src="img/worldwide-2.svg" class="img-flag" /> ' +
            //         country.text +
            //         "</span>"
            // );
            // return $state;
            return null;
        }
        var baseUrl = "https://raw.githubusercontent.com/NovelCOVID/API/master/assets/flags/";

        var $state = $(
            '<span><img src="' + country.flag + ' " class="img-flag" /> ' + country.text + "</span>"
        );
        return $state;
    } catch (err) {
        console.log(err);
    }
};

const newFromCumulative = (data) => {
    let end = [];
    data.forEach((value, index) => {
        if (index === 0) {
            end.push(0);
        } else {
            end.push(value - data[index - 1]);
        }
    });
    return end;
};

//* Rendering charts

//- Render Cases Chart
export const renderCharts = async (onlyDate, onlyCases, onlyDeaths, onlyRecovered) => {
    //- Rendering Cases Chart
    Chart.defaults.global.defaultFontColor = "#fff";

    let dailyCases = newFromCumulative(onlyCases);

    //var ctx = document.getElementById("cases").getContext("2d");

    //- Daily Cases
    let charts = new Chart(DOM.caseChart, {
        type: "line",
        responsive: true,
        maintainAspectRatio: false,

        //- Data layer start
        data: {
            //- Labels
            labels: onlyDate,

            //- Datasets
            datasets: [
                {
                    data: onlyCases,
                    label: "Cases",
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1,
                    order: 1,
                },
                {
                    data: onlyDeaths,
                    label: "Deaths",
                    backgroundColor: "rgba(214, 102, 121, 0.3)",
                    borderColor: "rgba(214, 102, 121, 1)",
                    borderWidth: 1,
                    order: 3,
                },
                {
                    data: onlyRecovered,
                    label: "Recovered",

                    backgroundColor: "rgba(113, 255, 47, 0.2)",
                    borderColor: "rgba(113, 255, 47, 1)",
                    borderWidth: 1,
                    order: 2,
                },
                // {
                //     label: "Daily Cases",
                //     backgroundColor: "rgba(54, 162, 235, 0.4)",
                //     pointBackgroundColor: "rgba(54, 162, 235, 1)",
                //     borderColor: "rgba(54, 162, 235, 1)",
                //     borderWidth: 1,
                // },
            ],
        },
        //- Data layer end

        //- Options Start
        options: {
            animation: {
                duration: 2000,
                onProgress: function (animation) {
                    charts.value = animation.currentStep / animation.numSteps;
                },
                onComplete: function () {
                    window.setTimeout(function () {
                        charts.value = 0;
                    }, 2000);
                },
            },
            legend: {
                display: false,
                position: "bottom",
                labels: {
                    fontSize: 14,
                    padding: 20,
                },

                onClick: function (e, legendItem) {
                    var index = legendItem.datasetIndex;
                    var ci = this.chart;
                    var alreadyHidden =
                        ci.getDatasetMeta(index).hidden === null
                            ? false
                            : ci.getDatasetMeta(index).hidden;

                    ci.data.datasets.forEach(function (e, i) {
                        var meta = ci.getDatasetMeta(i);

                        if (i !== index) {
                            if (!alreadyHidden) {
                                meta.hidden = meta.hidden === null ? !meta.hidden : null;
                            } else if (meta.hidden === null) {
                                meta.hidden = true;
                            }
                        } else if (i === index) {
                            meta.hidden = null;
                        }
                    });

                    ci.update();
                },
            },

            scales: {
                xAxes: [
                    {
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                    },
                ],
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            callback: function (value) {
                                if (value >= 0 && value < 1000) return value;
                                if (value >= 1000 && value < 1000000) return value / 1000 + "k";
                                if (value >= 1000000 && value < 1000000000)
                                    return value / 1000000 + "m";
                                return value;
                            },
                        },
                    },
                ],
            },
        },
        //- Options end
    });

    DOM.button1.addEventListener("click", () => {
        charts.data.datasets = [];

        charts.config.type = "line";
        charts.config.label = "Total Cases";

        charts.data.datasets.push(
            {
                data: onlyCases,
                label: "Cases",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
                order: 1,
            },
            {
                data: onlyDeaths,
                label: "Deaths",
                backgroundColor: "rgba(214, 102, 121, 0.3)",
                borderColor: "rgba(214, 102, 121, 1)",
                borderWidth: 1,
                order: 3,
            },
            {
                data: onlyRecovered,
                label: "Recovered",

                backgroundColor: "rgba(113, 255, 47, 0.2)",
                borderColor: "rgba(113, 255, 47, 1)",
                borderWidth: 1,
                order: 2,
            }
        );
        charts.update();
    });

    //- Button 2
    DOM.button2.addEventListener("click", () => {
        charts.data.datasets = [];
        // charts.data.datasets.data[1] = [];
        // charts.data.datasets.data[2] = [];

        charts.type = "";
        charts.config.type = "doughnut";
        charts.data.datasets.push(
            {
                label: "Daily Cases",
                data: dailyCases,
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                pointBackgroundColor: "rgba(54, 162, 235, 1)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
                order: 1,
            },
            {
                data: onlyDeaths,
                label: "Deaths",
                backgroundColor: "rgba(214, 102, 121, 0.2)",
                borderColor: "rgba(214, 102, 121, 1)",
                borderWidth: 1,
                order: 2,
            },
            {
                data: onlyRecovered,
                label: "Recovered",
                backgroundColor: "rgba(113, 255, 47, 0.2)",
                borderColor: "rgba(113, 255, 47, 1)",
                borderWidth: 1,
                order: 3,
            }
        );

        charts.update();
    });

    //--------------------------------------------------------------------------
};

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const globalPieChart = async (data) => {
    console.log(data);
    //- Global
    const cases = await data.cases;
    const active = await data.active;
    const critical = await data.critical;
    const recovered = await data.recovered;
    const deaths = await data.deaths;

    //- Today
    const todayCases = await data.todayCases;
    const todayDeaths = await data.todayDeaths;
    const todayRecovered = await data.todayRecovered;
    const casePerOneM = await data.casesPerOneMillion;
    const deathPerOneM = await data.deathPerOneMillion;
    const recoveredPerOneM = await data.recoveredPerOneMillion;
    const tests = await data.tests;

    am4core.ready(function () {
        // Themes begin
        am4core.useTheme(am4themes_dark);
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chartdiv", am4charts.PieChart);
        var chart2 = am4core.create("chartdiv2", am4charts.PieChart);
        chart.background.fill = "rgb(36, 35, 35)";
        chart2.background.fill = "rgb(36, 35, 35)";

        // Add data
        chart.data = [
            {
                title: "Cases",
                value: cases,
                color: am4core.color("#388DB2"),
            },
            {
                title: "Active",
                value: active,
                color: am4core.color("#6794DC"),
            },
            {
                title: "Recovered",
                value: recovered,
                color: am4core.color("#4CB27F"),
            },
            {
                title: "Deaths",
                value: deaths,
                color: am4core.color("#902C2D"),
            },
        ];
        chart2.data = [
            {
                title: "Today Cases",
                value: todayCases,
                color: am4core.color("#67B7DC"),
            },

            {
                title: "Today Recovered",
                value: todayRecovered,
                color: am4core.color("#69D7A0"),
            },
            {
                title: "Today Deaths",
                value: todayDeaths,
                color: am4core.color("#FF5043"),
            },
        ];

        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "value";
        pieSeries.dataFields.category = "title";
        pieSeries.labels.template.text = "{category}: {value}";
        pieSeries.slices.template.tooltipText = "{category}: {value}";
        pieSeries.labels.template.maxWidth = 110;
        pieSeries.labels.template.wrap = true;
        chart.responsive.enabled = true;
        chart.radius = am4core.percent(75);
        chart.responsive.rules.push({
            relevant: function (target) {
                if (target.pixelWidth <= 500) {
                    return true;
                }
                return false;
            },
            state: function (target, stateId) {
                if (
                    target instanceof am4charts.Chart ||
                    target instanceof am4charts.PieSeries ||
                    target instanceof am4charts.Legend
                ) {
                    let state = target.states.create(stateId);
                    state.properties.radius = am4core.percent(80);
                    state.properties.alignLabels = false;

                    return state;
                }
                return null;
            },
        });
        chart.responsive.rules.push({
            relevant: function (target) {
                if (target.pixelWidth <= 375) {
                    return true;
                }
                return false;
            },
            state: function (target, stateId) {
                if (target instanceof am4charts.Chart || target instanceof am4charts.PieSeries) {
                    let state = target.states.create(stateId);
                    state.properties.radius = am4core.percent(70);
                    return state;
                }
                if (target instanceof am4charts.Legend) {
                    let state = target.states.create(stateId);
                    state.properties.maxWidth = 200;

                    return state;
                }
                return null;
            },
        });
        // pieSeries.labels.template.fontSize = 11;
        pieSeries.alignLabels = true;

        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeOpacity = 1;
        pieSeries.slices.template.propertyFields.fill = "color";
        pieSeries.slices.template.events.on("hit", function (ev) {
            console.log(ev.target.dataItem.value);
        });
        chart.legend = new am4charts.Legend();

        // This creates initial animation
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;

        chart.hiddenState.properties.radius = am4core.percent(0);
        chart.hiddenState.transitionDuration = 500;
        chart.preloader.disabled = false;

        //------------------------------------------------
        //- Today's Chart
        var pieSeries2 = chart2.series.push(new am4charts.PieSeries());
        pieSeries2.dataFields.value = "value";
        pieSeries2.dataFields.category = "title";
        pieSeries2.labels.template.text = "{category}: {value}";
        pieSeries2.slices.template.tooltipText = "{category}: {value}";
        pieSeries2.labels.template.maxWidth = 110;
        pieSeries2.labels.template.wrap = true;
        chart2.responsive.enabled = true;
        chart2.radius = am4core.percent(75);
        chart2.responsive.rules.push({
            relevant: function (target) {
                if (target.pixelWidth <= 500) {
                    return true;
                }
                return false;
            },
            state: function (target, stateId) {
                if (
                    target instanceof am4charts.Chart ||
                    target instanceof am4charts.PieSeries ||
                    target instanceof am4charts.Legend
                ) {
                    let state = target.states.create(stateId);
                    state.properties.radius = am4core.percent(80);
                    state.properties.alignLabels = false;

                    return state;
                }
                return null;
            },
        });
        chart2.responsive.rules.push({
            relevant: function (target) {
                if (target.pixelWidth <= 375) {
                    return true;
                }
                return false;
            },
            state: function (target, stateId) {
                if (target instanceof am4charts.Chart || target instanceof am4charts.PieSeries) {
                    let state = target.states.create(stateId);
                    state.properties.radius = am4core.percent(70);
                    state.properties.paddingTop = 0;
                    state.properties.paddingRight = 25;
                    state.properties.paddingBottom = 0;
                    state.properties.paddingLeft = 7;

                    return state;
                } else if (target instanceof am4charts.Legend) {
                    let state = target.states.create(stateId);
                    // state.properties.maxWidth = 100;
                    // state.properties.maxHeight = 120;
                    var labelState = target.labels.template.states.create(stateId);
                    labelState.properties.maxWidth = 0;
                    labelState.properties.truncate = true;

                    return state;
                }
                // else if (
                //     target instanceof am4charts.AxisLabelCircular ||
                //     target instanceof am4charts.PieTick
                // ) {
                //     var state = target.states.create(stateId);
                //     state.properties.disabled = true;
                //     return state;
                // }
                return null;
            },
        });
        // pieSeries.labels.template.fontSize = 11;
        pieSeries2.alignLabels = true;

        pieSeries2.slices.template.stroke = am4core.color("#fff");
        pieSeries2.slices.template.strokeOpacity = 1;
        pieSeries2.slices.template.propertyFields.fill = "color";
        chart2.legend = new am4charts.Legend();

        // This creates initial animation
        pieSeries2.hiddenState.properties.opacity = 1;
        pieSeries2.hiddenState.properties.endAngle = -90;
        pieSeries2.hiddenState.properties.startAngle = -90;

        chart2.hiddenState.properties.radius = am4core.percent(0);
        chart2.hiddenState.transitionDuration = 500;
        chart2.preloader.disabled = false;

        //---------------------------------------------------------------------

        $(".pieChart-filler").on("select2:select", function (data) {
            $("#flag2").remove();

            $("#country-cases-daily").remove();

            $("#country-cases").remove();

            var imageUrl = data.params.data.flag;
            $(".select2-selection__rendered")
                .eq(1)
                .prepend("<img class='img-flag' src=" + imageUrl + ">");

            // if (typeof imageUrl === "undefined") {
            //     return $(".text-big")
            //         .first()
            //         .prepend("<img  id='flag' class='img-flag__main' src='img/worldwide-2.svg'>");
            // }
            $(".text-big")
                .eq(1)
                .prepend("<img  id='flag2' class='img-flag__main' src=" + imageUrl + ">");
            $(".text-big")
                .eq(2)
                .prepend("<img  id='flag2' class='img-flag__main' src=" + imageUrl + ">");
            const query = data.params.data.country;
            //var url = "https://disease.sh/v3/covid-19/historical/" + query + "?lastdays=all";
            $.ajax({
                url:
                    "https://disease.sh/v3/covid-19/countries/" +
                    query +
                    "?yesterday=true&twoDaysAgo=false",
                type: "GET",
                dataType: "json",
                // data: { url: url },
                "X-Requested-With": "XMLHttpRequest",
                success: async (data) => {
                    // chart.dispose();

                    const cases = await data.cases;
                    const active = await data.active;
                    const critical = await data.critical;
                    const recovered = await data.recovered;
                    const deaths = await data.deaths;

                    //- Today
                    const todayCases = await data.todayCases;
                    const todayDeaths = await data.todayDeaths;
                    const todayRecovered = await data.todayRecovered;
                    const casePerOneM = await data.casesPerOneMillion;
                    const deathPerOneM = await data.deathPerOneMillion;
                    const recoveredPerOneM = await data.recoveredPerOneMillion;
                    const tests = await data.tests;

                    console.log(data);

                    //----------------------------------------------------------------

                    //* Chart
                    //- chart section

                    // $("#chartdiv").remove();
                    // $("#pieCharting").prepend(
                    //     '<div id="chartdiv" style="background-color: var(--dark-4)"></div>'
                    // );

                    chart.data = [
                        {
                            title: "Cases",
                            value: cases,
                            color: am4core.color("#67B7DC"),
                        },
                        {
                            title: "Active",
                            value: active,
                            color: am4core.color("#6794DC"),
                        },
                        {
                            title: "Recovered",
                            value: recovered,
                            color: am4core.color("#4CB27F"),
                        },
                        {
                            title: "Deaths",
                            value: deaths,
                            color: am4core.color("#902C2D"),
                        },
                    ];
                    chart2.data = [
                        {
                            title: "Today Cases",
                            value: cases,
                            color: am4core.color("#67B7DC"),
                        },
                        {
                            title: "Today",
                            value: active,
                            color: am4core.color("#6794DC"),
                        },
                        {
                            title: "Today Recovered",
                            value: recovered,
                            color: am4core.color("#4CB27F"),
                        },
                        {
                            title: "Today Deaths",
                            value: deaths,
                            color: am4core.color("#902C2D"),
                        },
                        // {
                        //     title: "Cases Per 1M",
                        //     value: casePerOneM,
                        //     color: am4core.color("#C767DC"),
                        // },
                        // {
                        //     title: "Deaths Per 1M",
                        //     value: deathPerOneM,
                        //     color: am4core.color("#902C2D"),
                        // },
                        // {
                        //     title: "Recovered Per 1M",
                        //     value: recoveredPerOneM,
                        //     color: am4core.color("#559F7A"),
                        // },
                    ];
                    chart.invalidateRawData();
                    chart2.invalidateRawData();
                },
                error: (error) => {
                    console.log(error);
                },
            });
        });

        // $(".pieChart-filler").on("select2:select", function () {
        //     chart.dispose();
        // });
        //------------------------------------------------------------------------------
        //- Select2 Function
    }); // end am4core.ready()
};
