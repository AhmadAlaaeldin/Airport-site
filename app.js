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

const {collection1, collection2} = require("./mongodb")


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

    await collection1.insertMany([data])

    res.redirect(301, '/Booking');
});
////===================================================================///
/// Login post method 
/// validate input fields 
/// check data between user and database 
/// redirect to reservation  
///====================================================================///
app.post("/Login", async (req, res) => {

    try {
        const user = await collection.findOne({ email: req.body.email })

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

   const data = {
        origin: req.body.airport-from,
        destination: req.body.airport-to,
        dept: req.body.dept-date,
        return: req.body.return-date,
        airline: airlines[Math.floor(Math.random() * airlines.length)],
        price: Math.floor(Math.random() * 10) + 1
    }
    /// render test elemnts 
    res.render("results", {
        airlinev: 'home',
        originv: "to",
        destinationv: "usa",
        pricev: 112
    })

});
/// flight info page 
///====================================================================///
app.get("/FlightInfo", (req, res) => {
    res.render("info")
});

/// user book 
///====================================================================///
app.post("/booked", async (req, res) => {
    await collection2.insertMany([data]) 
});
//=========================================///////////////////
app.get("/Profile", (req, res) => {

});
/// listening port  
///====================================================================///
app.listen(100, () => {
    console.log('App');
});