//*** ----------------- IMPORTS ----------------- ***\\
import $ from "jquery";
import Search from "./model/Search";
import MainData from "./model/MainData";
import GlobalData from "./model/AllCountries";
import Charts from "./model/Charts";
import * as searchView from "./views/countryChartView";
import * as mainDataView from "./views/mainDataView";
import * as allCountriesView from "./views/allCountriesView";
import * as globalChartView from "./views/globalChartView";
import * as mapView from "./views/mapView";
import { DOM, renderLoader, clearLoader } from "./views/base";

//*************************************************************************************\\

//*** --------- GLOBAL STATE OF THE APP --------- ***\\

//- Search object
//- Current recipe object
//- Shopping list object
//- Liked recipes

const state = {};

//*************************************************************************************\\

//*** ---------- GLOBAL APP CONTROLLER ---------- ***\\

//*** ------------ SEARCH CONTROLLER ------------ ***\\

// const controlSearch = async (data, imageUrl) => {
//     //-1- Get the query from the view
//     console.log(data);
//     const query = data;

//     if (query) {
//         //-2- New search object and add it to the state
//         state.search = new Search(query);

//         //-3- Prepare the Ui for the results
//         // searchView.clearSearch();
//         try {
//             //-4- Search for country
//             await state.search.getResults();

//             //-5- Render Country info on the UI

//             searchView.renderCountry(state.search.result, await imageUrl);
//         } catch (error) {
//             console.log(error);
//         }
//     }
// };
//*************************************************************************************\\

//*** ------------ MAIN DATA CONTROLLER ------------ ***\\

//- Total Cases, dead, and recovered
const controlMainData = async () => {
    state.today = new MainData();
    state.yesterday = new MainData();

    if (state.today && state.yesterday) {
        try {
            await state.today.todayResults();
            await state.yesterday.yesterdayResults();
            //* Total Cases
            //- Rendering total cases
            mainDataView.renderTotalCases(state.today.totalCases, state.yesterday.yesterdayCases);

            //- Rendering total dead
            mainDataView.renderTotalDead(state.today.totalDead, state.yesterday.yesterdayDead);

            //- Rendering total recovered
            mainDataView.renderTotalRecovered(
                state.today.totalRecovered,
                state.yesterday.yesterdayRecovered
            );

            //* Today's Cases
            //- Rendering Today's Cases
            mainDataView.renderTodayCases(
                state.today.todayCases,
                state.yesterday.yesterdayTodCases
            );

            //- Rendering Today's Deaths
            mainDataView.renderTodayDeaths(
                state.today.todayDeaths,
                state.yesterday.yesterdayTodDead
            );

            //- Rendering Today's Recovered
            mainDataView.renderTodayRecovered(
                state.today.todayRecovered,
                state.yesterday.yesterdayTodRecovered
            );

            //- Render time based on current time
            mainDataView.renderUpdatedTime(state.today.upDateDTime);
        } catch (error) {
            console.log(error);
        }
    }
};

//*************************************************************************************\\

//*** --------- GLOBAL DATA CONTROLLER ---------- ***\\

const globalDataController = async () => {
    state.allCountries = new GlobalData();

    await state.allCountries.getResults();
    try {
        renderLoader(DOM.tableMain);
        await state.today.todayResults();

        //- getting the data
        clearLoader();
        allCountriesView.renderAllData(state.today.data);

        $.countryData(state.allCountries.data);
    } catch (error) {
        console.log(error);
    }
};

//*************************************************************************************\\

//*** --------- CHARTS DATA CONTROLLER ---------- ***\\

const controlChart = async () => {
    state.chartsData = new Charts();
    state.casesByDay = new Charts();
    await state.chartsData.getResults();
    await state.casesByDay.getByDayCases();
    try {
        //- rendering the data for the charts
        globalChartView.allCountrySearch(state.chartsData.result);
        // chartsView.newFromCumulative(state.casesByDay.onlyCases);
        // mapView.renderMapData(state.chartsData.result);

        globalChartView.renderCharts(
            state.casesByDay.onlyDates,
            state.casesByDay.onlyCases,
            state.casesByDay.onlyDeaths,
            state.casesByDay.onlyRecovered
        );
    } catch (error) {
        console.log(error);
    }
};

//*************************************************************************************\\

//*** -------------- EVEN LISTENER -------------- ***\\

window.onload = () => {
    controlMainData();
    globalDataController();
    // controlSearch();
    controlChart();
};

// NAVIGATION ON SCROLL
// window.addEventListener("scroll", function () {
//     var navHeader = document.querySelector(".freeze");
//     navHeader.classList.toggle("sticky", window.scrollX > 0);
// });

// on document ready
$(DOM.aboutBtn).on("click", function () {
    $(".about-data").slideToggle("slow");
});

//*************************************************************************************\\
