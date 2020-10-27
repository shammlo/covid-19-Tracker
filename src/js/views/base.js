//*** ----------------- DOM INPUTS ----------------- ***\\

export const DOM = {
    //- Search input
    searchForm: document.querySelector(".search"),
    searchInput: document.querySelector(".select2-search__field"),
    selectedFilter: document.querySelector(".js-data-filter"),
    totalCases: document.querySelector("#totalCases"),
    totalDead: document.querySelector("#totalDeath"),
    totalRecovered: document.querySelector("#totalRecovered"),
    fatality: document.querySelector("#valueDedR"),

    todayCases: document.querySelector("#todayCases"),
    todayDeaths: document.querySelector("#todayDeaths"),
    todayRecovered: document.querySelector("#todayRecovered"),
    countryInfo: document.querySelector(".table__body"),
    updatedTime: document.querySelector("#updatedTime"),
    ham: document.querySelector(".icon"),
    //* yesterday
    //-  Cases
    totalCaseInc: document.querySelector("#caseIncrease"),
    yesterdayCase: document.querySelector("#totalYesterday"),

    //- Dead
    totalDeadInc: document.querySelector("#deadIncrease"),
    yesterdayDead: document.querySelector("#deadYesterday"),

    //- Recovered
    totalRecoveredInc: document.querySelector("#recIncrease"),
    yesterdayRec: document.querySelector("#recYesterday"),

    //- Today cases
    todayCaseInc: document.querySelector("#todayIncrease"),
    totalYesCases: document.querySelector("#todayYesterday"),

    //- Today dead
    todayDeadInc: document.querySelector("#deathIncrease"),
    totalYesDead: document.querySelector("#deathYesterday"),

    //- Today recovered
    todayRecoveredInc: document.querySelector("#recoverIncrease"),
    totalYesRec: document.querySelector("#recoverYesterday"),

    todCase: document.querySelector(".todCase"),

    increase: document.querySelector(".info-increase span"),
    incDec: document.querySelector(".incDec"),
    tableBody: document.querySelector("#tableBody"),
    tableMain: document.querySelector(".table__main"),
    caseChart: document.getElementById("cases").getContext("2d"),
    dailyCases: document.querySelector("#daily-cases"),
    button1: document.querySelector("#button1"),
    button2: document.querySelector("#button2"),
};

//*************************************************************************************\\

//*** -------------- RENDERING LOADER -------------- ***\\

//- Render loader
export const renderLoader = (parent) => {
    const loader = `
    
    <div class="position">
    <div class="loader">
            
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            
        </div>
        </div>
    `;
    parent.insertAdjacentHTML("afterbegin", loader);
};

//- Clearing the loader
export const clearLoader = () => {
    const loader = document.querySelector(".loader");
    if (loader) {
        loader.parentElement.removeChild(loader);
    }
};
