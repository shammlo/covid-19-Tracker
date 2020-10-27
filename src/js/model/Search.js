//*** ----------------- IMPORTS ----------------- ***\\

import axios from "axios";

//*** ----------------- MAIN API ----------------- ***\\

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            //- for Country search
            const res = await axios(
                `https://disease.sh/v3/covid-19/historical/${this.query}?lastdays=all`,
                {
                    method: "GET",
                    redirect: "follow",
                }
            );

            this.result = await res.data;
            console.log(res);

            //----------------------------------------------------------------
        } catch (error) {
            console.log(error);
        }
    }
}
