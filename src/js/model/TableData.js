//*** ----------------- IMPORTS ---------------- ***\\

import axios from "axios";

//*** ----------------- MAIN API ---------------- ***\\

export default class GlobalData {
    constructor() {}

    async getResults() {
        try {
            //- for All Countries
            const res = await axios(
                `https://disease.sh/v3/covid-19/countries?yesterday=false&twoDaysAgo=false&sort=cases`,
                {
                    method: "GET",
                    redirect: "follow",
                }
            );

            this.data = await res.data;
            this.cases = await res.data.cases;
            this.dead = await res.data.deaths;
            this.todayCases = await res.data.todayCases;
            this.todayDeads = await res.data.todayDeaths;
            this.recovered = await res.data.recovered;
            this.todayRecovered = await res.data.todayRecovered;

            this.name = await res.data.country;
            this.countryInfo = await res.data.countryInfo;
            //----------------------------------------------------------------
        } catch (error) {
            console.log(error);
        }
    }
}
