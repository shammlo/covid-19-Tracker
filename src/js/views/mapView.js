// //*** ----------------- IMPORTS ----------------- ***\\
// import { getJSON } from "jquery";
// import { DOM } from "./base";

// //*************************************************************************************\\
// //*** ------------ PRIVATE FUNCTIONS ------------ ***\\

// //*************************************************************************************\\

// //*** ---------------- MAP UI ---------------- ***\\

// export const renderMapData = async (data) => {
//     console.log(data);
//     mapboxgl.accessToken =
//         "pk.eyJ1Ijoic2hhbXp4IiwiYSI6ImNrZzVsN3dmYTB2aGwydXA0cTRjYTNlOHIifQ.PJEx5stm9_rUjgRzFQaLFg";
//     var map = new mapboxgl.Map({
//         container: "map",
//         style: "mapbox://styles/shamzx/ckgtlhahs0m4y19pg0rwudv3p",
//         center: [-16.343, 32.757], // starting position [lng, lat]
//         zoom: 2.25, // starting zoom
//     });
//     map.addControl(new mapboxgl.NavigationControl());
//     map.addControl(new mapboxgl.FullscreenControl());

//     let res = await data;
//     const convertToGeoJSON = (res) => {
//         var arr = [];
//         var hitsArray = res;
//         hitsArray.forEach((data) => {
//             arr.push({
//                 latitude: data.countryInfo.lat,
//                 longitude: data.countryInfo.long,
//                 text: data.text,
//                 flag: data.flag,
//                 cases: data.cases,
//                 deaths: data.deaths,
//                 recovered: data.recovered,
//                 active: data.active,
//             });
//         });

//         return GeoJSON.parse(arr, {
//             Point: ["latitude", "longitude"],
//             include: ["text", "flag", "cases", "deaths", "recovered", "active"],
//         });
//     };

//     console.log(convertToGeoJSON(res));
//     const result = convertToGeoJSON(res);
//     map.on("load", async () => {
//         const newResult = await data;
//         map.addSource("data", {
//             type: "geojson",
//             data: result,
//             cluster: true,
//             clusterRadius: 10,
//         });
//         map.addLayer({
//             id: "data",
//             type: "circle",
//             source: "data",
//             paint: {
//                 // make circles larger as the user zooms from z12 to z22

//                 "circle-radius": {
//                     base: 12,
//                     stops: [
//                         [2.5, 5.5],
//                         [3.25, 8],
//                         [4.6, 19],
//                         [5, 20],
//                         [5.5, 25],
//                         [6.5, 30],
//                     ],
//                 },

//                 // color circles by ethnicity, using a match expression
//                 // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
//                 "circle-color": "#e31a1c",
//                 "circle-opacity": 0.6,
//             },
//             layers: [
//                 {
//                     paint: {
//                         // "fill-color": "#fff",
//                         // "text-color": "#000000",
//                         "fill-color": "rgba(200, 100, 240, 0.4)",
//                         "fill-outline-color": "rgba(200, 100, 240, 1)",
//                     },
//                     layout: {
//                         "text-field": "",
//                     },
//                 },
//             ],
//         });
//     });

//     map.on("click", "data", function (e) {
//         var coordinates = e.features[0].geometry.coordinates.slice();
//         var description = e.features[0].properties.text;
//         let flag = e.features[0].properties.flag;
//         let cases = e.features[0].properties.cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//         let deaths = e.features[0].properties.deaths
//             .toString()
//             .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//         let recovered = e.features[0].properties.recovered
//             .toString()
//             .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//         let active = e.features[0].properties.active
//             .toString()
//             .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

//         // Ensure that if the map is zoomed out such that multiple
//         // copies of the feature are visible, the popup appears
//         // over the copy being pointed to.
//         // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//         //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//         // }

//         new mapboxgl.Popup()
//             .setLngLat(coordinates)
//             .setHTML(
//                 `

