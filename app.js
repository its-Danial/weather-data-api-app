const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios").default;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  var cityName = req.body.cityName;
  const apiKey = "YOUR API KEY"; // I cannot share my api key otherwise my account will be terminated
  var unitType = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unitType}`;

  axios
    .get(url)
    .then(function (response) {
      // console.log(response.data);
      const weatherdata = response.data;
      const temp = weatherdata.main.temp;
      const weatherDescription = weatherdata.weather[0].description;
      const icon = weatherdata.weather[0].icon;
      const imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      res.write(
        "<style>body{text-align: center;background-color:cornflowerblue;}</style>"
      );
      res.write("<h1>" + cityName + " Weather</h1>");
      res.write(
        "<h3>The weather condition is: " + weatherDescription + "</h3>"
      );
      res.write("<h3>The temperature is : " + temp + " degrees Celsius. </h3>");
      res.write("<img src='" + imageUrl + "'>");
      res.send();
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(3000, function () {
  {
    console.log("Listening on port 3000");
  }
});
