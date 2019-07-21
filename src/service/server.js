const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

var restaurants = []
var lat = 25.0340773;
var lng = 121.5463641;
var type = "";
var start = 800;
var end = 1700;

for (var i = 0; i < 50; i++) {
  lng += 0.004000;
  lat += 0.000040;
  if (i % 5 === 0) {
    lat -= 0.001;
    lng = 121.5463641;
  }
  if (i >= 0 && i < 20) {
    type = 'Vegetarian';
    start = 1000;
    end = 1700;
  } else if (i >= 20 && i < 30) {
    type = 'Pasta/Noodles';
    start = 1100;
    end = 2100;
  } else if (i >= 30 && i < 40) {
    type = 'Pizza & Burgers';
    start = 1700;
    end = 800;
  } else {
    type = 'Rice Bowls';
    start = 2100;
    end = 800;
  }
  restaurants.push({
    id: i,
    lat: lat.toPrecision(9),
    lng: lng.toPrecision(9),
    restaurantInfo: {
      name: `Restaurant ${i}`,
      description: `My Restaurant ${i}'s Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat optio architecto aperiam laborum sed dolorum, vel deleniti magni, ullam nemo odit labore delectus id rerum molestias deserunt ex dolorem. Distinctio!`,
      place: `Place ${i}`,
      rating: Math.floor(Math.random() * 10) + 1,
      menu: `Menu ${i}`,
      time: {
        start: start,
        end: end
      }
    },
    type,
    logo: `https://fakeimg.pl/32x32/?retina=1&text=${i}&font=noto&font_size=20`,
    img: `https://picsum.photos/853/480?random=${i}`
  });
}

app.get('/api/restaurants',cors(), (req, res) => {
  res.send(restaurants);
});

app.get('/api/favourites',cors(), (req, res) => {
  var fav = restaurants.slice(9, 13).map(({ id, restaurantInfo, name }) => {
      return {
        id,
        restaurantInfo,
        PersonalNotes: `Personal Note for ${name}`
      }
    });
  res.send(fav);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
