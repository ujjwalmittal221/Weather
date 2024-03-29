require('dotenv').config(); 
const express = require("express");
const https = require('node:https');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
    
});

app.post("/",function(req,res){

    const query = req.body.cityName;
    const apiKey = "bd48d85a4ae29d054961152f5dff7b31";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url,function(response){

        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.setHeader("Content-Type", "text/html");
            res.write("<p>The weather is currently " + weatherDescription + ".</p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees celsius.</h1>");
            res.write("<img src =" + imageURL +">");
            res.send();
        });
    });
});




app.listen(process.env.PORT || 3000, function(req,res){
    console.log("Server is running on port 3000.");
});