//                     <div class="map-popup">
//                         <div class="popup-header">
//                         <img style="margin-left: .4rem;"
//                                     src="img/virus-1.svg"
//                                     width="25"
//                                     height="25"
//                                     class="d-inline-block align-top"
//                                     alt="logo"
//                                 />
//                             <h5  style="font-size: 1.7rem; margin-left: 1rem;">

//                                 Covid-19 Tracker</h5></div>
//                         <div class="popup-title">
//                             <a id="infoCountryLegend" style="margin-left: .4rem;"
//                                 >${description} &nbsp;&nbsp;
//                                 <img
//                                     src="${flag}"
//                                     style="max-width: 30px; height: auto"
//                                     onerror="this.style.display='none'"
//                                     onwidth="20"
//                             /></a>
//                             <br /><a
//                                 style="font-size: small; padding: 0.5; color: rgb(155, 154, 154)"
//                                 id="infoUpdatedLegend"
//                                 >Updated 5 minutes ago</a>
//                             <hr
//                                 style="
//                                     border: 0.1rem solid rgb(212, 212, 212);
//                                     width: 8vh;
//                                     margin-top: 1vh;
//                                     margin-bottom: 1vh;
//                                 "
//                                 align="left"
//                             />
//                         </div>
//                         <article class="popup__data">
//                             <div class="popup__data-cases">
//                                 <h5>Cases</h5>
//                                 <span>
//                                     <img src="img/health.svg" alt="icon" width="22.5" height="22.5"
//                                 /></span>
//                                 <span id="popCase padTop">${cases}</span>
//                             </div>
//                             <div class="popup__data-deaths">
//                                 <h5> Deaths</h5>
//                                 <span>
//                                     <img src="img/headstone.svg" alt="icon" width="22.5" height="22.5"
//                                 /></span>
//                                 <span id="popDead padTop" style="color: var(--danger)">${deaths}</span>
//                             </div>
//                             <div class="popup__data-recovered">
//                                 <h5> Recovered</h5>
//                                 <span>
//                                     <img src="img/heartbeat.svg" alt="icon" width="22.5" height="22.5"
//                                 /></span>
//                                 <span id="popRec padTop" style="color: var(--success)">${recovered}</span>
//                             </div>
//                             <div class="popup__data-active" >
//                                 <h5> Active</h5>
//                                 <span>
//                                 <span id="popAct padTop">${active}</span>
//                                     <img
//                                         src="img/safety-suit.svg"
//                                         alt="icon"
//                                         width="22.5"
//                                         height="22.5"
//                                 /></span>
//                             </div>
//                         </article>
//                     </div>
//         `
//             )
//             .addTo(map);
//     });

//     //Change the cursor to a pointer when the mouse is over the places layer.
//     map.on("mouseenter", "data", function () {
//         map.getCanvas().style.cursor = "pointer";
//     });

//     // Change it back to a pointer when it leaves.
//     map.on("mouseleave", "data", function () {
//         map.getCanvas().style.cursor = "";
//     });

//     const updateMarker = () => {
//         var newMarkers = {};
//         var features = map.querySourceFeatures("data");

//         features.forEach((feature) => {
//             let coordinates = feature.geometry.coordinates;
//             let properties = feature.properties;
//             if (!properties.cluster) {
//                 return;
//             }
//             let id = properties.cluster__id;

//             let marker = markers[id];

//             if (!marker) {
//                 const element = createDonutChart(properties);
//                 marker = markers[id] = new mapboxgl.Marker({
//                     element: element,
//                 }).setLngLat(coordinates);
//             }
//             newMarkers[id] = marker;

//             if (!markersOnScreen[id]) {
//                 marker.addTo(map);
//             }
//         });
//         for (id in markersOnScreen) {
//             if (!newMarkers[id]) {
//                 markersOnScreen[id].remove();
//             }
//         }
//         markersOnScreen = newMarkers;
//     };
// };
