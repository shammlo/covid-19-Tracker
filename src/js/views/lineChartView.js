//*** ----------------- IMPORTS ----------------- ***\\
import { DOM } from "./base";

//*************************************************************************************\\

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

//*** ---------------- SEARCH UI ---------------- ***\\
//- Getting search input from the DOM function
export const getInput = () => DOM.searchInput.value;

export const clearSearch = () => {
    DOM.searchInput.value = "";
};

//- Rendering Country name and flag on table
// export const renderCountry = async (data, imgUrl) => {
//     $("#country-cases-daily").remove();
//     $("#country-cases").remove();
//     const imageUrl = await imgUrl;
//     $(".select2-selection__rendered")
//         .first()
//         .prepend("<img class='img-flag' src=" + imageUrl + ">");
//     $(".append-flag")
//         .first()
//         .prepend("<img  id='flag' class='img-flag' src=" + imageUrl + ">");
// };
$(".js-data-filter").on("select2:select", function (data) {
    $("#flag").remove();

    $("#country-cases").remove();

    var imageUrl = data.params.data.flag;
    $(".select2-selection__rendered")
        .first()
        .prepend("<img class='img-flag' src=" + imageUrl + ">");

    // if (typeof imageUrl === "undefined") {
    //     return $(".text-big")
    //         .first()
    //         .prepend("<img  id='flag' class='img-flag__main' src='img/worldwide-2.svg'>");
    // }
    $(".text-big")
        .first()
        .prepend("<img  id='flag' class='img-flag__main' src=" + imageUrl + ">");
    const query = data.params.data.country;
    //var url = "https://disease.sh/v3/covid-19/historical/" + query + "?lastdays=all";
    $.ajax({
        url: "https://disease.sh/v3/covid-19/historical/" + query + "?lastdays=all",
        type: "GET",
        dataType: "json",
        // data: { url: url },
        "X-Requested-With": "XMLHttpRequest",
        success: async (data) => {
            // var split = data.split("|");
            // var values = String(split[0]);
            // var dates = String(split[1]);
            // console.log(values);
            // console.log(dates);
            console.log(data);

            //----------------------------------------------------------------

            //* Chart
            //- chart section

            // casecharting.destroy();
            $("#cases").remove();
            $("#lineChart").prepend(
                '<canvas id="country-cases" style="display: block; width: 90rem; height: 45rem"><canvas>'
            );
            const result = await data;
            const name = result.country;
            const cases = await Object.values(result.timeline.cases);
            const deaths = await Object.values(result.timeline.deaths);
            const recovered = await Object.values(result.timeline.recovered);
            const dates = await Object.keys(result.timeline.cases);
            const countryChart = document.querySelector("#country-cases").getContext("2d");
            Chart.defaults.global.defaultFontColor = "#fff";
            const countryCasesChart = new Chart(countryChart, {
                type: "line",
                responsive: true,

                //- Data layer start
                data: {
                    //- Labels
                    labels: dates,

                    label: name,
                    //- Datasets
                    datasets: [
                        {
                            data: cases,
                            label: "Cases",
                            backgroundColor: "rgba(54, 162, 235, 0.2)",
                            pointBackgroundColor: "rgba(54, 162, 235, 1)",
                            borderColor: "rgba(54, 162, 235, 1)",
                            borderWidth: 1,
                        },
                        {
                            data: deaths,
                            label: "Deaths",
                            backgroundColor: "rgba(214, 102, 121, 0.3)",
                            borderColor: "rgba(214, 102, 121, 1)",
                            borderWidth: 1,
                            order: 2,
                        },
                        {
                            data: recovered,
                            label: "Recovered",

                            backgroundColor: "rgba(113, 255, 47, 0.2)",
                            borderColor: "rgba(113, 255, 47, 1)",
                            borderWidth: 1,
                            order: 3,
                        },
                    ],
                },
                //- Data layer end

                //- Options Start
                options: {
                    legend: {
                        display: true,
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
                                        if (value >= 1000 && value < 1000000)
                                            return value / 1000 + "k";
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

            // console.log(dates);
            DOM.button1.addEventListener("click", () => {
                countryCasesChart.data.datasets = [];

                countryCasesChart.config.type = "line";
                countryCasesChart.config.label = "Total Cases";

                countryCasesChart.data.datasets.push({
                    label: "Total Cases",
                    backgroundColor: "rgba(54, 162, 235, 0.4)",
                    pointBackgroundColor: "rgba(54, 162, 235, 1)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1,
                    data: cases,
                });
                countryCasesChart.update();
            });

            const barCases = newFromCumulative(cases);
            DOM.button2.addEventListener("click", () => {
                countryCasesChart.data.datasets = [];
                countryCasesChart.type = "";
                countryCasesChart.config.type = "bar";
                countryCasesChart.data.datasets.push({
                    label: "Daily Cases",
                    data: barCases,
                    backgroundColor: "rgba(54, 162, 235, 0.4)",
                    pointBackgroundColor: "rgba(54, 162, 235, 1)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1,
                });

                countryCasesChart.update();
            });

            //- console which data selected
            // $(".js-data-filter").on("change", function (evt) {
            //     if ($(".js-data-filter").select2("val") != null) {
            //         console.log($(".js-data-filter").select2("data")[0]);
            //     }
            // });
        },
        error: (error) => {
            console.log(error);
        },
    });
});

//----------------------------------------------------------------
// $(".pieChart-filler").on("select2:select", function (data) {
//     $("#flag2").remove();

//     $("#country-cases-daily").remove();

//     $("#country-cases").remove();

//     var imageUrl = data.params.data.flag;
//     $(".select2-selection__rendered")
//         .eq(1)
//         .prepend("<img class='img-flag' src=" + imageUrl + ">");

//     // if (typeof imageUrl === "undefined") {
//     //     return $(".text-big")
//     //         .first()
//     //         .prepend("<img  id='flag' class='img-flag__main' src='img/worldwide-2.svg'>");
//     // }
//     $(".text-big")
//         .eq(1)
//         .prepend("<img  id='flag2' class='img-flag__main' src=" + imageUrl + ">");
//     const query = data.params.data.country;
//     //var url = "https://disease.sh/v3/covid-19/historical/" + query + "?lastdays=all";
//     $.ajax({
//         url:
//             "https://disease.sh/v3/covid-19/countries/" +
//             query +
//             "?yesterday=true&twoDaysAgo=false",
//         type: "GET",
//         dataType: "json",
//         // data: { url: url },
//         "X-Requested-With": "XMLHttpRequest",
//         success: async (data) => {
//             // chart.dispose();

//             const cases = await data.cases;
//             const active = await data.active;
//             const tests = await data.tests;
//             const critical = await data.critical;
//             const recovered = await data.recovered;
//             const deaths = await data.deaths;

//             console.log(data);

//             //----------------------------------------------------------------

//             //* Chart
//             //- chart section

//             // $("#chartdiv").remove();
//             // $("#pieCharting").prepend(
//             //     '<div id="chartdiv" style="background-color: var(--dark-4)"></div>'
//             // );
//             am4core.ready(function () {
//                 // Themes begin
//                 am4core.useTheme(am4themes_dark);
//                 am4core.useTheme(am4themes_animated);
//                 // Themes end

//                 // Create chart instance
//                 var chart2 = am4core.create("chartdiv", am4charts.PieChart);
//                 chart2.background.fill = "rgb(36, 35, 35)";

//                 // Add data
//                 chart2.data = [
//                     {
//                         title: "Cases",
//                         value: cases,
//                         color: am4core.color("#67B7DC"),
//                     },
//                     {
//                         title: "Active",
//                         value: active,
//                         color: am4core.color("#6794DC"),
//                     },
//                     {
//                         title: "Recovered",
//                         value: recovered,
//                         color: am4core.color("#4CB27F"),
//                     },
//                     {
//                         title: "Deaths",
//                         value: deaths,
//                         color: am4core.color("#902C2D"),
//                     },
//                 ];

//                 // Add and configure Series
//                 var pieSeries = chart2.series.push(new am4charts.PieSeries());
//                 pieSeries.dataFields.value = "value";
//                 pieSeries.dataFields.category = "title";
//                 pieSeries.labels.template.text = "{category}: {value}";
//                 pieSeries.slices.template.tooltipText = "{category}: {value}";
//                 pieSeries.labels.template.maxWidth = 110;
//                 pieSeries.labels.template.wrap = true;
//                 chart2.responsive.enabled = true;
//                 chart2.radius = am4core.percent(75);
//                 chart2.responsive.rules.push({
//                     relevant: function (target) {
//                         if (target.pixelWidth <= 500) {
//                             return true;
//                         }
//                         return false;
//                     },
//                     state: function (target, stateId) {
//                         if (
//                             target instanceof am4charts.Chart ||
//                             target instanceof am4charts.PieSeries ||
//                             target instanceof am4charts.Legend
//                         ) {
//                             let state = target.states.create(stateId);
//                             state.properties.radius = am4core.percent(80);
//                             state.properties.alignLabels = false;

//                             return state;
//                         }
//                         return null;
//                     },
//                 });
//                 chart2.responsive.rules.push({
//                     relevant: function (target) {
//                         if (target.pixelWidth <= 375) {
//                             return true;
//                         }
//                         return false;
//                     },
//                     state: function (target, stateId) {
//                         if (
//                             target instanceof am4charts.Chart ||
//                             target instanceof am4charts.PieSeries
//                         ) {
//                             let state = target.states.create(stateId);
//                             state.properties.radius = am4core.percent(70);
//                             return state;
//                         }
//                         if (target instanceof am4charts.Legend) {
//                             let state = target.states.create(stateId);
//                             state.properties.maxWidth = 200;
//                             return state;
//                         }
//                         return null;
//                     },
//                 });
//                 // pieSeries.labels.template.fontSize = 11;
//                 pieSeries.alignLabels = true;

//                 pieSeries.slices.template.stroke = am4core.color("#fff");
//                 pieSeries.slices.template.strokeOpacity = 1;
//                 pieSeries.slices.template.propertyFields.fill = "color";
//                 chart2.legend = new am4charts.Legend();

//                 // This creates initial animation
//                 pieSeries.hiddenState.properties.opacity = 1;
//                 pieSeries.hiddenState.properties.endAngle = -90;
//                 pieSeries.hiddenState.properties.startAngle = -90;

//                 chart2.hiddenState.properties.radius = am4core.percent(0);
//                 chart2.hiddenState.transitionDuration = 500;

//                 // $(".pieChart-filler").on("select2:select", function (data) {
//                 //     chart2.dispose();
//                 // });
//             }); // end am4core.ready()
//         },
//         error: (error) => {
//             console.log(error);
//         },
//     });
// });
