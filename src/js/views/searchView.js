//*** ----------------- IMPORTS ----------------- ***\\
import { DOM } from "./base";

//*************************************************************************************\\

//*** ---------------- SEARCH UI ---------------- ***\\
//- Getting search input from the DOM function
export const getInput = () => DOM.searchInput.value;

export const clearSearch = () => {
    DOM.searchInput.value = "";
};

//- Rendering Country name and flag on table
export const renderCountry = (info) => {};
$(".js-data-filter").on("select2:select", function (e) {
    //var url = `https://disease.sh/v3/covid-19/historical/${query}?lastdays=all`;
    //console.log(url);
    this.query = query;
    $.ajax({
        url: `https://disease.sh/v3/covid-19/historical/${query}?lastdays=all`,
        type: "POST",
        data: { url: url },
        success: function (data) {
            console.log(data);
            var query = e.params.data.id;
            console.log(query);
        },
    });
});
