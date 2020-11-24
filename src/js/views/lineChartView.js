//*** ----------------- IMPORTS ----------------- ***\\
import { DOM } from "./base";

//*************************************************************************************\\
//*** ------------ PRIVATE FUNCTIONS ------------ ***\\
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

String.prototype.toArabicDigits = function () {
    var id = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return this.replace(/[0-9]/g, function (w) {
        return id[+w];
    });
};

//*************************************************************************************\\
//*** ------------ PUBLIC FUNCTIONS ------------ ***\\

//- Getting search input from the DOM function
export const getInput = () => DOM.searchInput.value;

export const clearSearch = () => {
    DOM.searchInput.value = "";
};

$(".js-data-filter").on("select2:select", function (data) {
    $("#flag").remove();

    $("#country-cases").remove();

    var imageUrl = data.params.data.flag;
    $(".select2-selection__rendered")
        .eq(1)
        .prepend("<img class='img-flag' src=" + imageUrl + ">");

    $(".text-big")
        .eq(0)
        .prepend("<img  id='flag' class='img-flag__main' src=" + imageUrl + ">");
    const query = data.params.data.country;
    $.ajax({
        url: "https://disease.sh/v3/covid-19/historical/" + query + "?lastdays=all",
        type: "GET",
        dataType: "json",
        "X-Requested-With": "XMLHttpRequest",
        success: async (data) => {
            console.log(data);
            //----------------------------------------------------------------
            //* Chart
            //- chart section
            // casecharting.destroy();
            $("#country-cases").remove();
            $("#cases").remove();
            $("#lineChart").prepend(
                '<canvas id="country-cases" style="display: block; width: 90rem; height: 45rem"><canvas>'
            );
            const result = await data;
            const name = result.country;
            const cases = await Object.values(result.timeline.cases);
            const arCases = cases.toString().toArabicDigits();
            const deaths = await Object.values(result.timeline.deaths);
            const recovered = await Object.values(result.timeline.recovered);
            const dates = await Object.keys(result.timeline.cases);
            const countryChart = document.querySelector("#country-cases").getContext("2d");
            Chart.defaults.global.defaultFontColor = "#fff";

            const engData = {
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
            };

            const kurdData = {
                //- Labels
                labels: dates,

                label: name,
                //- Datasets
                datasets: [
                    {
                        data: cases,
                        label: "دۆسیـە",
                        backgroundColor: "rgba(54, 162, 235, 0.2)",
                        pointBackgroundColor: "rgba(54, 162, 235, 1)",
                        borderColor: "rgba(54, 162, 235, 1)",
                        borderWidth: 1,
                    },
                    {
                        data: deaths,
                        label: "مردووان",
                        backgroundColor: "rgba(214, 102, 121, 0.3)",
                        borderColor: "rgba(214, 102, 121, 1)",
                        borderWidth: 1,
                        order: 2,
                    },
                    {
                        data: recovered,
                        label: "چـاكـبـوونـەوە",

                        backgroundColor: "rgba(113, 255, 47, 0.2)",
                        borderColor: "rgba(113, 255, 47, 1)",
                        borderWidth: 1,
                        order: 3,
                    },
                ],
            };
            const arData = {
                //- Labels
                labels: dates,

                //- Datasets
                datasets: [
                    {
                        data: arCases,
                        label: "حالات",
                        backgroundColor: "rgba(54, 162, 235, 0.2)",
                        borderColor: "rgba(54, 162, 235, 1)",
                        borderWidth: 1,
                        order: 1,
                    },
                    {
                        data: deaths,
                        label: "حالات الوفاة",
                        backgroundColor: "rgba(214, 102, 121, 0.3)",
                        borderColor: "rgba(214, 102, 121, 1)",
                        borderWidth: 1,
                        order: 3,
                    },
                    {
                        data: recovered,
                        label: "تعافى",
                        backgroundColor: "rgba(113, 255, 47, 0.2)",
                        borderColor: "rgba(113, 255, 47, 1)",
                        borderWidth: 1,
                        order: 2,
                    },
                ],
            };

            const countryCasesChart = new Chart(countryChart, {
                type: "line",
                responsive: true,

                //- Data layer start
                data: engData,
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

            if (document.location.pathname == "/arabic.html") {
                countryCasesChart.data = arData;
                countryCasesChart.update();
            }
        },
        error: (error) => {
            console.log(error);
        },
    });
});

// $(".language-data").on("select2:select", function () {
//     const kurdish = $(".language-data").select2("data")[0].text === "Kurdish";
//     if ($(".language-data").select2("data")[0].text === "English(default)") {
//         console.log("hi");

//         // countryCasesChart.data = engData;
//         // countryCasesChart.update();
//     }
//     //- Else if for Kurdish
//     else if ($(".language-data").select2("data")[0].text === "Kurdish") {
//         // countryCasesChart.data = kurdData;        $("#country-cases").remove();

//         // countryCasesChart.update();
//         $(".js-data-filter").on("select2:select", function (data) {
//             $("#flag").remove();

//             $("#country-cases").remove();
//             var imageUrl = data.params.data.flag;
//             $(".select2-selection__rendered")
//                 .eq(1)
//                 .prepend("<img class='img-flag' src=" + imageUrl + ">");

//             $(".text-big")
//                 .eq(0)
//                 .prepend("<img  id='flag' class='img-flag__main' src=" + imageUrl + ">");
//             const query = data.params.data.country;

//             $.ajax({
//                 url: "https://disease.sh/v3/covid-19/historical/" + query + "?lastdays=all",
//                 type: "GET",
//                 dataType: "json",
//                 "X-Requested-With": "XMLHttpRequest",
//                 success: async (data) => {
//                     console.log(data);
//                     //----------------------------------------------------------------
//                     //* Chart
//                     //- chart section
//                     $("#country-cases").remove();
//                     $("#cases").remove();
//                     $("#lineChart").prepend(
//                         '<canvas id="country-cases" style="display: block; width: 90rem; height: 45rem"><canvas>'
//                     );
//                     const result = await data;
//                     const name = result.country;
//                     const cases = await Object.values(result.timeline.cases);
//                     const deaths = await Object.values(result.timeline.deaths);
//                     const recovered = await Object.values(result.timeline.recovered);
//                     const dates = await Object.keys(result.timeline.cases);
//                     const countryChart = document.querySelector("#country-cases").getContext("2d");
//                     Chart.defaults.global.defaultFontColor = "#fff";
//                     $(".language-data").select2().select2("val", $(".select2 option:eq(1)").val());

//                     const kurdData = {
//                         //- Labels
//                         labels: dates,

//                         label: name,
//                         //- Datasets
//                         datasets: [
//                             {
//                                 data: cases,
//                                 label: "دۆسیـە",
//                                 backgroundColor: "rgba(54, 162, 235, 0.2)",
//                                 pointBackgroundColor: "rgba(54, 162, 235, 1)",
//                                 borderColor: "rgba(54, 162, 235, 1)",
//                                 borderWidth: 1,
//                             },
//                             {
//                                 data: deaths,
//                                 label: "مردووان",
//                                 backgroundColor: "rgba(214, 102, 121, 0.3)",
//                                 borderColor: "rgba(214, 102, 121, 1)",
//                                 borderWidth: 1,
//                                 order: 2,
//                             },
//                             {
//                                 data: recovered,
//                                 label: "چـاكـبـوونـەوە",

//                                 backgroundColor: "rgba(113, 255, 47, 0.2)",
//                                 borderColor: "rgba(113, 255, 47, 1)",
//                                 borderWidth: 1,
//                                 order: 3,
//                             },
//                         ],
//                     };
//                     const countryCasesChart = new Chart(countryChart, {
//                         type: "line",
//                         responsive: true,

//                         //- Data layer start
//                         data: kurdData,
//                         //- Data layer end

//                         //- Options Start
//                         options: {
//                             legend: {
//                                 display: true,
//                                 labels: {
//                                     fontSize: 14,
//                                     padding: 20,
//                                 },

//                                 onClick: function (e, legendItem) {
//                                     var index = legendItem.datasetIndex;
//                                     var ci = this.chart;
//                                     var alreadyHidden =
//                                         ci.getDatasetMeta(index).hidden === null
//                                             ? false
//                                             : ci.getDatasetMeta(index).hidden;

//                                     ci.data.datasets.forEach(function (e, i) {
//                                         var meta = ci.getDatasetMeta(i);

//                                         if (i !== index) {
//                                             if (!alreadyHidden) {
//                                                 meta.hidden =
//                                                     meta.hidden === null ? !meta.hidden : null;
//                                             } else if (meta.hidden === null) {
//                                                 meta.hidden = true;
//                                             }
//                                         } else if (i === index) {
//                                             meta.hidden = null;
//                                         }
//                                     });

//                                     ci.update();
//                                 },
//                             },

//                             scales: {
//                                 xAxes: [
//                                     {
//                                         gridLines: {
//                                             color: "rgba(0, 0, 0, 0)",
//                                         },
//                                     },
//                                 ],
//                                 yAxes: [
//                                     {
//                                         ticks: {
//                                             beginAtZero: true,
//                                             callback: function (value) {
//                                                 if (value >= 0 && value < 1000) return value;
//                                                 if (value >= 1000 && value < 1000000)
//                                                     return value / 1000 + "k";
//                                                 if (value >= 1000000 && value < 1000000000)
//                                                     return value / 1000000 + "m";
//                                                 return value;
//                                             },
//                                         },
//                                     },
//                                 ],
//                             },
//                         },
//                         //- Options end
//                     });

//                     // console.log(dates);
//                     // $(".language-data").on("select2:select", function () {
//                     //     const kurdish = $(".language-data").select2("data")[0].text === "Kurdish";
//                     //     if ($(".language-data").select2("data")[0].text === "English(default)") {
//                     //         countryCasesChart.data = engData;
//                     //         countryCasesChart.update();
//                     //     } else if (kurdish) {
//                     //         countryCasesChart.data = kurdData;
//                     //         countryCasesChart.update();
//                     //     }
//                     // });
//                 },
//                 error: (error) => {
//                     console.log(error);
//                 },
//             });
//         });
//     }
// });
