const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const path = require('path');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

const { db } = require('./firebase.js');

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "pug");

/// welcome page 
///====================================================================///
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});
/// signup post method 
///====================================================================///
app.post("/Signup", async (req, res) => {
    const id = req.body.email;
    userJson = {
        email: req.body.email,
        pass: req.body.password,
        name: req.body.username,
        age: req.body.age,
        phone: req.body.number,
        country: req.body.country
    }
    const data = await db.collection("users").doc(id).set(userJson);
    //console.log(userJson);
    res.status(200).send(data);
    ///res.redirect(301, '/reservation');
});
/// Login post method
///====================================================================///
app.post("/Login", (req, res) => {
    ///if (req.body.email ==)
    /// Authenticate with dataset 
    /// redirect to reservation page 
    res.redirect(301, '/reservation');
});
/// reservation page 
///====================================================================///
app.get("/reservation", (req, res) => {
    res.sendFile(__dirname + '/public/reserve.html');
});
/// flight results page 
///====================================================================///
app.post("/results", (req, res) => {
    const airlines = ['Qatar Airways', 'Fly Emirates',
        'Egyptair', 'Saudi Airways', 'Turkish Airlines'];
    
    res.render("index", { from: '123', to: req.body.airport-to ,airline:"air" ,price:12 });
});
/// flight info page 
///====================================================================///
app.get("/FlightInfo", (req, res) => {
    res.sendFile(__dirname + '/public/info.html');
});
///====================================================================///
app.post("/book", async (req, res) => {
    userJson = {
        from: req.body.email,
        to: req.body.password,
        deptdate: req.body.dept-date,
        returndate : req.body.return-date
    }
    const data = await db.collection("Flights").doc(id).set(userJson);
    //console.log(userJson);
    res.status(200).send(data);
});
//=========================================///////////////////
app.get("/Profile", (req, res) => {
    res.sendFile(__dirname + '/public/user.html');
});
/// listening port  
///====================================================================///
app.listen(100, () => {
    console.log('App');
});