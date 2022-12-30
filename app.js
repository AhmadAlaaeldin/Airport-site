const express  = require('express');

const app = express();

app.use(express.json());

app.use(express.urlencoded());

app.use(express.static('public'));

app.get("/login",(req,res) =>{
    res.sendFile(__dirname+'/public/login.html');
});

app.get("/reservation",(req,res) =>{
    res.sendFile(__dirname+'/public/reserve.html');
});

app.get("/results",(req,res) =>{
    res.sendFile(__dirname+'/public/results.html');
});

app.get("/FlightInfo",(req,res) =>{
    res.sendFile(__dirname+'/public/info.html');
});

app.listen(8000, () =>{
    console.log('App');
});