//*** ----------------- IMPORTS ----------------- ***\\
import { getJSON } from "jquery";
import { DOM } from "./base";

//*************************************************************************************\\
//*** ------------ PRIVATE FUNCTIONS ------------ ***\\

//*************************************************************************************\\

//*** ---------------- MAP UI ---------------- ***\\

export const renderMapData = async (data) => {
    console.log(data);
    mapboxgl.accessToken =
        "pk.eyJ1Ijoic2hhbXp4IiwiYSI6ImNrZzVsN3dmYTB2aGwydXA0cTRjYTNlOHIifQ.PJEx5stm9_rUjgRzFQaLFg";
    var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/shamzx/ckgtlhahs0m4y19pg0rwudv3p",
        center: [20, 41], // starting position [lng, lat]
        zoom: 2.5, // starting zoom
    });
    map.addControl(new mapboxgl.NavigationControl());

    let res = await data;
    const convertToGeoJSON = (res) => {
        var arr = [];
        var hitsArray = res;
        hitsArray.forEach((data) => {
            arr.push({
                latitude: data.countryInfo.lat,
                longitude: data.countryInfo.long,
                text: data.text,
                flag: data.flag,
            });
        });

        return GeoJSON.parse(arr, {
            Point: ["latitude", "longitude"],
            include: ["text", "flag"],
        });
    };

    console.log(convertToGeoJSON(res));
    const result = convertToGeoJSON(res);
    map.on("load", async () => {
        const newResult = await data;
        map.addSource("data", {
            type: "geojson",
            data: result,
        });
        map.addLayer({
            id: "data",
            type: "circle",
            source: "data",
            paint: {
                // make circles larger as the user zooms from z12 to z22
                "circle-radius": {
                    base: 15,
                    stops: [
                        [12, 4],
                        [22, 180],
                    ],
                },
                // color circles by ethnicity, using a match expression
                // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
                "circle-color": "#e31a1c",
                "circle-opacity": 0.6,
            },
        });
    });

    map.on("click", "data", function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.text;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup().setLngLat(coordinates).setHTML(description).addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on("mouseenter", "data", function () {
        map.getCanvas().style.cursor = "pointer";
    });

    // Change it back to a pointer when it leaves.
    map.on("mouseleave", "data", function () {
        map.getCanvas().style.cursor = "";
    });
};
