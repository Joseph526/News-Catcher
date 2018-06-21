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
        // Grab the id of the particular Notes button
        var id = $(this).data("btn-id");
        // Toggle the div with matching id
        $("div.notes#" + id).slideToggle("slow");
    });

    $("button.noteSubmit").on("click", function(event) {
        event.preventDefault();
        
        // Grab the id of the particular Submit button
        var id = $(this).attr("id");
        // Grab the user input data
        var noteData = {
            title: $("#noteTitle" + id).val().trim(),
            body: $("#noteBody" + id).val().trim()
        };
        console.log(noteData);

        // Send the POST request
        $.post("/articles/" + id, noteData)
            .then(function(data) {
                console.log(data);
            });
    });
});
