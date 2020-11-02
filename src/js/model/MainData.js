//*** ----------------- IMPORTS ----------------- ***\\

import axios from "axios";

//*** ----------------- MAIN API ----------------- ***\\

export default class MainData {
    constructor() {}

    async todayResults() {
        try {
            //- today data
            const res = await axios("https://corona.lmao.ninja/v2/all", {
                method: "GET",
                redirect: "follow",
            });

            this.data = await res.data;
            this.totalCases = await this.data.cases;
            this.totalDead = await this.data.deaths;
            this.totalRecovered = await this.data.recovered;
            this.todayCases = await this.data.todayCases;
            this.todayDeaths = await this.data.todayDeaths;
            this.todayRecovered = await this.data.todayRecovered;
            this.todayData = await this.data.updated;
            this.upDateDTime = await res.data.updated;

            // https://disease.sh/v3/covid-19/all?yesterday=false
            //----------------------------------------------------------------
        } catch (error) {
            console.log(error);
        }
    }
    async yesterdayResults() {
        try {
            //- Yesterday data
            const yesterday = await axios(
                `https://disease.sh/v3/covid-19/all?yesterday=true&twoDaysAgo=false`,
                {
                    method: "GET",
                    redirect: "follow",
                }
            );
            this.data = yesterday.data;
            this.yesterdayCases = await yesterday.data.cases;
            this.yesterdayDead = await yesterday.data.deaths;
            this.yesterdayRecovered = await yesterday.data.recovered;

            this.yesterdayTodCases = await yesterday.data.todayCases;
            this.yesterdayTodDead = await yesterday.data.todayDeaths;
            this.yesterdayTodRecovered = await yesterday.data.todayRecovered;

            //----------------------------------------------------------------
        } catch (error) {
            console.log(error);
        }
    }
}
