var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment");
    
var data = [
    {
      name: "Cloud's Rest", 
      image: "http://photosforclass.com/download/5641024448",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at neque malesuada, vulputate erat quis, hendrerit lorem. Etiam tellus diam, rhoncus nec nisl vel, auctor ultrices mi. Fusce lacus leo, porta quis lectus eu, auctor sodales sem. Fusce eget bibendum tellus, a consequat nulla. Cras non nisi augue. Quisque erat neque, mattis nec condimentum id, vulputate sed urna. Nullam vestibulum quam eu velit eleifend, sed bibendum nibh iaculis. Maecenas auctor elementum sagittis. Duis ullamcorper facilisis tellus quis elementum. Etiam condimentum hendrerit nisl at bibendum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer venenatis erat ante, facilisis egestas nunc imperdiet quis. Pellentesque ullamcorper lorem sed eros rutrum feugiat. Vestibulum auctor orci leo, sed cursus urna congue sit amet. Vivamus finibus eros et ex bibendum condimentum. Donec dictum gravida leo at posuere. In at rutrum nibh, a faucibus felis. Sed a elit metus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce malesuada pretium augue a vestibulum. Suspendisse vitae neque ut erat fermentum tempus id sed velit. Fusce finibus, justo non pharetra fermentum, dolor turpis mattis leo, non semper leo nibh non arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
      name: "Desert Mesa", 
      image: "https://farm3.staticflickr.com/2353/2069978635_2eb8b33cd4.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at neque malesuada, vulputate erat quis, hendrerit lorem. Etiam tellus diam, rhoncus nec nisl vel, auctor ultrices mi. Fusce lacus leo, porta quis lectus eu, auctor sodales sem. Fusce eget bibendum tellus, a consequat nulla. Cras non nisi augue. Quisque erat neque, mattis nec condimentum id, vulputate sed urna. Nullam vestibulum quam eu velit eleifend, sed bibendum nibh iaculis. Maecenas auctor elementum sagittis. Duis ullamcorper facilisis tellus quis elementum. Etiam condimentum hendrerit nisl at bibendum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer venenatis erat ante, facilisis egestas nunc imperdiet quis. Pellentesque ullamcorper lorem sed eros rutrum feugiat. Vestibulum auctor orci leo, sed cursus urna congue sit amet. Vivamus finibus eros et ex bibendum condimentum. Donec dictum gravida leo at posuere. In at rutrum nibh, a faucibus felis. Sed a elit metus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce malesuada pretium augue a vestibulum. Suspendisse vitae neque ut erat fermentum tempus id sed velit. Fusce finibus, justo non pharetra fermentum, dolor turpis mattis leo, non semper leo nibh non arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
      name: "Canyon Floor", 
      image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at neque malesuada, vulputate erat quis, hendrerit lorem. Etiam tellus diam, rhoncus nec nisl vel, auctor ultrices mi. Fusce lacus leo, porta quis lectus eu, auctor sodales sem. Fusce eget bibendum tellus, a consequat nulla. Cras non nisi augue. Quisque erat neque, mattis nec condimentum id, vulputate sed urna. Nullam vestibulum quam eu velit eleifend, sed bibendum nibh iaculis. Maecenas auctor elementum sagittis. Duis ullamcorper facilisis tellus quis elementum. Etiam condimentum hendrerit nisl at bibendum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer venenatis erat ante, facilisis egestas nunc imperdiet quis. Pellentesque ullamcorper lorem sed eros rutrum feugiat. Vestibulum auctor orci leo, sed cursus urna congue sit amet. Vivamus finibus eros et ex bibendum condimentum. Donec dictum gravida leo at posuere. In at rutrum nibh, a faucibus felis. Sed a elit metus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce malesuada pretium augue a vestibulum. Suspendisse vitae neque ut erat fermentum tempus id sed velit. Fusce finibus, justo non pharetra fermentum, dolor turpis mattis leo, non semper leo nibh non arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }
  ];
    
function seedDB() {
  // remove all campgrounds
  Campground.remove({}, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("removed Campgrounds");
    }
    data.forEach(function(datum) {
      Campground.create(datum, function(err, datum) {
        if (err) {
          console.log(err);
        } else {
          console.log("added a campground");
          Comment.create({
            text: "This place is great, but I wish there was internet.", 
            author: "Homer"
          }, function(err, comment) {
            if (err) {
              console.log(err);
            } else {
              datum.comments.push(comment);
              datum.save()
              console.log("Created new comment");
            }
          });
        }
      });
    });
  });
  // add a few campgrounds
  
}

module.exports = seedDB;