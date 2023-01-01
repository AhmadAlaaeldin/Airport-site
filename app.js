const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const path = require('path');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

///const { db } = require('./firebase.js');

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "pug");

const { collection1, collection2 } = require("./mongodb")


/// welcome page 
///====================================================================///
app.get("/", (req, res) => {
    res.render('login');
});

//=====================================================================///
/// signup post method
/// validate input fields 
/// save data to database 
/// redirect to reservation  
///====================================================================///
app.post("/Signup", async (req, res) => {

    const data = {
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        country: req.body.country,
        number: req.body.number
    }

    /// await collection1.insertMany([data])

    res.redirect(301, '/Booking');
    ///res.render('Booking');
});
////===================================================================///
/// Login post method 
/// validate input fields 
/// check data between user and database 
/// redirect to reservation  
///====================================================================///
app.post("/Login", async (req, res) => {

    try {
        const user = await collection1.findOne({ email: req.body.email })
        if (user.password === req.body.password) {
            res.redirect(301, "Booking");
        }

    }
    catch { }

});
/// reservation page 
/// user search for flight tickets 
///====================================================================///
app.get("/Booking", (req, res) => {
    res.render("Booking");
});
/// flight results page 
///====================================================================///
app.post("/results", (req, res) => {
    const airlines = ['Qatar Airways', 'Fly Emirates',
        'Egyptair', 'Saudi Airways', 'Turkish Airlines'];
    var data = []
    console.log(req.body.from)
    for (let i = 0; i < 10; i++){
        var air = airlines[Math.floor(Math.random()*airlines.length)];
        var pp =  Math.floor(Math.random() * 5000) + 1000;
        data.push({
            //d : 1,
            airline : air,
            origin: req.body.from,
            destination: req.body.to, 
            Debarture_Date: req.body.date,
            return_Date: req.body.date,
            price: pp
            //Gate : 'c7'
        })
    }
    res.render("results", {
        resultes: data
    });
    
});
/// flight info page 
///====================================================================///
app.get("/FlightInfo", (req, res) => {
    res.render("info");
});

/// user book 
///====================================================================///
app.post("/booked", async (req, res) => {
    await collection2.insertMany([data]) 
    res.render("info")
    console.log(req.body);
});
//=========================================///////////////////
app.get("/Profile", (req, res) => {
    res.render('user');
});
/// listening port  
///====================================================================///
app.listen(100, () => {
    console.log('App');
});