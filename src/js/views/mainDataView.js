//*** ----------------- IMPORTS ----------------- ***\\
import { DOM } from "./base";

//*************************************************************************************\\
//*** ------------ PRIVATE FUNCTIONS ------------ ***\\

//- Calculation of yesterday
const yesterdayCalc = () => {
    return {
        yesterdayPercent: (cases, yesterday) => {
            const yesterdayCase = cases - yesterday;
            const yesterdayPercent = parseFloat(((yesterdayCase / cases) * 100).toFixed(2));
            // DOM.infoIncrease.classList.toggle("active");
            //console.log(yesterdayPercent);
            // if (yesterdayPercent < 0) {
            //     DOM.increase.textContent = "hi";
            //     DOM.infoIncrease.classList.toggle("active");
            // } else if (yesterdayPercent >= 0) {
            //     const increase = document.querySelectorAll(".increase");
            //     increase.forEach((element) => {
            //         element.textContent = "% increase";
            //     });
            // }
            return yesterdayPercent;
            // return Math.abs(yesterdayPercent);
        },
        FormattingNumber: (number) => {
            if (isNaN(number)) return number;

            if (number < 9999) {
                return (number / 1000).toFixed(1) + "k";
            }

            if (number < 1000000) {
                return Math.round(number / 1000) + "K";
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
    };
};

//*************************************************************************************\\

//*** --------------- MAIN DATA UI --------------- ***\\

//*** ------------- PUBLIC FUNCTIONS ------------- ***\\

//* total
//- rendering the total number of confirmed cases for today and yesterday
export const renderTotalCases = (cases, yesterday) => {
    //- Today
    const totalCases = cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    DOM.totalCases.textContent = totalCases;

    //- Yesterday
    const yesterdayData = yesterdayCalc();
    DOM.yesterdayCase.textContent = "(" + yesterdayData.FormattingNumber(yesterday) + ")";

    const data = yesterdayData.yesterdayPercent(cases, yesterday);

    if (data < 0) {
        DOM.totalCaseInc.textContent = data + "% decreased";
        document
            .querySelector(".data__confirmed .card__box--info .info-increase")
            .classList.add("success");
    } else if (data > 0) {
        DOM.totalCaseInc.textContent = data + "% increased";
        document
            .querySelector(".data__confirmed .card__box--info .info-increase")
            .classList.add("danger");
    }
};

//* Total Deaths
//- Rendering the total number of dead cases
export const renderTotalDead = (dead, yesterday) => {
    const totalDead = dead.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    DOM.totalDead.textContent = totalDead;

    //- Yesterday
    const yesterdayData = yesterdayCalc();

    DOM.yesterdayDead.textContent = yesterdayData.FormattingNumber(yesterday);

    const data = yesterdayData.yesterdayPercent(dead, yesterday);

    if (data < 0) {
        DOM.totalDeadInc.textContent = data + "% decreased";
        document
            .querySelector(".data__Dead .card__box--info .info-increase")
            .classList.add("success");
    } else if (data > 0) {
        DOM.totalDeadInc.textContent = data + "% increased";
        document
            .querySelector(".data__Dead .card__box--info .info-increase")
            .classList.add("danger");
    }
};

//* Total Recovered
//- Rendering Recovered totalCases
export const renderTotalRecovered = (recovered, yesterday) => {
    const totalRecovered = recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    DOM.totalRecovered.textContent = totalRecovered;

    //- Yesterday
    const yesterdayData = yesterdayCalc();
    DOM.yesterdayRec.textContent = yesterdayData.FormattingNumber(yesterday);

    const data = yesterdayData.yesterdayPercent(recovered, yesterday);

    if (data < 0) {
        DOM.totalRecoveredInc.textContent = data + "% decreased";
        document
            .querySelector(".data__recovered .card__box--info .info-increase")
            .classList.add("danger");
    } else if (data > 0) {
        DOM.totalRecoveredInc.textContent = data + "% increased";
        document
            .querySelector(".data__recovered .card__box--info .info-increase")
            .classList.add("success");
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
    DOM.totalYesCases.textContent = yesterdayData.FormattingNumber(yesterday);
    const data = yesterdayData.yesterdayPercent(cases, yesterday);

    if (data < 0) {
        DOM.todayCaseInc.textContent = data + "% decreased";
        document
            .querySelector(".data__cases .card__box--info .info-increase")
            .classList.add("success");
    } else if (data > 0) {
        DOM.todayCaseInc.textContent = data + "% increased";
        document
            .querySelector(".data__cases .card__box--info .info-increase")
            .classList.add("danger");
        // document
        //     .querySelector(".data__cases .card__box .heading-2")
        //     .classList.add("heading-2__warning");
    }
};

//* Today Deaths
//- Rendering today's Deaths
export const renderTodayDeaths = (deaths, yesterday) => {
    const todayDeaths = deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    DOM.todayDeaths.textContent = "+ " + todayDeaths;

    //- Yesterday
    const yesterdayData = yesterdayCalc();
    DOM.totalYesDead.textContent = yesterdayData.FormattingNumber(yesterday);

    const data = yesterdayData.yesterdayPercent(deaths, yesterday);
    if (data < 0) {
        DOM.todayDeadInc.textContent = data + "% decreased";
        document
            .querySelector(".data__death .card__box--info .info-increase")
            .classList.add("success");
    } else if (data > 0) {
        DOM.todayDeadInc.textContent = data + "% increased";
        document
            .querySelector(".data__death .card__box--info .info-increase")
            .classList.add("danger");
    }
};

//* Today Recovered
//- Rendering today's Recovered
export const renderTodayRecovered = (recovered, yesterday) => {
    const todayRecovered = recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    DOM.todayRecovered.textContent = "+ " + todayRecovered;

    //- Yesterday
    const yesterdayData = yesterdayCalc();
    DOM.totalYesRec.textContent = yesterdayData.FormattingNumber(yesterday);

    const data = yesterdayData.yesterdayPercent(recovered, yesterday);
    if (data < 0) {
        DOM.todayRecoveredInc.textContent = data + "% decreased";
        document
            .querySelector(".data__TodRecovered .card__box--info .info-increase")
            .classList.add("danger");
    } else if (data > 0) {
        DOM.todayRecoveredInc.textContent = data + "% increased";
        document
            .querySelector(".data__TodRecovered .card__box--info .info-increase")
            .classList.add("success");
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
    console.log(`${hour}:${minutes}${time}`);
    // DOM.updatedTime.innerHTML = `${hour}:${minutes}${time}`;
    DOM.updatedTime.innerHTML = `${timesAgo}`;
};

//* yesterday Data UI
//- Render Yesterday data

// export const renderYesterday
