//*** ----------------- IMPORTS ----------------- ***\\
import $ from "jquery";
import MainData from "./model/MainData";
import GlobalData from "./model/TableData";
import Charts from "./model/ChartsData";
import * as mainDataView from "./views/mainDataView";
import * as allCountriesView from "./views/tableView";
import * as globalChartView from "./views/globalChartView";
import * as lineChartCountryView from "./views/lineChartCountryView";
import * as mapView from "./views/mapView";
import { DOM, renderLoader, clearLoader } from "./views/base";

//*************************************************************************************\\

//*** --------- GLOBAL STATE OF THE APP --------- ***\\

const state = {};

//*************************************************************************************\\

//*** ---------- GLOBAL APP CONTROLLER ---------- ***\\

//*** ------------ MAIN DATA CONTROLLER ------------ ***\\

//- Total Cases, dead, and recovered
const controlMainData = async () => {
    state.today = new MainData();
    state.yesterday = new MainData();

    if (state.today && state.yesterday) {
        try {
            await state.today.todayResults();
            await state.yesterday.yesterdayResults();

            //- Chart data
            globalChartView.globalPieChart(state.today.data);

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
        mapView.renderMapData(state.chartsData.result);

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

// on document ready
$(DOM.aboutBtn).on("click", function () {
    $(".about-data").slideToggle("slow");
});

$(".theme-switch").on("click", () => {
    $("body").toggleClass("light-theme");
});

// Cache selectors
var lastId,
    topMenu = $(".navigation__list"),
    topMenuHeight = topMenu.outerHeight() + 1,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) {
            return item;
        }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.on("click", function (e) {
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
    $("html, body").stop().animate(
        {
            scrollTop: offsetTop,
        },
        200
    );
    e.preventDefault();
});

// Bind to scroll
$(window).on("scroll", function () {
    // Get container scroll position
    var fromTop = $(this).scrollTop() + topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function () {
        if ($(this).offset().top < fromTop) return this;
    });
    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems
            .parent()
            .removeClass("active")
            .end()
            .filter("[href=\\#" + id + "]")
            .parent()
            .addClass("active");
    }
});

//*************************************************************************************\\
console.log("%cHello, Welcome.", "color: white; font-weight: bold; font-size: 25px");
console.log(
    "%cDeveloped by" + " %cShammlo" + "%c.",
    " font-weight: bold; font-size: 25px",
    "color: #FFD700; font-weight: bold; font-size: 28px",
    " font-weight: bold; font-size: 25px"
);
console.log("%cGitHub Profile: https://github.com/shammlo.", " font-weight: bold; font-size: 25px");
console.log(
    "%cFor source code and more information: https://github.com/shammlo/covid-19-Tracker.",
    " font-weight: bold; font-size: 25px"
);
