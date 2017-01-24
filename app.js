var express = require("express");
var app = express();
var request = require("request");

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req,res) {
    res.render("search");
});

// Take result data requesting from API and put inside of a route. Display using html.
app.get("/results", function(req,res) {
    var query = req.query.search;
    var url = "https://www.omdbapi.com/?s=" + query;
    
    request(url, function(error, response, body) {
       if(!error && response.statusCode == 200) {
           var data = JSON.parse(body);
            // render results ejs file with the following data variables. 
           res.render("results", {data: data});
       }
   });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Movie App has started!!!");
});