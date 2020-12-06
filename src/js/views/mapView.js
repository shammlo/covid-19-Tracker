//*** ----------------- IMPORTS ----------------- ***\\
import { getJSON } from "jquery";
import { DOM } from "./base";

//*************************************************************************************\\
//*** ------------ PRIVATE FUNCTIONS ------------ ***\\
const renderUpdatedTime = (updated) => {
    var date = new Date(updated);
    //? current time
    const current = Math.abs(new Date() - date);
    const timesAgo = Math.round(current / 60000);
    return timesAgo;
};
const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
String.prototype.toArabicDigits = function () {
    var id = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return this.replace(/[0-9]/g, function (w) {
        return id[+w];
    });
};

//*** ------------- GLOBAL VARIABLE -------------- ***\\
const path = document.location.pathname;

//*************************************************************************************\\

//*** ---------------- MAP UI ---------------- ***\\
const valueFormatter = (number) => {
    if (isNaN(number)) return number;

    if (number < 999) {
        return number;
    }
    if (number < 9999) {
        return (number / 1000).toFixed(1) + "k";
    }

    if (number < 1000000) {
        return Math.round(number / 1000) + "K";
    }
    if (number < 10000000) {
        return (number / 1000000).toFixed(1) + "M";
    }

    if (number < 1000000000) {
        return (number / 1000000).toFixed(1) + "M";
    }

    if (number < 1000000000000) {
        return (number / 1000000000).toFixed(1) + "B";
    }

    return "1T+";
};
export const renderMapData = async (data) => {
    console.log(data);
    mapboxgl.accessToken =
        "pk.eyJ1Ijoic2hhbXp4IiwiYSI6ImNrZzVsN3dmYTB2aGwydXA0cTRjYTNlOHIifQ.PJEx5stm9_rUjgRzFQaLFg";
    var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/shamzx/ckgtlhahs0m4y19pg0rwudv3p",
        center: [-16.343, 32.757], // starting position [lng, lat]
        zoom: 2.25, // starting zoom
    });
    map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
        })
    );
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.FullscreenControl());

    let res = await data;
    const convertToGeoJSON = (res) => {
        var arr = [];
        var hitsArray = res;
        hitsArray.forEach((data) => {
            const casesFormatted = parseInt(valueFormatter(data.cases));
            arr.push({
                latitude: data.countryInfo.lat,
                longitude: data.countryInfo.long,
                text: data.text,
                flag: data.flag,
                cases: data.cases,
                deaths: data.deaths,
                recovered: data.recovered,
                active: data.active,
                formatCases: casesFormatted,
                updated: data.updated,
            });
        });

        return GeoJSON.parse(arr, {
            Point: ["latitude", "longitude"],
            include: [
                "text",
                "flag",
                "cases",
                "deaths",
                "recovered",
                "active",
                "formatCases",
                "updated",
            ],
        });
    };

    console.log(convertToGeoJSON(res));
    const result = convertToGeoJSON(res);
    var colors = [
        "#fed976",
        "#51bbd6",
        "#52e374",
        "#feb24c",
        "#fd8d3c",
        "#fc4e2a",
        "#e31a1c",
        "#fc3f41",
    ];

    //----------------------------------------------------------------
    //* Map On load

    map.on("load", async () => {
        const total = ["get", "cases"];
        const cases = [">=", ["get", "cases"], 1];
        const cases2 = ["<=", total, 100000];
        const cases3 = ["<=", total, 500000];
        const cases4 = ["<=", total, 1000000];
        const cases5 = ["<=", total, 5000000];
        // const cases4 = ["<=", ["get", "cases"], 1000];
        // const cases = [">=", ["get", "cases"], 1];
        //const totalCases = valueFormatter(cases);

        map.addSource("mapCases", {
            type: "geojson",
            data: result,
            cluster: true,
            clusterRadius: 15,
            clusterProperties: {
                // keep separate counts for each magnitude category in a cluster
                cases: ["+", ["case", cases, 1, 0]],
                cases2: ["+", ["case", cases2, 1, 0]],
                cases3: ["+", ["case", cases3, 1, 0]],
                cases4: ["+", ["case", cases4, 1, 0]],
                cases5: ["+", ["case", cases5, 1, 0]],
            },
            //     // keep separate counts for each magnitude category in a cluster
            //     cases: ["+", ["case", cases, 1, 0]],
            // },
        });
        const point_count = "cases";

        map.addLayer({
            id: "cluster",
            type: "circle",
            source: "mapCases",
            filter: ["!=", "cluster", true],
            // ["!=", "cluster", true],
            paint: {
                "circle-color": [
                    "case",

                    cases2,
                    "#52e374",
                    cases3,

                    "#51bbd6",
                    cases4,
                    colors[0],
                    cases5,
                    "#fc9c19",

                    colors[7],
                ],

                "circle-opacity": 0.6,
                "circle-radius": 23,
            },
        });

        map.addLayer({
            id: "cluster-count",
            type: "symbol",
            source: "mapCases",
            filter: ["!=", "cluster", true],
            layout: {
                "text-field": [
                    "number-format",
                    ["get", "cases"],
                    { "min-fraction-digits": 0, "max-fraction-digits": 1 },
                ],
                "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                "text-size": 10,
            },
            paint: {
                "text-color": ["case", [">", ["get", "cases"], 1], "black", "white"],
            },
        });
    });

    map.on("click", "cluster", function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.text;
        let flag = e.features[0].properties.flag;
        let cases = formatNumber(e.features[0].properties.cases);
        let deaths = formatNumber(e.features[0].properties.deaths);
        let recovered = formatNumber(e.features[0].properties.recovered);
        let active = formatNumber(e.features[0].properties.active);
        let updated = renderUpdatedTime(e.features[0].properties.updated);

        if (path === "/arabic.html" || path === "/kurdish.html") {
            cases = formatNumber(e.features[0].properties.cases).toArabicDigits();
            deaths = formatNumber(e.features[0].properties.deaths).toArabicDigits();
            recovered = formatNumber(e.features[0].properties.recovered).toArabicDigits();
            active = formatNumber(e.features[0].properties.active).toArabicDigits();
            updated = renderUpdatedTime(e.features[0].properties.updated)
                .toString()
                .toArabicDigits();
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(
                `

                    <div class="${
                        path === "/arabic.html" || path === "/kurdish.html"
                            ? "map-popup--lang"
                            : "map-popup"
                    }">
                        <div class="popup-header">
                        <img style="margin-left: .4rem;"
                                    src="img/virus-1.svg"
                                    width="25"
                                    height="25"
                                    class="d-inline-block align-top"
                                    alt="logo"
                                />
                            <h5  style="font-size: 1.7rem; margin-left: 1rem;">${(() => {
                                if (path === "/arabic.html") {
                                    return "تـعـقـب كـوفـیـد-١٩";
                                } else if (path === "/kurdish.html") {
                                    return "بـەدواداچـوونـی كـۆڤـیـد-١٩";
                                } else {
                                    return " Covid-19 Tracker";
                                }
                            })()}</h5></div>
                        <div class="popup-title">
                            <span id="infoCountryLegend" style="margin-left: .4rem;"
                                >${description} &nbsp;&nbsp;
                                <img
                                    src="${flag}"
                                    style="max-width: 30px; height: auto"
                                    onerror="this.style.display='none'"
                                    onwidth="20"
                            /></span>
                            <span
                                id="${
                                    path === "/arabic.html" || path === "/kurdish.html"
                                        ? "infoUpdatedLegend-lang"
                                        : "infoUpdatedLegend"
                                }"
                                >
                                ${(() => {
                                    if (path == "/arabic.html") {
                                        return "محدث";
                                    } else if (path === "/kurdish.html") {
                                        return "تازەکراوەتەوە";
                                    } else {
                                        return "Updated";
                                    }
                                })()} <span style="color: var(--warning);">${updated}</span>  ${(() => {
                    if (path == "/arabic.html") {
                        return "دقائق مضت";
                    } else if (path === "/kurdish.html") {
                        return "خولەک پێش ئێستا";
                    } else {
                        return "minutes ago";
                    }
                })()}</span>
                            <hr
                                style="
                                    border: 0.1rem solid rgb(212, 212, 212);
                                    width: 8vh;
                                    margin-top: 1vh;
                                    margin-bottom: 1vh;
                                "
                                align="left"
                            />
                        </div>
                        <article class="popup__data">
                            <div class="popup__data-cases">
                                <h5>${(() => {
                                    if (path == "/arabic.html") {
                                        return "حـالـات";
                                    } else if (path == "/kurdish.html") {
                                        return "توشبووان";
                                    } else {
                                        return "Cases";
                                    }
                                })()}</h5>
                                <span>
                                    <img src="img/health.svg" alt="icon" width="22.5" height="22.5"
                                /></span>
                                <span id="popCase padTop">${cases}</span>
                            </div>
                            <div class="popup__data-deaths">
                                <h5> ${(() => {
                                    if (path == "/arabic.html") {
                                        return "الـوفـاة";
                                    } else if (path == "/kurdish.html") {
                                        return "قوربانیان";
                                    } else {
                                        return "Deaths";
                                    }
                                })()}</h5>
                                <span>
                                    <img src="img/headstone.svg" alt="icon" width="22.5" height="22.5"
                                /></span>
                                <span id="popDead padTop" style="color: var(--danger)">${deaths}</span>
                            </div>
                            <div class="popup__data-recovered">
                                <h5> ${(() => {
                                    if (path == "/arabic.html") {
                                        return "تـعـافـى";
                                    } else if (path == "/kurdish.html") {
                                        return "چاکبووەوان";
                                    } else {
                                        return "Recovered";
                                    }
                                })()}</h5>
                                <span>
                                    <img src="img/heartbeat.svg" alt="icon" width="22.5" height="22.5"
                                /></span>
                                <span id="popRec padTop" style="color: var(--success)">${recovered}</span>
                            </div>
                            <div class="popup__data-active" >
                                <h5> ${(() => {
                                    if (path == "/arabic.html") {
                                        return "الـمـصـابـة حـالـيـا";
                                    } else if (path == "/kurdish.html") {
                                        return "حاڵەتە چەڵاکەکان";
                                    } else {
                                        return "Active";
                                    }
                                })()}</h5>
                                <span>
                                <span id="popAct padTop">${active}</span>
                                    <img
                                        src="img/safety-suit.svg"
                                        alt="icon"
                                        width="22.5"
                                        height="22.5"
                                /></span>
                            </div>
                        </article>
                    </div>
        `
            )
            .addTo(map);
    });

    //Change the cursor to a pointer when the mouse is over the places layer.
    map.on("mouseenter", "cluster", function () {
        map.getCanvas().style.cursor = "pointer";
    });

    // Change it back to a pointer when it leaves.
    map.on("mouseleave", "cluster", function () {
        map.getCanvas().style.cursor = "";
    });
    var markers = {};
    var markersOnScreen = {};

    //- Updating marker
    const updateMarker = () => {
        var newMarkers = {};
        var features = map.querySourceFeatures("mapCases");

        for (var i = 0; i < features.length; i++) {
            var coords = features[i].geometry.coordinates;
            var props = features[i].properties.cases;
            if (!props.cluster) continue;
            var id = props;

            var marker = markers[id];
            if (!marker) {
                var el = createDonutChart(props);
                marker = markers[id] = new mapboxgl.Marker({
                    element: el,
                }).setLngLat(coords);
            }
            newMarkers[id] = marker;

            if (!markersOnScreen[id]) marker.addTo(map);
        }
        for (id in markersOnScreen) {
            if (!newMarkers[id]) {
                markersOnScreen[id].remove();
            }
        }
        markersOnScreen = newMarkers;
    };
    map.on("data", (e) => {
        if (e.sourceId !== "mapCases" || !e.isSourceLoaded) return;

        map.on("move", updateMarker);
        map.on("moveend", updateMarker);
        updateMarker();
    });

    function createDonutChart(props) {
        var offsets = [];
        var counts = [props.cases2, props.cases3, props.cases4];
        var total = 0;
        for (var i = 0; i < counts.length; i++) {
            offsets.push(total);
            total += counts[i];
        }
        var fontSize = total >= 1000 ? 22 : total >= 100 ? 20 : total >= 10 ? 18 : 16;
        var r = total >= 1000 ? 14 : total >= 100 ? 12 : total >= 10 ? 24 : 18;
        var r0 = Math.round(r * 0.6);
        var w = r * 2;

        var html =
            '<div><svg width="' +
            w +
            '" height="' +
            w +
            '" viewbox="0 0 ' +
            w +
            " " +
            w +
            '" text-anchor="middle" style=" display: block; width: 6rem; height: 5rem" >';

        for (i = 0; i < counts.length; i++) {
            html += donutSegment(
                offsets[i] / total,
                (offsets[i] + counts[i]) / total,
                r,
                r0,
                colors[i]
            );
        }
        html +=
            '<circle cx="' +
            r +
            '" cy="' +
            r +
            '" r="' +
            r0 +
            '" fill="white" /><text dominant-baseline="central" transform="translate(' +
            r +
            ", " +
            r +
            ')">' +
            total.toLocaleString() +
            "</text></svg></div>";

        var el = document.createElement("div");
        el.innerHTML = html;
        return el.firstChild;
    }
    function donutSegment(start, end, r, r0, color) {
        if (end - start === 1) end -= 0.00001;
        var a0 = 2 * Math.PI * (start - 0.25);
        var a1 = 2 * Math.PI * (end - 0.25);
        var x0 = Math.cos(a0),
            y0 = Math.sin(a0);
        var x1 = Math.cos(a1),
            y1 = Math.sin(a1);
        var largeArc = end - start > 0.5 ? 1 : 0;

        return [
            '<path d="M',
            r + r0 * x0,
            r + r0 * y0,
            "L",
            r + r * x0,
            r + r * y0,
            "A",
            r,
            r,
            0,
            largeArc,
            1,
            r + r * x1,
            r + r * y1,
            "L",
            r + r0 * x1,
            r + r0 * y1,
            "A",
            r0,
            r0,
            0,
            largeArc,
            0,
            r + r0 * x0,
            r + r0 * y0,
            '" fill="' + color + '" />',
        ].join(" ");
    }
};
