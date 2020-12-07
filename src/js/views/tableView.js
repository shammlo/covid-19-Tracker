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

//*** ------------- GLOBAL VARIABLE -------------- ***\\
const path = document.location.pathname;
//*** ---------------- TABLE VIEW ---------------- ***\\

//- Rendering global Country name and flag on table
export const renderAllData = (global) => {
    //- Global
    let gCases = formatNumber(global.cases);
    let gDeaths = formatNumber(global.deaths);
    let gCritical = formatNumber(global.critical);
    let gRecovered = formatNumber(global.recovered);
    let gTodayCases = "+" + formatNumber(global.todayCases);
    let gTodayDeaths = "+" + formatNumber(global.todayDeaths);
    let gTodayRecovered = "+" + formatNumber(global.todayRecovered);
    let gActiveCases = formatNumber(global.active);

    if (path == "/arabic.html" || path == "/kurdish.html") {
        gCases = formatNumber(global.cases).toArabicDigits();
        gDeaths = formatNumber(global.deaths).toArabicDigits();
        gCritical = formatNumber(global.critical).toArabicDigits();
        gRecovered = formatNumber(global.recovered).toArabicDigits();
        gTodayCases = formatNumber(global.todayCases).toArabicDigits() + "+";
        gTodayDeaths = formatNumber(global.todayDeaths).toArabicDigits() + "+";
        gTodayRecovered = formatNumber(global.todayRecovered).toArabicDigits() + "+";
        gActiveCases = formatNumber(global.active).toArabicDigits();
        if (global.todayCases === 0 || global.todayDeaths === 0 || global.todayRecovered === 0) {
            gTodayCases = formatNumber(global.todayCases).toArabicDigits();
            gTodayDeaths = formatNumber(global.todayDeaths).toArabicDigits();
            gTodayRecovered = formatNumber(global.todayRecovered).toArabicDigits();
        }
    }
    const html = `
                    <tr class="table__body--row">
                        <td scope="row" class=" ${
                            path === "/arabic.html" || path === "/kurdish.html"
                                ? "freeze-lang"
                                : "freeze"
                        }">1</td>
                        <td class="${
                            path === "/arabic.html" || path === "/kurdish.html"
                                ? "freeze-lang"
                                : "freeze"
                        }" style="${(() => {
        if (path === "/arabic.html") {
            return "right: 5.7rem !important;";
        } else if (path === "/kurdish.html") {
            return "right: 4.5rem !important;";
        } else {
            return "left: 5rem !important;";
        }
    })()}">
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
                        <td class=" badge-warning">${formatNumber(gTodayCases)}</td>
                        <td class=" badge-danger">${formatNumber(gTodayDeaths)}</td>
                        <td class=" badge-good">${formatNumber(gTodayRecovered)}</td>
                        <td >${formatNumber(gActiveCases)}</td>
                    </tr>
                    
    `;

    // if (path == "/arabic.html") {
    //     document.querySelector(".freeze").classList.add("freeze-lang");
    // }
    // DOM.countryInfo.insertAdjacentHTML("beforeend", html);
    $(DOM.tableBody).append(html);

    //------------------------------------------------------------------------------
};

