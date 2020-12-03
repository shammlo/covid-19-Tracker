//*** ----------------- IMPORTS ----------------- ***\\
import { DOM } from "./base";

//*************************************************************************************\\
//*** ------------- GLOBAL VARIABLE -------------- ***\\
const path = document.location.pathname;
//*** ------------ PRIVATE FUNCTIONS ------------ ***\\

//- Calculation of yesterday
const yesterdayCalc = () => {
    return {
        yesterdayPercent: (cases, yesterday) => {
            const yesterdayCase = cases - yesterday;
            const yesterdayPercent = parseFloat(((yesterdayCase / cases) * 100).toFixed(2));

            return yesterdayPercent;
            // return Math.abs(yesterdayPercent);
        },
        FormattingNumber: (number) => {
            if (path == "/arabic.html") {
                if (isNaN(number)) return number;

                if (number < 9999) {
                    return (number / 1000).toFixed(1) + "ألف";
                }

                if (number < 1000000) {
                    return (number / 1000).toFixed(1) + "ألف";
                }
                if (number < 10000000) {
                    return (number / 1000000).toFixed(1) + "مليون";
                }

                if (number < 1000000000) {
                    return (number / 1000000).toFixed(1) + "مليون";
                }

                if (number < 1000000000000) {
                    return (number / 1000000000).toFixed(1) + "مليار";
                }

                return "1تريليون+";
            } else if (path == "/kurdish.html") {
                if (isNaN(number)) return number;

                if (number < 9999) {
                    return (number / 1000).toFixed(1) + "ھـەزار";
                }

                if (number < 1000000) {
                    return (number / 1000).toFixed(1) + "ھـەزار";
                }
                if (number < 10000000) {
                    return (number / 1000000).toFixed(1) + "مـلـیـۆن";
                }

                if (number < 1000000000) {
                    return (number / 1000000).toFixed(1) + "مـلـیـۆن";
                }

                if (number < 1000000000000) {
                    return (number / 1000000000).toFixed(1) + "مليار";
                }

                return "1تريليون+";
            }
            if (isNaN(number)) return number;

            if (number < 9999) {
                return (number / 1000).toFixed(1) + "k";
            }

            if (number < 1000000) {
                return (number / 1000).toFixed(1) + "K";
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
        },
        SignRemove: (data) => {
            return {
                posAr: Math.abs(parseFloat(data)).toString().toArabicDigits(),
                pos: Math.abs(parseFloat(data)).toString(),
            };
        },
    };
};

String.prototype.toArabicDigits = function () {
    var id = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return this.replace(/[0-9]/g, function (w) {
        return id[+w];
    });
};

//*************************************************************************************\\

//*** ------------- PUBLIC FUNCTIONS ------------- ***\\

//* total cases
//- rendering the total number of confirmed cases for today and yesterday
export const renderTotalCases = (cases, yesterday) => {
    //- Today
    const totalCases = cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    DOM.totalCases.textContent = totalCases;

    //- Yesterday
    const yesterdayData = yesterdayCalc();
    DOM.yesterdayCase.textContent = "(" + yesterdayData.FormattingNumber(yesterday) + ")";
    const data = yesterdayData.yesterdayPercent(cases, yesterday).toString();

    //- For Arabic language
    if (path == "/arabic.html" || path == "/kurdish.html") {
        DOM.totalCases.textContent = totalCases.toArabicDigits();
        DOM.yesterdayCase.textContent =
            "(" + yesterdayData.FormattingNumber(yesterday).toArabicDigits() + ")";
    }
    const pos = yesterdayData.SignRemove(data);

    if (data < 0) {
        document
            .querySelector(".data__confirmed .card__box--info .info-increase")
            .classList.add("success");

        if (path == "/arabic.html") {
            DOM.totalCaseInc.textContent = "% " + pos.posAr + " انخفضت";
        } else if (path == "/kurdish.html") {
            DOM.totalCaseInc.textContent = "% " + pos.posAr + " كـەمـی كـردووە";
        } else {
            DOM.totalCaseInc.textContent = pos.pos + "% decreased";
        }
    } else if (data > 0) {
        document
            .querySelector(".data__confirmed .card__box--info .info-increase")
            .classList.add("danger");
        if (path == "/arabic.html") {
            DOM.totalCaseInc.textContent = "% " + pos.posAr + " زاد";
        } else if (path == "/kurdish.html") {
            DOM.totalCaseInc.textContent = "% " + pos.posAr + " زیـادی كـردووە";
        } else {
            DOM.totalCaseInc.textContent = pos.pos + "% increased";
        }
    }
};

//* Total Deaths
//- Rendering the total number of dead cases
export const renderTotalDead = (dead, yesterday) => {
    const totalDead = dead.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    DOM.totalDead.textContent = totalDead;

    //- Yesterday
    const yesterdayData = yesterdayCalc();
    DOM.yesterdayDead.textContent = "(" + yesterdayData.FormattingNumber(yesterday) + ")";
    const data = yesterdayData.yesterdayPercent(dead, yesterday).toString();

    //- For Arabic language
    if (path == "/arabic.html" || path == "/kurdish.html") {
        DOM.totalDead.textContent = totalDead.toArabicDigits();
        DOM.yesterdayDead.textContent =
            "(" + yesterdayData.FormattingNumber(yesterday).toArabicDigits() + ")";
    }
    const pos = yesterdayData.SignRemove(data);

    if (data < 0) {
        document
            .querySelector(".data__Dead .card__box--info .info-increase")
            .classList.add("success");

        if (path == "/arabic.html") {
            DOM.totalDeadInc.textContent = "% " + pos.posAr + " انخفضت";
        } else if (path == "/kurdish.html") {
            DOM.totalDeadInc.textContent = "% " + pos.posAr + " كـەمـی كـردووە";
        } else {
            DOM.totalDeadInc.textContent = pos.pos + "% decreased";
        }
    } else if (data > 0) {
        document
            .querySelector(".data__Dead .card__box--info .info-increase")
            .classList.add("danger");

        if (path == "/arabic.html") {
            DOM.totalDeadInc.textContent = "% " + pos.posAr + " زاد";
        } else if (path == "/kurdish.html") {
            DOM.totalDeadInc.textContent = "% " + pos.posAr + " زیـادی كـردووە";
        } else {
            DOM.totalDeadInc.textContent = pos.pos + "% increased";
        }
    }
};

//* Total Recovered
//- Rendering Recovered totalCases
export const renderTotalRecovered = (recovered, yesterday) => {
    const totalRecovered = recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    DOM.totalRecovered.textContent = totalRecovered;

    //- Yesterday
    const yesterdayData = yesterdayCalc();
    DOM.yesterdayRec.textContent = "(" + yesterdayData.FormattingNumber(yesterday) + ")";
    const data = yesterdayData.yesterdayPercent(recovered, yesterday).toString();

    //- For Arabic language
    if (path == "/arabic.html" || path == "/kurdish.html") {
        DOM.totalRecovered.textContent = totalRecovered.toArabicDigits();
        DOM.yesterdayRec.textContent =
            "(" + yesterdayData.FormattingNumber(yesterday).toArabicDigits() + ")";
    }
    const pos = yesterdayData.SignRemove(data);

    if (data < 0) {
        document
            .querySelector(".data__recovered .card__box--info .info-increase")
            .classList.add("danger");

        if (path == "/arabic.html") {
            DOM.totalRecoveredInc.textContent = "% " + pos.posAr + " انخفضت";
        } else if (path == "/kurdish.html") {
            DOM.totalRecoveredInc.textContent = "% " + pos.posAr + " كـەمـی كـردووە";
        } else {
            DOM.totalRecoveredInc.textContent = pos.pos + "% decreased";
        }
    } else if (data > 0) {
        document
            .querySelector(".data__recovered .card__box--info .info-increase")
            .classList.add("success");

        if (path == "/arabic.html") {
            DOM.totalRecoveredInc.textContent = "% " + pos.posAr + " زاد";
        } else if (path == "/kurdish.html") {
            DOM.totalRecoveredInc.textContent = "% " + pos.posAr + " زیـادی كـردووە";
        } else {
            DOM.totalRecoveredInc.textContent = pos.pos + "% increased";
        }
    }
};

//*************************************************************************************\\

//* Today Cases
//- Rendering today's Cases
export const renderTodayCases = (cases, yesterday) => {
    const todayCases = cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    DOM.todayCases.textContent = "+ " + todayCases;

    //- Yesterday
    const yesterdayData = yesterdayCalc();
    DOM.totalYesCases.textContent = "(" + yesterdayData.FormattingNumber(yesterday) + ")";
    const data = yesterdayData.yesterdayPercent(cases, yesterday).toString();

    //- For Arabic language
    if (path == "/arabic.html" || path == "/kurdish.html") {
        DOM.todayCases.textContent = todayCases.toArabicDigits();
        DOM.totalYesCases.textContent =
            "(" + yesterdayData.FormattingNumber(yesterday).toArabicDigits() + ")";
    }
    const pos = yesterdayData.SignRemove(data);

    if (data < 0) {
        document
            .querySelector(".data__cases .card__box--info .info-increase")
            .classList.add("success");

        if (path == "/arabic.html") {
            DOM.todayCaseInc.textContent = "% " + pos.posAr + " انخفضت";
        } else if (path == "/kurdish.html") {
            DOM.todayCaseInc.textContent = "% " + pos.posAr + " كـەمـی كـردووە";
        } else {
            DOM.todayCaseInc.textContent = pos.pos + "% decreased";
        }
    } else if (data > 0) {
        document
            .querySelector(".data__cases .card__box--info .info-increase")
            .classList.add("danger");
        if (path == "/arabic.html") {
            DOM.todayCaseInc.textContent = "% " + pos.posAr + " زاد";
        } else if (path == "/kurdish.html") {
            DOM.todayCaseInc.textContent = "% " + pos.posAr + " زیـادی كـردووە";
        } else {
            DOM.todayCaseInc.textContent = pos.pos + "% increased";
        }
    }
};

//* Today Deaths
//- Rendering today's Deaths
export const renderTodayDeaths = (deaths, yesterday) => {
    const todayDeaths = deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    DOM.todayDeaths.textContent = "+ " + todayDeaths;

    //- Yesterday
    const yesterdayData = yesterdayCalc();
    DOM.totalYesDead.textContent = "(" + yesterdayData.FormattingNumber(yesterday) + ")";
    const data = yesterdayData.yesterdayPercent(deaths, yesterday).toString();

    //- For Arabic language
    if (path == "/arabic.html" || path == "/kurdish.html") {
        DOM.todayDeaths.textContent = todayDeaths.toArabicDigits();
        DOM.totalYesDead.textContent =
            "(" + yesterdayData.FormattingNumber(yesterday).toArabicDigits() + ")";
    }
    const pos = yesterdayData.SignRemove(data);

    if (data < 0) {
        document
            .querySelector(".data__death .card__box--info .info-increase")
            .classList.add("success");
        if (path == "/arabic.html") {
            DOM.todayDeadInc.textContent = "% " + pos.posAr + " انخفضت";
        } else if (path == "/kurdish.html") {
            DOM.todayDeadInc.textContent = "% " + pos.posAr + " كـەمـی كـردووە";
        } else {
            DOM.todayDeadInc.textContent = pos.pos + "% decreased";
        }
    } else if (data > 0) {
        document
            .querySelector(".data__death .card__box--info .info-increase")
            .classList.add("danger");
        if (path == "/arabic.html") {
            DOM.todayDeadInc.textContent = "% " + pos.posAr + " زاد";
        } else if (path == "/kurdish.html") {
            DOM.todayDeadInc.textContent = "% " + pos.posAr + " زیـادی كـردووە";
        } else {
            DOM.todayDeadInc.textContent = pos.pos + "% increased";
        }
    }
};

//* Today Recovered
//- Rendering today's Recovered
export const renderTodayRecovered = async (recovered, yesterday) => {
    const todayRecovered = await recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    DOM.todayRecovered.textContent = "+ " + todayRecovered;

    //- Yesterday
    const yesterdayData = yesterdayCalc();
    DOM.totalYesRec.textContent = "(" + yesterdayData.FormattingNumber(yesterday) + ")";
    const data = yesterdayData.yesterdayPercent(recovered, yesterday).toString();

    //- For Arabic language
    if (path == "/arabic.html" || path == "/kurdish.html") {
        DOM.todayRecovered.textContent = todayRecovered.toArabicDigits();
        DOM.totalYesRec.textContent =
            "(" + yesterdayData.FormattingNumber(yesterday).toArabicDigits() + ")";
    }
    const pos = yesterdayData.SignRemove(data);

    if (data < 0) {
        document
            .querySelector(".data__TodRecovered .card__box--info .info-increase")
            .classList.add("danger");

        if (path == "/arabic.html") {
            DOM.todayRecoveredInc.textContent = "% " + pos.posAr + " انخفضت";
        } else if (path == "/kurdish.html") {
            DOM.todayRecoveredInc.textContent = "% " + pos.posAr + " زیـادی كـردووە";
        } else {
            DOM.todayRecoveredInc.textContent = pos.pos + "% decreased";
        }
    } else if (data > 0) {
        document
            .querySelector(".data__TodRecovered .card__box--info .info-increase")
            .classList.add("success");
        if (path == "/arabic.html") {
            DOM.todayRecoveredInc.textContent = "% " + pos.posAr + " زاد";
        } else if (path == "/kurdish.html") {
            DOM.todayRecoveredInc.textContent = "% " + pos.posAr + " زیـادی كـردووە";
        } else {
            DOM.todayRecoveredInc.textContent = pos.pos + "% increased";
        }
    }
};

//- Rendering Updated time based on the current date
export const renderUpdatedTime = (updated) => {
    var date = new Date(updated);
    var minutes = date.getMinutes() % 60;
    var hour = date.getHours();

    //? current time
    // const now = new Date();
    // var min = now.getMinutes();
    // var hou = now.getHours();
    // const newH = hou - hour;
    // const newM = minutes - min;
    // const ago = newH + ":" + newM;
    const current = Math.abs(new Date() - date);
    const timesAgo = Math.round(current / 60000);
    // console.log("new" + " " + timesAgo);
    if (timesAgo > 60) {
    }

    let time = hour >= 12 ? "pm" : "am";
    minutes < 10 ? (minutes = `0${minutes}`) : minutes;
    hour > 12 ? (hour -= 12) : hour < 10 ? `0${hour}` : hour;
    // console.log(`${hour}:${minutes}${time}`);
    // DOM.updatedTime.innerHTML = `${hour}:${minutes}${time}`;
    DOM.updatedTime.innerHTML = `${timesAgo}`;
};

//* yesterday Data UI
//- Render Yesterday data

// export const renderYesterday
