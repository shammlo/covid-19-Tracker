//*** ----------------- IMPORTS ----------------- ***\\
import { DOM } from "./base";

//*************************************************************************************\\
//*** ------------ PRIVATE FUNCTIONS ------------ ***\\
String.prototype.toArabicDigits = function () {
    var id = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return this.replace(/[0-9]/g, function (w) {
        return id[+w];
    });
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

//*************************************************************************************\\
//*** ------------- GLOBAL VARIABLE -------------- ***\\
const path = document.location.pathname;

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
    var data = [
        {
            id: 1,
            value: "eng",
            text: "English",
            img: "img/English(default).svg",
            url: "index.html",
        },
        {
            id: 2,
            value: "kur",
            text: "Kurdish",
            img: "img/kurd.png",
            url: "kurdish.html",
        },
        {
            id: 3,
            value: "ar",
            text: "Arabic",
            img: "img/arabic.png",
            url: "arabic.html",
        },
    ];
    var data2 = [
        {
            id: 1,
            value: "ar",
            text: "الــعــربــيــة",
            img: "img/arabic.png",
            url: "arabic.html",
        },
        {
            id: 2,
            value: "kur",
            text: "كـــردي",
            img: "img/kurd.png",
            url: "kurdish.html",
        },
        {
            id: 3,
            value: "eng",
            text: "الـإنـجـلـيـزيـة",
            img: "img/English(default).svg",
            url: "index.html",
        },
    ];
    var data3 = [
        {
            id: 1,
            value: "kur",
            text: "كـوردی",
            img: "img/kurd.png",
            url: "kurdish.html",
        },
        {
            id: 2,
            value: "ar",
            text: "عـەرەبـی",
            img: "img/arabic.png",
            url: "arabic.html",
        },
        {
            id: 3,
            value: "eng",
            text: "ئــیــنـگـلـیـزی",
            img: "img/English(default).svg",
            url: "index.html",
            // "ئــیــنـگـلـیـزی (بـە بـنـەڕەت)",
        },
    ];
    let languages = (data) => {
        // return data.html;

        if (typeof data.img === "undefined") {
            let $new = $(
                '<span class="language-items" ><a class="lang-items" href="' +
                    data.url +
                    '">' +
                    data.text +
                    "</a></span>"
            );
            return $new;
        }
        // background-color:#303030";
        var $state = $(
            '<span class="language-items" value="' +
                data.value +
                '"><img src="' +
                data.img +
                ' " class="img-flag" /><a class="lang-items" href="' +
                data.url +
                '">' +
                data.text +
                "</a></span>"
        );

        return $state;
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
                '<span><img src="' +
                    country.flag +
                    ' " class="img-flag" /> ' +
                    country.text +
                    "</span>"
            );
            return $state;
        } catch (err) {
            console.log(err);
        }
    };

    if (path == "/arabic.html") {
        $(".js-data-filter").select2({
            data: result,
            templateResult: formatCountry,
            placeholder: "ابحث عن الدولة",
            allowClear: true,
            tags: true,
        });

        $(".pieChart-filler").select2({
            data: result,
            templateResult: formatCountry,
            placeholder: "ابحث عن الدولة",
            allowClear: true,
            tags: true,
        });
        $(".language-data").select2({
            data: data2,
            templateResult: languages,
            minimumResultsForSearch: Infinity,
            placeholder: `<span class="language__info" style="display: flex; align-items: center;" ><img src="img/arabic.png" class="img-flag" /> الــعــربــيــة</span>`,
            allowClear: true,
            escapeMarkup: function (m) {
                return m;
            },
            dropdownCssClass: "increase-zIndex",
            // tags: true,
        });
    } else if (path == "/kurdish.html") {
        $(".js-data-filter").select2({
            data: result,
            templateResult: formatCountry,
            placeholder: "بـەدواداگـەڕانـی وڵـاتـان",
            allowClear: true,
            tags: true,
        });

        $(".pieChart-filler").select2({
            data: result,
            templateResult: formatCountry,
            placeholder: "بـەدواداگـەڕانـی وڵـاتـان",
            allowClear: true,
            tags: true,
        });
        $(".language-data").select2({
            data: data3,
            templateResult: languages,
            minimumResultsForSearch: Infinity,
            placeholder: `<span class="language__info" style="display: flex; align-items: center;"><img src="img/kurd.png" class="img-flag" /> كـوردی</span>`,
            allowClear: true,
            escapeMarkup: function (m) {
                return m;
            },
            dropdownCssClass: "increase-zIndex",
            // tags: true,
        });
    } else {
        $(".js-data-filter").select2({
            data: result,
            templateResult: formatCountry,
            placeholder: "Country Search",
            allowClear: true,
            tags: true,
        });

        $(".pieChart-filler").select2({
            data: result,
            templateResult: formatCountry,
            placeholder: "Country Search",
            allowClear: true,
            tags: true,
        });

        $(".language-data").select2({
            data: data,
            templateResult: languages,
            minimumResultsForSearch: Infinity,
            placeholder: `<span class="language__info" style="display: flex; align-items: center;" ><img src="img/English(default).svg" class="img-flag" />English</span>`,
            allowClear: true,
            escapeMarkup: function (m) {
                return m;
            },
            dropdownCssClass: "increase-zIndex",
            // tags: true,
        });
    }
    $(".language-data").on("select2:select", function (e) {
        window.open(e.params.data.url, "_self");
    });
    // $(".language-data").on("change", function () {
    //     $(".select2-results__option--selected").hide();
    //     $("." + $(this).val()).show();
    // });
};

