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
    $(".deaths-select").select2({
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
        // maintainAspectRatio: false,

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
};

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
