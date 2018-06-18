$(document).ready(function() {
    $("#btnGetArticles").on("click", function(event) {
        event.preventDefault();

        // Send the GET request
        $.get("/articles")
            .then(function() {
                location.reload();
            });
    });
});
