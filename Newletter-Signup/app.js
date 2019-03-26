//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    var firstName = req.body.firstName; 
    var lastName = req.body.lastName; 
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields : {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us20.api.mailchimp.com/3.0/lists/156d6f5c66",
        method: "POST",
        headers: {
            "Authorization": "marta 9c037b8ce3d19176999a1508e8ce9f4d-us20"
        },
        // body: jsonData
    }

    request(options, function(error, response, body){
        if (error) {
            res.sendFile(__dirname + "/failure.html");
        } else {
            if(response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }
        }
    });
    
});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(3000, function(req, res){
    console.log("Server is running on port 3000");
});


// 9c037b8ce3d19176999a1508e8ce9f4d-us20

// 156d6f5c66