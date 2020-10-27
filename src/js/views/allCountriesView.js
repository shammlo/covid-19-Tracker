//*** ----------------- IMPORTS ----------------- ***\\
import { DOM } from "./base";

//*************************************************************************************\\
//*** ------------ PRIVATE FUNCTIONS ------------ ***\\
const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

//*************************************************************************************\\

//*** ---------------- Global UI ---------------- ***\\

//- Rendering global Country name and flag on table
export const renderAllData = (global) => {
    //- Global
    const gCases = global.cases;
    const gDeaths = global.deaths;
    const gCritical = global.critical;
    const gRecovered = global.recovered;
    const gTodayCases = global.todayCases;
    const gTodayDeaths = global.todayDeaths;
    const gTodayRecovered = global.todayRecovered;
    const gActiveCases = global.active;

    const html = `
                    <tr class="table__body--row">
                        <td scope="row" class="table__body--header freeze">1</td>
                        <td class="td-items freeze" style="text-align: left">
                            <img
                                src="img/worldwide-2.svg"
                                class="table__icon"
                                alt="Country"
                            />
                            Global
                        </td>
                        <td class="td-items">${formatNumber(gCases)}</td>
                        <td class="td-items">${formatNumber(gDeaths)}</td>
                        <td class="td-items">${formatNumber(gCritical)}</td>
                        <td class="td-items">${formatNumber(gRecovered)}</td>
                        <td class="td-items badge-warning">+${formatNumber(gTodayCases)}</td>
                        <td class="td-items badge-danger">+${formatNumber(gTodayDeaths)}</td>
                        <td class="td-items badge-good">+${formatNumber(gTodayRecovered)}</td>
                        <td class="td-items">${formatNumber(gActiveCases)}</td>
                    </tr>
                    
    `;

    // DOM.countryInfo.insertAdjacentHTML("beforeend", html);
    $(DOM.tableBody).append(html);

    //------------------------------------------------------------------------------
};

export const renderResults = (data, page = 1, resultPerPage = 11) => {
    //- rendering results of the current page
    const start = (page - 1) * resultPerPage;
    const end = page * resultPerPage;

    // data.forEach(renderCountries);
};
$.countryData = (data) => {
    // data.forEach($.renderCountriesApi);

    $("#dtBasicExample").DataTable({
        pagingType: "simple_numbers",
        data: data.forEach($.renderCountriesApi),
        sort: "data.cases",
        dom: "lBfrtip",
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            //debugger;
            var index = iDisplayIndexFull + 1;
            $("td:first", nRow).html(index);
            return nRow;
        },
    });
    $(".dataTables_length").addClass(".bs-select");
};

