var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var fs = require('fs');
var path = require('path');
var multer = require('multer');
//use to upload file
var formidable = require('formidable');
var app = express();

var tours = [
    {
        name: "Ha Long Bay",
        address: "Quang Ninh Province",
        desc : "Ha Long Bay is a UNESCO World Heritage Site and popular travel destination in Quang Ninh Province, Vietnam. Administratively, the bay belongs to Ha Long City, Cam Pha town, and is a part of Van Đon District.",
        url: "tour_detail/halongbay"

    },
    {
        name: "Nha Trang",
        address: "Khanh Hoa Province",
        desc : "Nha Trang is a coastal city and capital of Khanh Hoa Province, on the South Central Coast of Vietnam. It is bounded on the north by Ninh Hoà district, on the south by Cam Ranh town and on the west by Dien Khanh District.",
        url: "tour_detail/nhatrang"

    },
    {
        name: "Da Lat",
        address: "Lam Dong Province",
        desc : "Da Lat's specific sights are pine wood (forming the name: 'City of thousands of pine trees') with twisting roads and tree marigold blossom in the winter. The city’s temperate weather stands in contrast to Vietnam's otherwise tropical climate. Mist covering the valleys almost year-round leads to its name 'City of Eternal Spring'.",
        url: "tour_detail/dalat"

    }
];

//set view engine
app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
    next();
});

app.use(express.static("./public"));

app.use(cors());

app.get("/", function(req, res){
    res.render("index", {"tours": tours});
})
app.get("/tours", function(req, res) {
    res.json(tours);
});

app.post("/tours", function(req, res) {
    tours.push(req.body);
    res.json(tours);
});

app.delete("/tours/:id", function(req, res) {
    console.log(req.params);
    tours = tours.filter(function(definition) {
        return definition.name.toLowerCase() !== req.params.id.toLowerCase();
    });
    res.json(tours);
});

function removeSpace(str){
    str.replace(' ', '');
};

app.get("/tour_detail/:name", function(req, res){
    tour = tours.find(function(tour) {
        return removeSpace(tour.name.toLowerCase()) === removeSpace(req.params.name.toLowerCase());
    });
    res.render("tour_detail", {tour: tour});
});

app.listen(3000);

console.log("Express app running on port 3000");

module.exports = app;
