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

    $("#country-cases-daily").remove();

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
            $(".chartCase").prepend(
                '<canvas id="country-cases" style="display: block; width: 90rem; height: 45rem"><canvas>'
            );
            const result = await data;
            const name = result.country;
            const cases = await Object.values(result.timeline.cases);
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

                    //- Datasets
                    datasets: [
                        {
                            data: cases,
                            label: name + " " + "Total Cases",
                            backgroundColor: "rgba(54, 162, 235, 0.4)",
                            pointBackgroundColor: "rgba(54, 162, 235, 1)",
                            borderColor: "rgba(54, 162, 235, 1)",
                            borderWidth: 1,
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