$.renderCountriesApi = (data) => {
    if (data.todayCases > 0 && data.todayDeaths > 0 && data.todayRecovered > 0) {
        const html = `
                    <tr class="table__body--row">
                        <td scope="row" class="table__body--header freeze">1</td>
                        <td class="td-items freeze" style="text-align: left">
                            <img
                                src=${data.countryInfo.flag}
                                class="table__icon"
                                alt="Country"
                            />
                            ${data.country}
                        </td>
                        <td class="td-items">${formatNumber(data.cases)}</td>
                        <td class="td-items">${formatNumber(data.deaths)}</td>
                        <td class="td-items">${formatNumber(data.critical)}</td>
                        <td class="td-items">${formatNumber(data.recovered)}</td>
                        <td class="td-items  badge-warning " id="warn">${formatNumber(
                            "+" + data.todayCases
                        )}</td>
                        <td class="td-items badge-danger" id="dang">${formatNumber(
                            "+" + data.todayDeaths
                        )}</td>
                        <td class="td-items badge-good" id="good">${formatNumber(
                            "+" + data.todayRecovered
                        )}</td>
                        <td class="td-items">${formatNumber(data.active)}</td>
                    </tr>
                    
    `;
        // DOM.countryInfo.insertAdjacentHTML("beforeend", html);
        $(DOM.tableBody).append(html);
    } else if (data.todayCases > 0 && data.todayRecovered > 0 && data.todayRecovered <= 0) {
        const html = `
                    <tr class="table__body--row">
                        <td scope="row" class="table__body--header freeze">1</td>
                        <td class="td-items freeze" style="text-align: left">
                            <img
                                src=${data.countryInfo.flag}
                                class="table__icon"
                                alt="Country"
                            />
                            ${data.country}
                        </td>
                        <td class="td-items">${formatNumber(data.cases)}</td>
                        <td class="td-items">${formatNumber(data.deaths)}</td>
                        <td class="td-items">${formatNumber(data.critical)}</td>
                        <td class="td-items">${formatNumber(data.recovered)}</td>
                        <td class="td-items  badge-warning" id="warn">${formatNumber(
                            "+" + data.todayCases
                        )}</td>
                        <td class="td-items" id="dang">${formatNumber(data.todayDeaths)}</td>
                        <td class="td-items badge-good" id="good">${formatNumber(
                            "+" + data.todayRecovered
                        )}</td>
                        <td class="td-items">${formatNumber(data.active)}</td>
                    </tr>
                    
    `;
        // DOM.countryInfo.insertAdjacentHTML("beforeend", html);
        $(DOM.tableBody).append(html);
    } else if (data.todayDeaths > 0 && data.todayCases > 0 && data.todayRecovered <= 0) {
        const html = `
                    <tr class="table__body--row">
                        <td scope="row" class="table__body--header freeze">1</td>
                        <td class="td-items freeze" style="text-align: left">
                            <img
                                src=${data.countryInfo.flag}
                                class="table__icon"
                                alt="Country"
                            />
                            ${data.country}
                        </td>
                        <td class="td-items">${formatNumber(data.cases)}</td>
                        <td class="td-items">${formatNumber(data.deaths)}</td>
                        <td class="td-items">${formatNumber(data.critical)}</td>
                        <td class="td-items">${formatNumber(data.recovered)}</td>
                        <td class="td-items  badge-warning" id="warn">${formatNumber(
                            "+" + data.todayCases
                        )}</td>
                        <td class="td-items badge-danger" id="dang">${formatNumber(
                            "+" + data.todayDeaths
                        )}</td>
                        <td class="td-items" id="good">${formatNumber(data.todayRecovered)}</td>
                        <td class="td-items">${formatNumber(data.active)}</td>
                    </tr>
                    
    `;
        // DOM.countryInfo.insertAdjacentHTML("beforeend", html);
        $(DOM.tableBody).append(html);
    } else if (data.todayCases > 0 && data.todayRecovered > 0 && data.todayDeaths <= 0) {
        const html = `
                    <tr class="table__body--row">
                        <td scope="row" class="table__body--header freeze">1</td>
                        <td class="td-items freeze" style="text-align: left">
                            <img
                                src=${data.countryInfo.flag}
                                class="table__icon"
                                alt="Country"
                            />
                            ${data.country}
                        </td>
                        <td class="td-items">${formatNumber(data.cases)}</td>
                        <td class="td-items">${formatNumber(data.deaths)}</td>
                        <td class="td-items">${formatNumber(data.critical)}</td>
                        <td class="td-items">${formatNumber(data.recovered)}</td>
                        <td class="td-items  badge-warning" id="warn">${formatNumber(
                            "+" + data.todayCases
                        )}</td>
                        <td class="td-items " id="dang">${formatNumber(data.todayDeaths)}</td>
                        <td class="td-items badge-good" id="good">${formatNumber(
                            "+" + data.todayRecovered
                        )}</td>
                        <td class="td-items">${formatNumber(data.active)}</td>
                    </tr>
                    
    `;
        // DOM.countryInfo.insertAdjacentHTML("beforeend", html);
        $(DOM.tableBody).append(html);
    } else if (data.todayDeaths > 0 && data.todayRecovered <= 0 && data.todayCases <= 0) {
        const html = `
                    <tr class="table__body--row">
                        <td scope="row" class="table__body--header freeze">1</td>
                        <td class="td-items freeze" style="text-align: left">
                            <img
                                src=${data.countryInfo.flag}
                                class="table__icon"
                                alt="Country"
                            />
                            ${data.country}
                        </td>
                        <td class="td-items">${formatNumber(data.cases)}</td>
                        <td class="td-items">${formatNumber(data.deaths)}</td>
                        <td class="td-items">${formatNumber(data.critical)}</td>
                        <td class="td-items">${formatNumber(data.recovered)}</td>
                        <td class="td-items" id="warn">${formatNumber(data.todayCases)}</td>
                        <td class="td-items badge-danger" id="dang">${formatNumber(
                            "+" + data.todayDeaths
                        )}</td>
                        <td class="td-items " id="good">${formatNumber(data.todayRecovered)}</td>
                        <td class="td-items">${formatNumber(data.active)}</td>
                    </tr>
                    
    `;
        // DOM.countryInfo.insertAdjacentHTML("beforeend", html);
        $(DOM.tableBody).append(html);
    } else if (data.todayRecovered > 0 && data.todayCases <= 0 && data.todayDeaths <= 0) {
        const html = `
                    <tr class="table__body--row">
                        <td scope="row" class="table__body--header freeze">1</td>
                        <td class="td-items freeze" style="text-align: left">
                            <img
                                src=${data.countryInfo.flag}
                                class="table__icon"
                                alt="Country"
                            />
                            ${data.country}
                        </td>
                        <td class="td-items">${formatNumber(data.cases)}</td>
                        <td class="td-items">${formatNumber(data.deaths)}</td>
                        <td class="td-items">${formatNumber(data.critical)}</td>
                        <td class="td-items">${formatNumber(data.recovered)}</td>
                        <td class="td-items" id="warn">${formatNumber(data.todayCases)}</td>
                        <td class="td-items" id="dang">${formatNumber(data.todayDeaths)}</td>
                        <td class="td-items badge-good" id="good">${formatNumber(
                            "+" + data.todayRecovered
                        )}</td>
                        <td class="td-items">${formatNumber(data.active)}</td>
                    </tr>
                    
    `;
        // DOM.countryInfo.insertAdjacentHTML("beforeend", html);
        $(DOM.tableBody).append(html);
    } else {
        const html = `
                        <tr class="table__body--row">
                            <td scope="row" class="table__body--header freeze">1</td>
                            <td class="td-items freeze" style="text-align: left">
                                <img
                                    src=${data.countryInfo.flag}
                                    class="table__icon"
                                    alt="Country"
                                />
                                ${data.country}
                            </td>
                            <td class="td-items">${formatNumber(data.cases)}</td>
                            <td class="td-items">${formatNumber(data.deaths)}</td>
                            <td class="td-items">${formatNumber(data.critical)}</td>
                            <td class="td-items">${formatNumber(data.recovered)}</td>
                            <td class="td-items  " id="warn">${formatNumber(data.todayCases)}</td>
                            <td class="td-items" id="dang">${formatNumber(data.todayDeaths)}</td>
                            <td class="td-items" id="good">${formatNumber(data.todayRecovered)}</td>
                            <td class="td-items">${formatNumber(data.active)}</td>
                        </tr>
        `;
        // DOM.countryInfo.insertAdjacentHTML("beforeend", html);
        $(DOM.tableBody).append(html);
    }
};
