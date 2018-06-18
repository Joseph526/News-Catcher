// Require dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Set up Express app
var app = express();
var PORT = process.env.PORT || 3000;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("./public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Require Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Require scraping tools
var request = require("request");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

// Use morgan logger for logging requests
app.use(logger("dev"));

// Connect to the Mongo DB
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Routes
app.get("/", function(req, res) {
    // Home page
    res.render("index");
});

// GET route for scraping a site
app.get("/scrape", function(req, res) {
    request("https://www.androidpolice.com", function(error, response, html) {
        if (error) {
            console.log(error);
        }
        else {
            var $ = cheerio.load(html);
            $("div.post").each(function(i, element) {
                // Traverse the DOM and save the desired elements
                var result = {};
                result.headline = $(this).find("header").find("h2").children("a").text();
                result.summary = $(this).find("div.post-content").children("p").text();
                result.url = $(this).find("header").find("h2").children("a").attr("href");

                // Push to DB
                db.Article.create(result)
                    .then(function(dbArticle) {
                        console.log(dbArticle);
                    })
                    .catch(function(err) {
                        return res.json(err);
                    });
            });
        }
    });
    res.send("Scrape complete");
});

// GET route for retrieving all articles
app.get("/articles", function(req, res) {
    db.Article.find({})
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});

// GET route for retrieving one article
app.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id })
        .populate("note")
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});

// Start the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
