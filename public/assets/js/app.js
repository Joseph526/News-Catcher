$(document).ready(function() {
    $("#btnGetArticles").on("click", function(event) {
        event.preventDefault();

        // Send the GET request
        $.get("/scrape")
            .done(function(data) {
                console.log(data);
            });
    });

    $("button.notes").on("click", function(event) {
        var id = $(this).data("btn-id");
        $("div.notes#" + id).slideToggle("slow");
    });
});