//* Rendering charts

//- Render Cases Chart
export const renderCharts = async (onlyDate, onlyCases, onlyDeaths, onlyRecovered) => {
    //- Rendering Cases Chart

    Chart.defaults.global.defaultFontColor = "#737373";
    const engData = {
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
        ],
    };

    const kurdData = {
        //- Labels
        labels: onlyDate,

        //- Datasets
        datasets: [
            {
                data: onlyCases,
                label: "تــوشـبـووان",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
                order: 1,
            },
            {
                data: onlyDeaths,
                label: "قـوربـانـیـان",
                backgroundColor: "rgba(214, 102, 121, 0.3)",
                borderColor: "rgba(214, 102, 121, 1)",
                borderWidth: 1,
                order: 3,
            },
            {
                data: onlyRecovered,
                label: "چـاكـبـوونـەوە",

                backgroundColor: "rgba(113, 255, 47, 0.2)",
                borderColor: "rgba(113, 255, 47, 1)",
                borderWidth: 1,
                order: 2,
            },
        ],
    };
    const arData = {
        //- Labels
        labels: onlyDate,

        //- Datasets
        datasets: [
            {
                data: onlyCases,
                label: "حالات",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
                order: 1,
            },
            {
                data: onlyDeaths,
                label: "حالات الوفاة",
                backgroundColor: "rgba(214, 102, 121, 0.3)",
                borderColor: "rgba(214, 102, 121, 1)",
                borderWidth: 1,
                order: 3,
            },
            {
                data: onlyRecovered,
                label: "تعافى",
                backgroundColor: "rgba(113, 255, 47, 0.2)",
                borderColor: "rgba(113, 255, 47, 1)",
                borderWidth: 1,
                order: 2,
            },
        ],
    };

    //- Daily Cases
    let charts = new Chart(DOM.caseChart, {
        type: "line",
        responsive: true,
        maintainAspectRatio: false,

        //- Data layer start
        data: engData,
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
                display: true,
                position: "top",
                labels: {
                    fontSize: 14,
                    padding: 4,
                },
                maxSize: {
                    height: 10,
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
                            fontSize: 16,
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

    if (path == "/arabic.html") {
        charts.data = arData;
        charts.options.scales.yAxes = [];
        charts.options.scales.xAxes = [];
        (charts.options.legend.labels = {
            fontSize: 16,
            padding: 4,
        }),
            charts.options.scales.xAxes.push({
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                },

                ticks: {
                    fontSize: 14,
                    callback: function (value) {
                        return value.toString().toArabicDigits();
                    },
                },
            });
        charts.options.scales.yAxes.push({
            ticks: {
                fontSize: 16,
                beginAtZero: true,
                callback: function (value) {
                    if (value >= 0 && value < 1000) return value.toString().toArabicDigits();
                    if (value >= 1000 && value < 1000000)
                        return (value / 1000).toString().toArabicDigits() + "الف";
                    if (value >= 1000000 && value < 1000000000)
                        return (value / 1000000).toString().toArabicDigits() + "م";
                    return value.toString().toArabicDigits();
                },
            },
        });

        charts.update();
    } else if (path == "/kurdish.html") {
        charts.data = kurdData;
        charts.options.scales.yAxes = [];
        charts.options.scales.xAxes = [];
        (charts.options.legend.labels = {
            fontSize: 16,
            padding: 4,
        }),
            charts.options.scales.xAxes.push({
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                },

                ticks: {
                    fontSize: 14,
                    callback: function (value) {
                        return value.toString().toArabicDigits();
                    },
                },
            });
        charts.options.scales.yAxes.push({
            ticks: {
                fontSize: 16,
                beginAtZero: true,
                callback: function (value) {
                    if (value >= 0 && value < 1000) return value.toString().toArabicDigits();
                    if (value >= 1000 && value < 1000000)
                        return (value / 1000).toString().toArabicDigits() + "ھـەزار";
                    if (value >= 1000000 && value < 1000000000)
                        return (value / 1000000).toString().toArabicDigits() + "م";
                    return value.toString().toArabicDigits();
                },
            },
        });

        charts.update();
    }

    //-------------------------------------------------------------------------
};

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const globalPieChart = async (data) => {
    //- Global
    const cases = await data.cases;
    const active = await data.active;
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
        // chart.background.fill = "rgb(36, 35, 35)";
        // chart2.background.fill = "rgb(36, 35, 35)";

        // Add data
        const engData = [
            {
                title: "Cases",
                value: cases,
                color: am4core.color("#388DB2"),
            },
            {
                title: "Active",
                value: active,
                color: am4core.color("#C767DC"),
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
        const engData2 = [
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

        const kurdData = [
            {
                title: "تــوشـبـووان",
                value: cases,
                color: am4core.color("#388DB2"),
            },
            {
                title: "حـاڵـەتـە چـاڵـاكـەكـان",
                value: active,
                color: am4core.color("#C767DC"),
            },
            {
                title: "چـاكـبـوونـەوە",
                value: recovered,
                color: am4core.color("#4CB27F"),
            },
            {
                title: "قـوربـانـیـان",
                value: deaths,
                color: am4core.color("#902C2D"),
            },
        ];
        const kurdData2 = [
            {
                title: "تــوشبـووانـی ئـەمـڕۆ",
                value: todayCases,
                color: am4core.color("#67B7DC"),
            },

            {
                title: "چاكبـوونەوەی ئـەمـڕۆ",
                value: todayRecovered,
                color: am4core.color("#69D7A0"),
            },
            {
                title: "قـوربـانـیـانـی ئـەمـڕۆ",
                value: todayDeaths,
                color: am4core.color("#FF5043"),
            },
        ];
        const arabic = [
            {
                title: "حالات",
                value: cases,
                color: am4core.color("#388DB2"),
            },
            {
                title: "حالات نشطة",
                value: active,
                color: am4core.color("#C767DC"),
            },
            {
                title: "تعافى",
                value: recovered,
                color: am4core.color("#4CB27F"),
            },
            {
                title: "الوفاة",
                value: deaths,
                color: am4core.color("#902C2D"),
            },
        ];
        const arabic2 = [
            {
                title: " حالات اليوم",
                value: todayCases,
                color: am4core.color("#67B7DC"),
            },

            {
                title: " تعافى اليوم",
                value: todayRecovered,
                color: am4core.color("#69D7A0"),
            },
            {
                title: " وفيات اليوم",
                value: todayDeaths,
                color: am4core.color("#FF5043"),
            },
        ];
        chart.data = engData;
        chart2.data = engData2;

        var pieSeries = chart.series.push(new am4charts.PieSeries());
        // pieSeries.tooltip.label.fill = am4core.color("#696969");

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
            // console.log(ev.target.dataItem.value);
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

        $(".theme-switch").on("click", () => {
            if ($("body").hasClass("light-theme")) {
                pieSeries.labels.template.fill = am4core.color("#696969");
                pieSeries2.labels.template.fill = am4core.color("#696969");
                chart.legend.valueLabels.template.fill = am4core.color("#696969");
                chart2.legend.valueLabels.template.fill = am4core.color("#696969");
                chart.legend.labels.template.fill = am4core.color("#696969");
                chart2.legend.labels.template.fill = am4core.color("#696969");
            } else {
                pieSeries.labels.template.fill = am4core.color("white");
                pieSeries2.labels.template.fill = am4core.color("white");
                chart.legend.valueLabels.template.fill = am4core.color("white");
                chart2.legend.valueLabels.template.fill = am4core.color("white");
                chart.legend.labels.template.fill = am4core.color("white");
                chart2.legend.labels.template.fill = am4core.color("white");
            }
        });

        if (path == "/kurdish.html") {
            chart.rtl = true;
            chart2.rtl = true;
            chart.legend.itemContainers.template.reverseOrder = true;
            chart2.legend.itemContainers.template.reverseOrder = true;
            chart.data = kurdData;
            chart2.data = kurdData2;
        } else if (path == "/arabic.html") {
            chart.rtl = true;
            chart2.rtl = true;
            chart.legend.itemContainers.template.reverseOrder = true;
            chart2.legend.itemContainers.template.reverseOrder = true;
            chart.data = arabic;
            chart2.data = arabic2;
        }
        //---------------------------------------------------------------------

        $(".pieChart-filler").on("select2:select", function (data) {
            $("#flag2").remove();
            $("#flag3").remove();
            $("#worldTot2").remove();
            $("#worldTot3").remove();

            $("#country-cases-daily").remove();

            // $("#country-cases").remove();

            var imageUrl = data.params.data.flag;
            $(".select2-selection__rendered")
                .eq(2)
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
                .prepend("<img  id='flag3' class='img-flag__main' src=" + imageUrl + ">");
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

                    // console.log(data);

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
                            color: am4core.color("#C767DC"),
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
                            title: "Today Recovered",
                            value: recovered,
                            color: am4core.color("#4CB27F"),
                        },
                        {
                            title: "Today Deaths",
                            value: deaths,
                            color: am4core.color("#902C2D"),
                        },
                    ];
                    chart.invalidateRawData();
                    chart2.invalidateRawData();

                    const kurdData = [
                        {
                            title: "دۆسیـە",
                            value: cases,
                            color: am4core.color("#388DB2"),
                        },
                        {
                            title: "چـاڵـاك",
                            value: active,
                            color: am4core.color("#C767DC"),
                        },
                        {
                            title: "چـاكـبـوونـەوە",
                            value: recovered,
                            color: am4core.color("#4CB27F"),
                        },
                        {
                            title: "مردووان",
                            value: deaths,
                            color: am4core.color("#902C2D"),
                        },
                    ];
                    const kurdData2 = [
                        {
                            title: "كـەیسەكانی ئـەمـرۆ",
                            value: todayCases,
                            color: am4core.color("#67B7DC"),
                        },

                        {
                            title: "چاكبـوونەوەی ئەمڕۆ",
                            value: todayRecovered,
                            color: am4core.color("#69D7A0"),
                        },
                        {
                            title: "مـردووانی ئەمڕۆ",
                            value: todayDeaths,
                            color: am4core.color("#FF5043"),
                        },
                    ];

                    const arabic = [
                        {
                            title: "حالات",
                            value: cases,
                            color: am4core.color("#388DB2"),
                        },
                        {
                            title: "حالات نشطة",
                            value: active,
                            color: am4core.color("#C767DC"),
                        },
                        {
                            title: "تعافى",
                            value: recovered,
                            color: am4core.color("#4CB27F"),
                        },
                        {
                            title: "الوفاة",
                            value: deaths,
                            color: am4core.color("#902C2D"),
                        },
                    ];
                    const arabic2 = [
                        {
                            title: " حالات اليوم",
                            value: todayCases,
                            color: am4core.color("#67B7DC"),
                        },

                        {
                            title: " تعافى اليوم",
                            value: todayRecovered,
                            color: am4core.color("#69D7A0"),
                        },
                        {
                            title: " وفيات اليوم",
                            value: todayDeaths,
                            color: am4core.color("#FF5043"),
                        },
                    ];

                    if (path == "/kurdish.html") {
                        chart.rtl = true;
                        chart2.rtl = true;
                        chart.legend.itemContainers.template.reverseOrder = true;
                        chart2.legend.itemContainers.template.reverseOrder = true;
                        chart.data = kurdData;
                        chart2.data = kurdData2;
                    }
                    if (path == "/arabic.html") {
                        chart.rtl = true;
                        chart2.rtl = true;
                        chart.legend.itemContainers.template.reverseOrder = true;
                        chart2.legend.itemContainers.template.reverseOrder = true;
                        chart.data = arabic;
                        chart2.data = arabic2;
                    }
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
