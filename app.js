const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const path = require('path');

app.use(cookieParser());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

///const { db } = require('./firebase.js');

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "pug");

const { collection1, collection2 } = require("./mongodb")

/// authentication using cookies 
/////////========================================================///////
function authCookie(req, res, next) {
    const { cookies } = req;
    if ('session_id' in cookies) {
        console.log('session Id exists');
        if (cookies.session_id === '#12345') next();
        else res.status(403).send(`
        <p> Not Authenticated </p>
        `);
    } else res.status(403).send(`
    <p> Not Authenucated </p>
    `);
}
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
/// cookie added
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
    res.cookie('session_id', '#123456', {
        expire: 100000 + Date.now()
    });
    res.redirect(301, '/Booking');
    ///res.render('Booking');
});
////===================================================================///
/// Login post method 
/// validate input fields 
/// check data between user and database 
/// redirect to reservation  
///====================================================================///
app.post("/Login", authCookie, async (req, res) => {

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
app.get("/Booking",authCookie, (req, res) => {
    res.render("Booking");
});
/// flight results page 
///====================================================================///
app.post("/results",authCookie, (req, res) => {
    const airlines = ['Qatar Airways', 'Fly Emirates',
        'Egyptair', 'Saudi Airways', 'Turkish Airlines'];
    var data = []
    console.log(req.body.from)
    for (let i = 0; i < 10; i++) {
        var air = airlines[Math.floor(Math.random() * airlines.length)];
        var pp = Math.floor(Math.random() * 5000) + 1000;
        data.push({
            //d : 1,
            airline: air,
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
app.get("/FlightInfo",authCookie, (req, res) => {
    res.render("info");
});

/// user book 
///====================================================================///
app.post("/booked",authCookie, async (req, res) => {
    await collection2.insertMany([data])
    res.render("info")
    console.log(req.body);
});
//=========================================///////////////////
app.get("/Profile", (req, res) => {
    res.render('user');
});
app.get("/*", (req, res) => {
    res.send(`
    <p> Page Not Found </p>
    `);
});
//////////////////////////////////////////////////////

/// listening port  
///====================================================================///
app.listen(100, () => {
    console.log('App');
});