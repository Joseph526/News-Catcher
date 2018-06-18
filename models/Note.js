// Require dependencies
var mongoose = require("mongoose");

// Initialize the Schema constructor
var Schema = mongoose.Schema;

// Define a new Schema object
var NoteSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    body: {
        type: String,
        required: false
    }
});

// Create a new model with the schema object
var Note = mongoose.model("Note", NoteSchema);

// Export the model
module.exports = Note;
