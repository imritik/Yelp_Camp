var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index.js");

router.get("/campgrounds", function(req, res) {

    //get all campgrounds form db
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);

        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    });


});


router.post("/campgrounds", middleware.isLoggedIn, function(req, res) {

    //get data from form
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = { name: name, price: price, image: image, description: desc, author: author }
        //create a new campground and save it to db
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.render("/campgrounds");
        }
    });
    //redirect back to campgrounds page

});




router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");

});




router.get("/campgrounds/:id", function(req, res) {
    //find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            Console.log(err);
        } else {

            res.render("campgrounds/show", { campground: foundCampground });
        }
    });

    //render show template

});


//edit campground
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    //is user logged in?

    Campground.findById(req.params.id, function(err, foundCampground) {
        res.render("campgrounds/edit", { campground: foundCampground });


    });
});

//update campground route

router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res) {
    //find and update the correct campground

    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


//DELETE CAMPGROUND

router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});






module.exports = router;