$.countryData = (data) => {
    // data.forEach($.renderCountriesApi);

    $(".dataTables_length").addClass(".bs-select");
    if (path === "/arabic.html") {
        var arabic = {
            sProcessing: "جاري التحميل...",
            sLengthMenu: "أظهر مُدخلات _MENU_",
            sZeroRecords: "لم يُعثر على أية سجلات",
            sInfo: "إظـهـار _START_ إلى _END_ مـن أصـل _TOTAL_ مُـدخـل",
            sInfoEmpty: "يعرض 0 إلى 0 من أصل 0 سجلّ",
            sInfoFiltered: "(منتقاة من مجموع _MAX_ مُدخل)",
            sInfoPostFix: "",
            sSearch: "ابــــحـــث:",
            searchPlaceholder: "ابــحــث عــن الــدولــة",

            sUrl: "",
            oPaginate: {
                sFirst: "الأول",
                sPrevious: "السابق",
                sNext: "التالي",
                sLast: "الأخير",
            },
        };

        $("#dtBasicExample").on("draw.dt", function () {
            $(".paginate_button")
                .not(".previous, .next")
                .each(function (i, a) {
                    var val = $(a).text();
                    val = new Intl.NumberFormat("ar-EG").format(val);
                    $(a).text(val);
                });
        });
        $("#dtBasicExample").DataTable({
            pagingType: "simple_numbers",
            data: data.forEach($.renderCountriesApi),
            sort: "data.cases",
            dom: "lBfrtip",
            language: arabic,
            columnDefs: [
                {
                    searchable: false,
                    orderable: false,
                    targets: 0,
                },
            ],
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
    } else if (path === "/kurdish.html") {
        var kurdish = {
            sProcessing: "تـكـایـە چـاوەڕوان بـە...",
            sLengthMenu: "پـیـشـانـدانـی گـشـتـی وڵـاتـان _MENU_",
            sZeroRecords: "ھـیـچ زانـیـاریـیـەكـی تـۆمـاركـراو نـەدۆزرایـەوە",
            sInfo: "پـیـشـانـدانـی _START_ بـۆ _END_ لـە كـۆی گـشـتـی _TOTAL_ تـۆمـاركـراو",
            sInfoEmpty: "پـیـشـانـدانـی 0 بـۆ 0 لـە كـۆی گـشـتـی 0 تـۆمـاركـراو",
            sInfoFiltered: "(دەسـتـنـیـشـانـكـراوە لـە كـۆی گـشـتـی _MAX_ تـۆمـاركـراو)",
            sInfoPostFix: "",
            sSearch: "گـەڕان:  ",
            searchPlaceholder: "گـەڕان بـەدوای وڵـاتـێـكـی دیـاركـراو",

            sUrl: "",
            oPaginate: {
                sFirst: "یـەكـەم",
                sPrevious: "پـێـشـووتـر",
                sNext: "دواتـر",
                sLast: "كـۆتـا",
            },
        };
        $("#dtBasicExample").on("draw.dt", function () {
            $(".paginate_button")
                .not(".previous, .next")
                .each(function (i, a) {
                    var val = $(a).text();
                    val = new Intl.NumberFormat("ar-EG").format(val);
                    $(a).text(val);
                });
        });
        $("#dtBasicExample").DataTable({
            pagingType: "simple_numbers",
            data: data.forEach($.renderCountriesApi),
            sort: "data.cases",

            dom: "lBfrtip",
            language: kurdish,
            columnDefs: [
                {
                    searchable: false,
                    orderable: false,
                    targets: 0,
                },
            ],

            order: [],
            bLengthChange: false,
            fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                //debugger;
                var index = iDisplayIndexFull + 1;
                $("td:first", nRow).html(index);
                return nRow;
            },
        });
    } else {
        $("#dtBasicExample").DataTable({
            pagingType: "simple_numbers",
            data: data.forEach($.renderCountriesApi),
            sort: "data.cases",

            dom: "lBfrtip",
            columnDefs: [
                {
                    searchable: false,
                    orderable: false,
                    targets: 0,
                },
            ],

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
    let gTodayCases = "+" + formatNumber(data.todayCases);
    let gTodayDeaths = "+" + formatNumber(data.todayDeaths);
    let gTodayRecovered = "+" + formatNumber(data.todayRecovered);
    let gActiveCases = formatNumber(data.active);
    if (data.todayCases === 0) {
        gTodayCases = formatNumber(data.todayCases);
    } else if (data.todayDeaths === 0) {
        gTodayDeaths = formatNumber(data.todayDeaths);
    } else if (data.todayRecovered === 0) {
        gTodayRecovered = formatNumber(data.todayRecovered);
    }
    if (data.todayCases === 0 && data.todayDeaths === 0 && data.todayRecovered === 0) {
        gTodayCases = formatNumber(data.todayCases);
        gTodayDeaths = formatNumber(data.todayDeaths);
        gTodayRecovered = formatNumber(data.todayRecovered);
    }

    if (path === "/arabic.html" || path === "/kurdish.html") {
        gCases = formatNumber(data.cases).toArabicDigits();
        gDeaths = formatNumber(data.deaths).toArabicDigits();
        gCritical = formatNumber(data.critical).toArabicDigits();
        gRecovered = formatNumber(data.recovered).toArabicDigits();
        gTodayCases = formatNumber(data.todayCases).toArabicDigits() + "+";
        gTodayDeaths = formatNumber(data.todayDeaths).toArabicDigits() + "+";
        gTodayRecovered = formatNumber(data.todayRecovered).toArabicDigits() + "+";
        gActiveCases = formatNumber(data.active).toArabicDigits();
        if (data.todayCases === 0) {
            gTodayCases = formatNumber(data.todayCases).toArabicDigits();
        } else if (data.todayDeaths === 0) {
            gTodayDeaths = formatNumber(data.todayDeaths).toArabicDigits();
        } else if (data.todayRecovered === 0) {
            gTodayRecovered = formatNumber(data.todayRecovered).toArabicDigits();
        }
        if (data.todayCases === 0 && data.todayDeaths === 0 && data.todayRecovered === 0) {
            gTodayCases = formatNumber(data.todayCases).toArabicDigits();
            gTodayDeaths = formatNumber(data.todayDeaths).toArabicDigits();
            gTodayRecovered = formatNumber(data.todayRecovered).toArabicDigits();
        }
    }

    const html = `
                    <tr class="table__body--row">
                        <td  class="${
                            path === "/arabic.html" || path === "/kurdish.html"
                                ? "freeze-lang"
                                : "freeze"
                        }">1</td>
                        <td class=" ${
                            path === "/arabic.html" || path === "/kurdish.html"
                                ? "freeze-lang"
                                : "freeze"
                        }" style="${(() => {
        if (path === "/arabic.html") {
            return "right: 5.7rem !important;";
        } else if (path === "/kurdish.html") {
            return "right: 4.5rem !important;";
        } else {
            return "left: 5rem !important;";
        }
    })()}">
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
                        <td class="${(() => {
                            if (data.todayCases > 0) {
                                return "badge-warning";
                            } else {
                                return;
                            }
                        })()}   " id="warn">${gTodayCases}</td>
                        <td class=" ${(() => {
                            if (data.todayDeaths > 0) {
                                return "badge-danger";
                            } else {
                                return "";
                            }
                        })()} " id="dang">${gTodayDeaths}</td>
                        <td class="${(() => {
                            if (data.todayRecovered > 0) {
                                return "badge-good";
                            } else {
                                return;
                            }
                        })()}  " id="good">${gTodayRecovered}</td>
                        <td >${gActiveCases}</td>
                    </tr>
                    
    `;

    $(DOM.tableBody).append(html);

    if (path == "/arabic.html" || path == "/kurdish.html") {
        document.querySelector(".freeze-ar").style.textAlign = "right !important";
    }
};
