var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");



var data = [{
        name: "violet floor",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUMkE9sKWJq-WyzQ1YQTeEH18LpSYG1RK8YMrPKRBMMjrjAbyjw",
        descripton: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "canyon floor",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTm7Zk3_2pKzN7emYqzvAaQI2JjR4t5C9zFLg3hDX2-AqPBHQiyw",
        descripton: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "reddish floor",
        image: "http://www.thehansindia.com/assets/poorna_6621.jpg",
        descripton: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
]



function seedDB() {

    //remove all campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("removed campgrounds");

            //add a few campgrounds
            data.forEach(function(seed) {
                Campground.create(seed, function(err, campground) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("added a campground");

                        //create a comment
                        Comment.create({
                            text: "this is great,but not so ",
                            author: "homer"
                        }, function(err, comment) {
                            if (err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created a new comment");
                            }
                        });
                    }
                });
            });
        }
    });



}


module.exports = seedDB;