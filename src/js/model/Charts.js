//*** ----------------- IMPORTS ----------------- ***\\

import axios from "axios";

//*** ----------------- MAIN API ----------------- ***\\

export default class Charts {
    constructor() {}

    async getResults() {
        try {
            //- for Country search
            const res = await axios(
                `https://disease.sh/v3/covid-19/countries?yesterday=false&twoDaysAgo=false`,
                {
                    method: "GET",
                    redirect: "follow",
                }
            );
            this.result = await res.data;
            //----------------------------------------------------------------
        } catch (error) {
            console.log(error);
        }
    }
    async getByDayCases() {
        try {
            //- for Country search
            const res = await axios(`https://disease.sh/v3/covid-19/historical/all?lastdays=all`, {
                method: "GET",
                redirect: "follow",
            });

            this.result = await res.data;
            this.onlyCases = await Object.values(this.result.cases);
            this.onlyDates = await Object.keys(this.result.cases);

            //----------------------------------------------------------------
        } catch (error) {
            console.log(error);
        }
    }
}
