var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground = require("./models/campground"),
    User = require("./models/user"),
    seedDB = require("./seeds"),
    Comment = require("./models/comment"),
    methodOverride = require("method-override"),
    flash = require("connect-flash");




var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");


//app config
mongoose.connect("mongodb://localhost/Yelp_camp");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.use(flash());


// seedDB();//seed db

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Once again Rusty win cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



var campgrounds = [
    { name: "solman creek", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3O2mG-7SewuA00mqWDw_UfSHJudwIXGVS3bnm7PAdr8wc-EHkSA" },
    { name: "Granate hill", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTLC4aB2iyTyw8lIIOcwL7_rCXcjMrSiuOmCTGW-E9Fqtp0Ia9" },
    { name: "Susy markande", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTogbn98d27Q6t6O8iWYvNL7otw2zMCIW5c_uC6OXB-iaOihZLYMg" }
]


// Campground.create({
//     name: "solnna",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3O2mG-7SewuA00mqWDw_UfSHJudwIXGVS3bnm7PAdr8wc-EHkSA",
//     description: "this is s huge hill camping"
// }, function(err, campground) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("newly created");
//         console.log(campground);
//     }
// });

//requiring routes
app.use(commentRoutes);
app.use(campgroundRoutes);
app.use(indexRoutes);

app.listen(3000, function() {
    console.log("yelpcamp has started ");
});