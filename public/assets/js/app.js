$(document).ready(function() {
    $("#btnGetArticles").on("click", function(event) {
        event.preventDefault();

        // Send the GET request
        $.get("/scrape")
            .done(function(data) {
                console.log(data);
            });
    });
});
