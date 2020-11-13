//*** ----------------- IMPORTS ----------------- ***\\
import { getJSON } from "jquery";
import { DOM } from "./base";

//*************************************************************************************\\
//*** ------------ PRIVATE FUNCTIONS ------------ ***\\

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
            });
        });

        return GeoJSON.parse(arr, {
            Point: ["latitude", "longitude"],
            include: ["text", "flag", "cases", "deaths", "recovered", "active", "formatCases"],
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

    // map.on("click", "clusters", function (e) {
    //     var features = map.queryRenderedFeatures(e.point, {
    //         layers: ["clusters"],
    //     });
    //     var clusterId = e.features[0].properties.cases;
    //     map.getSource("data").getClusterExpansionZoom(clusterId, function (err, zoom) {
    //         if (err) return;

    //         map.easeTo({
    //             center: features[0].geometry.coordinates,
    //             zoom: zoom,
    //         });
    //     });
    // });

    map.on("click", "cluster", function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.text;
        let flag = e.features[0].properties.flag;
        let cases = e.features[0].properties.cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        let deaths = e.features[0].properties.deaths
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        let recovered = e.features[0].properties.recovered
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        let active = e.features[0].properties.active
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        // }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(
                `

                    <div class="map-popup">
                        <div class="popup-header">
                        <img style="margin-left: .4rem;"
                                    src="img/virus-1.svg"
                                    width="25"
                                    height="25"
                                    class="d-inline-block align-top"
                                    alt="logo"
                                />
                            <h5  style="font-size: 1.7rem; margin-left: 1rem;">

                                Covid-19 Tracker</h5></div>
                        <div class="popup-title">
                            <a id="infoCountryLegend" style="margin-left: .4rem;"
                                >${description} &nbsp;&nbsp;
                                <img
                                    src="${flag}"
                                    style="max-width: 30px; height: auto"
                                    onerror="this.style.display='none'"
                                    onwidth="20"
                            /></a>
                            <br /><a
                                style="font-size: small; padding: 0.5; color: rgb(155, 154, 154)"
                                id="infoUpdatedLegend"
                                >Updated 5 minutes ago</a>
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
                                <h5>Cases</h5>
                                <span>
                                    <img src="img/health.svg" alt="icon" width="22.5" height="22.5"
                                /></span>
                                <span id="popCase padTop">${cases}</span>
                            </div>
                            <div class="popup__data-deaths">
                                <h5> Deaths</h5>
                                <span>
                                    <img src="img/headstone.svg" alt="icon" width="22.5" height="22.5"
                                /></span>
                                <span id="popDead padTop" style="color: var(--danger)">${deaths}</span>
                            </div>
                            <div class="popup__data-recovered">
                                <h5> Recovered</h5>
                                <span>
                                    <img src="img/heartbeat.svg" alt="icon" width="22.5" height="22.5"
                                /></span>
                                <span id="popRec padTop" style="color: var(--success)">${recovered}</span>
                            </div>
                            <div class="popup__data-active" >
                                <h5> Active</h5>
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

        // features.forEach((feature) => {
        //     let coordinates = feature.geometry.coordinates;
        //     let properties = feature.properties;
        //     if (!properties.cluster) {
        //         return;
        //     }
        //     let id = properties.cluster.id;

        //     let marker = markers[id];

        //     if (!marker) {
        //         const element = createDonutChart(properties);
        //         marker = markers[id] = new mapboxgl.Marker({
        //             element: element,
        //         }).setLngLat(coordinates);
        //     }
        //     newMarkers[id] = marker;

        //     if (!markersOnScreen[id]) {
        //         marker.addTo(map);
        //     }
        // });

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
    // const colors = [
    //     "#8dd3c7",
    //     "#ffffb3",
    //     "#bebada",
    //     "#fb8072",
    //     "#80b1d3",
    //     "#fdb462",
    //     "#b3de69",
    //     "#fccde5",
    //     "#d9d9d9",
    //     "#bc80bd",
    //     "#ccebc5",
    // ];
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

//     var layers = [
//         [20, "#f28cb1"],
//         [10, "#f1f075"],
//         [0, "#51bbd6"],
//     ];

//     layers.forEach(function (layer, i) {
//         map.addLayer({
//             id: "cluster-" + i,
//             type: "circle",
//             source: "data",
//             paint: {
//                 "circle-color": layer[1],
//                 "circle-radius": 18,
//             },
//             filter:
//                 i === 0
//                     ? [">=", "cluster", layer[0]]
//                     : [
//                           "all",
//                           [">=", "cluster", layer[0]],
//                           ["<", "cluster", layers[i - 1][0]],
//                       ],
//         });
//     });
// });
