var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
var geocoder = require('geocoder');

// INDEX
router.get("/", function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: campgrounds, page: 'campgrounds'});
        }
    });
});

// NEW
router.get("/new", middleware.isLoggedIn, function(req, res) {
       res.render("campgrounds/new"); 
});

// CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
     // get data from form and add to campgrounds array
    var newCampground = req.body.campground;
    newCampground.author = {
      id: req.user._id,
      username: req.user.username
    };
    // Create a new campground and save to db
    geocoder.geocode(req.body.campground.location, function(err, data) {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        newCampground.location = location;
        newCampground.lat = lat;
        newCampground.lng = lng;
        Campground.create(newCampground, function(err, campground) {
            if (err) {
                console.log(err);
            } else {
                console.log(campground);
                res.redirect("/campgrounds");
            }
        });
    });
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res) {
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

// UPDATE Campground Route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    geocoder.geocode(req.body.campground.location, function (err, data) {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        var newData = req.body.campground;
        newData.lat = lat;
        newData.lng = lng;
        newData.location = location;
        Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, updatedCampground){
            if (err) {
                res.redirect("/campgrounds");
             } else {
                res.redirect("/campgrounds/" + req.params.id);
            }
        });
    });
});

// DESTROY Campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;