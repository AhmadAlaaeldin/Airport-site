const express  = require('express');

const app = express();

app.use(express.json());

app.use(express.urlencoded());

app.use(express.static('public'));

/// welcome page 
///====================================================================///
app.get("/",(req,res) =>{
    res.sendFile(__dirname+'/public/login.html');
});
/// signup post method 
///====================================================================///
app.post("/Signup",(req,res) =>{
    var name = req.body.username
     ////validate 
    if (/^[A-Za-z]*$/.test(name)==true){
        console.log('true');
        res.redirect(301,'/reservation');
    }else{
        res.end('invalid credtantial');
    }
});
/// Login post method
///====================================================================///
app.post("/Login",(req,res) =>{
    console.log(req.body);
    /// Authenticate with dataset 
    /// redirect to reservation page 
    res.redirect(301, '/reservation');
});
/// reservation page 
///====================================================================///
app.get("/reservation",(req,res) =>{
    res.sendFile(__dirname+'/public/reserve.html');
});
/// flight results page 
///====================================================================///
app.post("/results",(req,res) =>{
    res.send(req.body);
});
/// flight info page 
///====================================================================///
app.get("/FlightInfo",(req,res) =>{
    res.sendFile(__dirname+'/public/info.html');
});
///====================================================================///
/// listening port  
///====================================================================///
app.listen(8000, () =>{
    console.log('App');
});