//jshint esversion:6


const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req, res){
    res.sendfile(__dirname + "/index.html");
});

app.get('/bmicalculator', function(req, res){
    res.sendFile(__dirname + "/bmicalculator.html");
    
});

app.post("/bmicalculator", function(req, res){

    var weight = parseFloat(req.body.weight);
    var height = parseFloat(req.body.height)/100;

    var bmiResult = Math.round(weight/Math.pow(height,2)*100)/100;

    console.log(bmiResult);

    res.send(`<h2>Your BMI is equal to ${bmiResult}</h2>`)
});


app.post("/", function(req, res){

    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);

    var result = num1 + num2;
    res.send(`The result of the calculation is ${result}.`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))