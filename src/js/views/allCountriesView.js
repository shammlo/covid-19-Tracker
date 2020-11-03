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
                        <td scope="row" class="table__body--header freeze" style="position: sticky; left: 0;z-index:500;">1</td>
                        <td class=" freeze" style="text-align: left;position: sticky; left: 0;z-index:500;">
                            <img
                                src="img/worldwide-2.svg"
                                class="table__icon"
                                alt="Country"
                            />
                            Global
                        </td>
                        <td >${formatNumber(gCases)}</td>
                        <td >${formatNumber(gDeaths)}</td>
                        <td >${formatNumber(gCritical)}</td>
                        <td >${formatNumber(gRecovered)}</td>
                        <td class=" badge-warning">+${formatNumber(gTodayCases)}</td>
                        <td class=" badge-danger">+${formatNumber(gTodayDeaths)}</td>
                        <td class=" badge-good">+${formatNumber(gTodayRecovered)}</td>
                        <td >${formatNumber(gActiveCases)}</td>
                    </tr>
                    
    `;

    // DOM.countryInfo.insertAdjacentHTML("beforeend", html);
    $(DOM.tableBody).append(html);

    //------------------------------------------------------------------------------
};

$.countryData = (data) => {
    // data.forEach($.renderCountriesApi);

    $("#dtBasicExample").DataTable({
        pagingType: "simple_numbers",
        data: data.forEach($.renderCountriesApi),
        sort: "data.cases",

        dom: "lBfrtip",

        order: [[2, "desc"]],
        bLengthChange: false,
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
                        <td class=" freeze" style="text-align: left">
                            <img
                                src=${data.countryInfo.flag}
                                class="table__icon"
                                alt="Country"
                            />
                            ${data.country}
                        </td>
                        <td >${formatNumber(data.cases)}</td>
                        <td >${formatNumber(data.deaths)}</td>
                        <td >${formatNumber(data.critical)}</td>
                        <td >${formatNumber(data.recovered)}</td>
                        <td class="  badge-warning " id="warn">${formatNumber(
                            "+" + data.todayCases
                        )}</td>
                        <td class=" badge-danger" id="dang">${formatNumber(
                            "+" + data.todayDeaths
                        )}</td>
                        <td class=" badge-good" id="good">${formatNumber(
                            "+" + data.todayRecovered
                        )}</td>
                        <td >${formatNumber(data.active)}</td>
                    </tr>
                    
    `;
        // DOM.countryInfo.insertAdjacentHTML("beforeend", html);
        $(DOM.tableBody).append(html);
    } else if (data.todayCases > 0 && data.todayRecovered > 0 && data.todayRecovered <= 0) {
        const html = `
                    <tr class="table__body--row">
                        <td scope="row" class="table__body--header freeze" style="position: sticky; left: 0;">1</td>
                        <td class=" freeze" style="text-align: left;">
                            <img
                                src=${data.countryInfo.flag}
                                class="table__icon"
                                alt="Country"
                            />
                            ${data.country}
                        </td>
                        <td >${formatNumber(data.cases)}</td>
                        <td >${formatNumber(data.deaths)}</td>
                        <td >${formatNumber(data.critical)}</td>
                        <td >${formatNumber(data.recovered)}</td>
                        <td class="  badge-warning" id="warn">${formatNumber(
                            "+" + data.todayCases
                        )}</td>
                        <td  id="dang">${formatNumber(data.todayDeaths)}</td>
                        <td class=" badge-good" id="good">${formatNumber(
                            "+" + data.todayRecovered
                        )}</td>
                        <td >${formatNumber(data.active)}</td>
                    </tr>
                    
    `;
        // DOM.countryInfo.insertAdjacentHTML("beforeend", html);
        $(DOM.tableBody).append(html);
    } else if (data.todayDeaths > 0 && data.todayCases > 0 && data.todayRecovered <= 0) {
        const html = `
                    <tr class="table__body--row">
                        <td scope="row" class="table__body--header freeze">1</td>
                        <td class=" freeze" style="text-align: left">
                            <img
                                src=${data.countryInfo.flag}
                                class="table__icon"
                                alt="Country"
                            />
                            ${data.country}
                        </td>
                        <td >${formatNumber(data.cases)}</td>
                        <td >${formatNumber(data.deaths)}</td>
                        <td >${formatNumber(data.critical)}</td>
                        <td >${formatNumber(data.recovered)}</td>
                        <td class="  badge-warning" id="warn">${formatNumber(
                            "+" + data.todayCases
                        )}</td>
                        <td class=" badge-danger" id="dang">${formatNumber(
                            "+" + data.todayDeaths
                        )}</td>
                        <td  id="good">${formatNumber(data.todayRecovered)}</td>
                        <td >${formatNumber(data.active)}</td>
                    </tr>
                    
    `;
        // DOM.countryInfo.insertAdjacentHTML("beforeend", html);
        $(DOM.tableBody).append(html);
    } else if (data.todayCases > 0 && data.todayRecovered > 0 && data.todayDeaths <= 0) {
        const html = `
                    <tr class="table__body--row">
                        <td scope="row" class="table__body--header freeze">1</td>
                        <td class=" freeze" style="text-align: left">
                            <img
                                src=${data.countryInfo.flag}
                                class="table__icon"
                                alt="Country"
                            />
                            ${data.country}
                        </td>
                        <td >${formatNumber(data.cases)}</td>
                        <td >${formatNumber(data.deaths)}</td>
                        <td >${formatNumber(data.critical)}</td>
                        <td >${formatNumber(data.recovered)}</td>
                        <td class="  badge-warning" id="warn">${formatNumber(
                            "+" + data.todayCases
                        )}</td>
                        <td class=" " id="dang">${formatNumber(data.todayDeaths)}</td>
                        <td class=" badge-good" id="good">${formatNumber(
                            "+" + data.todayRecovered
                        )}</td>
                        <td >${formatNumber(data.active)}</td>
                    </tr>
                    
    `;
        // DOM.countryInfo.insertAdjacentHTML("beforeend", html);
        $(DOM.tableBody).append(html);
    } else if (data.todayDeaths > 0 && data.todayRecovered <= 0 && data.todayCases <= 0) {
        const html = `
                    <tr class="table__body--row">
                        <td scope="row" class="table__body--header freeze">1</td>
                        <td class=" freeze" style="text-align: left">
                            <img
                                src=${data.countryInfo.flag}
                                class="table__icon"
                                alt="Country"
                            />
                            ${data.country}
                        </td>
                        <td >${formatNumber(data.cases)}</td>
                        <td >${formatNumber(data.deaths)}</td>
                        <td >${formatNumber(data.critical)}</td>
                        <td >${formatNumber(data.recovered)}</td>
                        <td  id="warn">${formatNumber(data.todayCases)}</td>
                        <td class=" badge-danger" id="dang">${formatNumber(
                            "+" + data.todayDeaths
                        )}</td>
                        <td class=" " id="good">${formatNumber(data.todayRecovered)}</td>
                        <td >${formatNumber(data.active)}</td>
                    </tr>
                    
    `;
        // DOM.countryInfo.insertAdjacentHTML("beforeend", html);
        $(DOM.tableBody).append(html);
    } else if (data.todayRecovered > 0 && data.todayCases <= 0 && data.todayDeaths <= 0) {
        const html = `
                    <tr class="table__body--row">
                        <td scope="row" class="table__body--header freeze">1</td>
                        <td class=" freeze" style="text-align: left">
                            <img
                                src=${data.countryInfo.flag}
                                class="table__icon"
                                alt="Country"
                            />
                            ${data.country}
                        </td>
                        <td >${formatNumber(data.cases)}</td>
                        <td >${formatNumber(data.deaths)}</td>
                        <td >${formatNumber(data.critical)}</td>
                        <td >${formatNumber(data.recovered)}</td>
                        <td  id="warn">${formatNumber(data.todayCases)}</td>
                        <td  id="dang">${formatNumber(data.todayDeaths)}</td>
                        <td class=" badge-good" id="good">${formatNumber(
                            "+" + data.todayRecovered
                        )}</td>
                        <td >${formatNumber(data.active)}</td>
                    </tr>
                    
    `;
        // DOM.countryInfo.insertAdjacentHTML("beforeend", html);
        $(DOM.tableBody).append(html);
    } else {
        const html = `
                        <tr class="table__body--row">
                            <td scope="row" class="table__body--header freeze">1</td>
                            <td class=" freeze" style="text-align: left">
                                <img
                                    src=${data.countryInfo.flag}
                                    class="table__icon"
                                    alt="Country"
                                />
                                ${data.country}
                            </td>
                            <td >${formatNumber(data.cases)}</td>
                            <td >${formatNumber(data.deaths)}</td>
                            <td >${formatNumber(data.critical)}</td>
                            <td >${formatNumber(data.recovered)}</td>
                            <td class="  " id="warn">${formatNumber(data.todayCases)}</td>
                            <td  id="dang">${formatNumber(data.todayDeaths)}</td>
                            <td  id="good">${formatNumber(data.todayRecovered)}</td>
                            <td >${formatNumber(data.active)}</td>
                        </tr>
        `;
        // DOM.countryInfo.insertAdjacentHTML("beforeend", html);
        $(DOM.tableBody).append(html);
    }
};
