//*** ----------------- IMPORTS ----------------- ***\\
import { DOM } from "./base";

//*************************************************************************************\\
//*** ------------ PRIVATE FUNCTIONS ------------ ***\\
const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
String.prototype.toArabicDigits = function () {
    var id = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return this.replace(/[0-9]/g, function (w) {
        return id[+w];
    });
};
//*************************************************************************************\\

//*** ---------------- Global UI ---------------- ***\\

//- Rendering global Country name and flag on table
export const renderAllData = (global) => {
    //- Global
    let gCases = formatNumber(global.cases);
    let gDeaths = formatNumber(global.deaths);
    let gCritical = formatNumber(global.critical);
    let gRecovered = formatNumber(global.recovered);
    let gTodayCases = formatNumber(global.todayCases);
    let gTodayDeaths = formatNumber(global.todayDeaths);
    let gTodayRecovered = formatNumber(global.todayRecovered);
    let gActiveCases = formatNumber(global.active);

    if (document.location.pathname == "/arabic.html") {
        gCases = formatNumber(global.cases).toArabicDigits();
        gDeaths = formatNumber(global.deaths).toArabicDigits();
        gCritical = formatNumber(global.critical).toArabicDigits();
        gRecovered = formatNumber(global.recovered).toArabicDigits();
        gTodayCases = formatNumber(global.todayCases).toArabicDigits();
        gTodayDeaths = formatNumber(global.todayDeaths).toArabicDigits();
        gTodayRecovered = formatNumber(global.todayRecovered).toArabicDigits();
        gActiveCases = formatNumber(global.active).toArabicDigits();
    }
    const html = `
                    <tr class="table__body--row">
                        <td scope="row" class="table__body--header freeze freeze-ar" style="position: sticky; left: 0;z-index:500;">1</td>
                        <td class=" freeze freeze-ar" style="position: sticky; left: 0;z-index:500;">
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

    if (document.location.pathname == "/arabic.html") {
    }
    // DOM.countryInfo.insertAdjacentHTML("beforeend", html);
    $(DOM.tableBody).append(html);

    //------------------------------------------------------------------------------
};

$.countryData = (data) => {
    // data.forEach($.renderCountriesApi);

    $(".dataTables_length").addClass(".bs-select");
    if (document.location.pathname == "/arabic.html") {
        var arabic = {
            sProcessing: "جاري التحميل...",
            sLengthMenu: "أظهر مُدخلات _MENU_",
            sZeroRecords: "لم يُعثر على أية سجلات",
            sInfo: "إظهار _START_ إلى _END_ من أصل _TOTAL_ مُدخل",
            sInfoEmpty: "يعرض 0 إلى 0 من أصل 0 سجلّ",
            sInfoFiltered: "(منتقاة من مجموع _MAX_ مُدخل)",
            sInfoPostFix: "",
            sSearch: "ابحث:",
            searchPlaceholder: "ابحث عن الدولة",

            sUrl: "",
            oPaginate: {
                sFirst: "الأول",
                sPrevious: "السابق",
                sNext: "التالي",
                sLast: "الأخير",
            },
        };
        $("#dtBasicExample").DataTable({
            pagingType: "simple_numbers",
            data: data.forEach($.renderCountriesApi),
            sort: "data.cases",

            dom: "lBfrtip",
            language: arabic,

            order: [],
            bLengthChange: false,
            fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                //debugger;
                var index = iDisplayIndexFull + 1;
                $("td:first", nRow).html(index);
                return nRow;
            },
        });
        $("#dtBasicExample").on("draw.dt", function () {
            $(".paginate_button")
                .not(".previous, .next")
                .each(function (i, a) {
                    var val = $(a).text();
                    val = new Intl.NumberFormat("ar-EG").format(val);
                    $(a).text(val);
                });
        });
        $(".dataTables_length").addClass(".bs-select");
    } else {
        $("#dtBasicExample").DataTable({
            pagingType: "simple_numbers",
            data: data.forEach($.renderCountriesApi),
            sort: "data.cases",

            dom: "lBfrtip",

            order: [],
            bLengthChange: false,
            fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                //debugger;
                var index = iDisplayIndexFull + 1;
                $("td:first", nRow).html(index);
                return nRow;
            },
        });
        $(".dataTables_length").addClass(".bs-select");
    }
};

$.renderCountriesApi = (data) => {
    let gCases = formatNumber(data.cases);
    let gDeaths = formatNumber(data.deaths);
    let gCritical = formatNumber(data.critical);
    let gRecovered = formatNumber(data.recovered);
    let gTodayCases = formatNumber(data.todayCases);
    let gTodayDeaths = formatNumber(data.todayDeaths);
    let gTodayRecovered = formatNumber(data.todayRecovered);
    let gActiveCases = formatNumber(data.active);

    if (document.location.pathname == "/arabic.html") {
        gCases = formatNumber(data.cases).toArabicDigits();
        gDeaths = formatNumber(data.deaths).toArabicDigits();
        gCritical = formatNumber(data.critical).toArabicDigits();
        gRecovered = formatNumber(data.recovered).toArabicDigits();
        gTodayCases = formatNumber(data.todayCases).toArabicDigits();
        gTodayDeaths = formatNumber(data.todayDeaths).toArabicDigits();
        gTodayRecovered = formatNumber(data.todayRecovered).toArabicDigits();
        gActiveCases = formatNumber(data.active).toArabicDigits();
    }
    if (data.todayCases > 0 && data.todayDeaths > 0 && data.todayRecovered > 0) {
        const html = `
                    <tr class="table__body--row">
                        <td scope="row" class="table__body--header freeze freeze-ar">1</td>
                        <td class=" freeze freeze-ar">
                            <img
                                src=${data.countryInfo.flag}
                                class="table__icon"
                                alt="Country"
                            />
                            ${data.country}
                        </td>
                        <td >${gCases}</td>
                        <td >${gDeaths}</td>
                        <td >${gCritical}</td>
                        <td >${gRecovered}</td>
                        <td class="  badge-warning " id="warn">${"+" + gTodayCases}</td>
                        <td class=" badge-danger" id="dang">${"+" + gTodayDeaths}</td>
                        <td class=" badge-good" id="good">${"+" + gTodayRecovered}</td>
                        <td >${gActiveCases}</td>
                    </tr>
                    
    `;
        // DOM.countryInfo.insertAdjacentHTML("beforeend", html);
        $(DOM.tableBody).append(html);
    } else if (data.todayCases > 0 && data.todayRecovered > 0 && data.todayRecovered <= 0) {
        const html = `
                    <tr class="table__body--row">
                        <td scope="row" class="table__body--header freeze" style="position: sticky; left: 0;">1</td>
                        <td class=" freeze freeze-ar" >
                            <img
                                src=${data.countryInfo.flag}
                                class="table__icon"
                                alt="Country"
                            />
                            ${data.country}
                        </td>
                        <td >${gCases}</td>
                        <td >${gDeaths}</td>
                        <td >${gCritical}</td>
                        <td >${gRecovered}</td>
                        <td class="  badge-warning" id="warn">${"+" + gTodayCases}</td>
                        <td  id="dang">${gTodayDeaths}</td>
                        <td class=" badge-good" id="good">${"+" + gTodayRecovered}</td>
                        <td >${gActiveCases}</td>
                    </tr>
                    
    `;
        // DOM.countryInfo.insertAdjacentHTML("beforeend", html);
        $(DOM.tableBody).append(html);
    } else if (data.todayDeaths > 0 && data.todayCases > 0 && data.todayRecovered <= 0) {
        const html = `
                    <tr class="table__body--row">
                        <td scope="row" class="table__body--header freeze freeze-ar">1</td>
                        <td class=" freeze freeze-ar" >
                            <img
                                src=${data.countryInfo.flag}
                                class="table__icon"
                                alt="Country"
                            />
                            ${data.country}
                        </td>
                        <td >${gCases}</td>
                        <td >${gDeaths}</td>
                        <td >${gCritical}</td>
                        <td >${gRecovered}</td>
                        <td class="  badge-warning" id="warn">${"+" + gTodayCases}</td>
                        <td class=" badge-danger" id="dang">${"+" + gTodayDeaths}</td>
                        <td  id="good">${gTodayRecovered}</td>
                        <td >${gActiveCases}</td>
                    </tr>
                    
    `;
        // DOM.countryInfo.insertAdjacentHTML("beforeend", html);
        $(DOM.tableBody).append(html);
    } else if (data.todayCases > 0 && data.todayRecovered > 0 && data.todayDeaths <= 0) {
        const html = `
                    <tr class="table__body--row">
                        <td scope="row" class="table__body--header freeze freeze-ar">1</td>
                        <td class=" freeze freeze-ar" >
                            <img
                                src=${data.countryInfo.flag}
                                class="table__icon"
                                alt="Country"
                            />
                            ${data.country}
                        </td>
                        <td >${gCases}</td>
                        <td >${gDeaths}</td>
                        <td >${gCritical}</td>
                        <td >${gRecovered}</td>
                        <td class="  badge-warning" id="warn">${"+" + gTodayCases}</td>
                        <td class=" " id="dang">${gTodayDeaths}</td>
                        <td class=" badge-good" id="good">${"+" + gTodayRecovered}</td>
                        <td >${gActiveCases}</td>
                    </tr>
                    
    `;
        // DOM.countryInfo.insertAdjacentHTML("beforeend", html);
        $(DOM.tableBody).append(html);
    } else if (data.todayDeaths > 0 && data.todayRecovered <= 0 && data.todayCases <= 0) {
        const html = `
                    <tr class="table__body--row">
                        <td scope="row" class="table__body--header freeze freeze-ar">1</td>
                        <td class=" freeze freeze-ar" >
                            <img
                                src=${data.countryInfo.flag}
                                class="table__icon"
                                alt="Country"
                            />
                            ${data.country}
                        </td>
                        <td >${gCases}</td>
                        <td >${gDeaths}</td>
                        <td >${gCritical}</td>
                        <td >${gRecovered}</td>
                        <td  id="warn">${gTodayCases}</td>
                        <td class=" badge-danger" id="dang">${"+" + gTodayDeaths}</td>
                        <td class=" " id="good">${gTodayRecovered}</td>
                        <td >${gActiveCases}</td>
                    </tr>
                    
    `;
        // DOM.countryInfo.insertAdjacentHTML("beforeend", html);
        $(DOM.tableBody).append(html);
    } else if (data.todayRecovered > 0 && data.todayCases <= 0 && data.todayDeaths <= 0) {
        const html = `
                    <tr class="table__body--row">
                        <td scope="row" class="table__body--header freeze freeze-ar">1</td>
                        <td class=" freeze freeze-ar" >
                            <img
                                src=${data.countryInfo.flag}
                                class="table__icon"
                                alt="Country"
                            />
                            ${data.country}
                        </td>
                        <td >${gCases}</td>
                        <td >${gDeaths}</td>
                        <td >${gCritical}</td>
                        <td >${gRecovered}</td>
                        <td  id="warn">${gTodayCases}</td>
                        <td  id="dang">${gTodayDeaths}</td>
                        <td class=" badge-good" id="good">${"+" + gTodayRecovered}</td>
                        <td >${gActiveCases}</td>
                    </tr>
                    
    `;
        // DOM.countryInfo.insertAdjacentHTML("beforeend", html);
        $(DOM.tableBody).append(html);
    } else {
        const html = `
                        <tr class="table__body--row">
                            <td scope="row" class="table__body--header freeze freeze-ar">1</td>
                            <td class=" freeze freeze-ar" >
                                <img
                                    src=${data.countryInfo.flag}
                                    class="table__icon"
                                    alt="Country"
                                />
                                ${data.country}
                            </td>
                            <td >${gCases}</td>
                            <td >${gDeaths}</td>
                            <td >${gCritical}</td>
                            <td >${gRecovered}</td>
                            <td class="  " id="warn">${gTodayCases}</td>
                            <td  id="dang">${gTodayDeaths}</td>
                            <td  id="good">${gTodayRecovered}</td>
                            <td >${gActiveCases}</td>
                        </tr>
        `;
        // DOM.countryInfo.insertAdjacentHTML("beforeend", html);
        $(DOM.tableBody).append(html);
    }

    if (document.location.pathname == "/arabic.html") {
        document.querySelector(".freeze-ar").style.textAlign = "right !important";
    }
};
