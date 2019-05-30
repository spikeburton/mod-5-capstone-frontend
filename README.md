# Scenic Drive
This app was built with React and Semantic UI on top of a Ruby on Rails back end. Go [here](https://github.com/spikeburton/mod-5-capstone-backend) to view the repository for the Rails back end.

The user is able to view a list of scenic drives, get turn by turn navigation for each of these routes, view photos of the drive added by other users, and upload photos of the drive to add to the photo gallery. Additionally, the user is able to add a custom drive to the database by clicking on a map to specify start and end points.

The scenic byways in the database are compiled from [scenicbyways.info](https://scenicbyways.info/). I built a utility in Ruby to scrape the data from this site and build a custom API which the app is using. The repository for this API can be found [here](https://github.com/spikeburton/scenic-byway-api).

The project makes use of the Mapbox-GL JavaScript SDK, Mapbox Directions API, Mapbox Geocoding API, and AWS S3 for file uploads/storage.
# Demo
A short 3 minute video demonstration of me walking through the features of the app can be found [here](https://youtu.be/l90ZMv686H4).
# Test Drive
Go [here](https://spikeburton.github.io/mod-5-capstone-frontend/) to try the app out for yourself!
