// Require dependencies
var mongoose = require("mongoose");

// Initialize the Schema constructor
var Schema = mongoose.Schema;

// Define a new Schema object
var ArticleSchema = new Schema({
    headline: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

// Create a new model with the schema object
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;
