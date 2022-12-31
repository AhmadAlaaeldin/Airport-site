const express  = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));

const {db} = require('./firebase.js');

/// welcome page 
///====================================================================///
app.get("/",(req,res) =>{
    res.sendFile(__dirname+'/public/test.html');
});
/// signup post method 
///====================================================================///
app.post("/Signup",async (req,res) =>{
    var name = req.body.username
     ////validate 
    if (/^[A-Za-z]*$/.test(name)==true){
        console.log('signed');
        console.log(req)
        const id = req.body.email;
        userJson = {
            email : req.body.email,
            pass : req.body.password,
            name : req.body.username,
            phone : req.body.number,
            country : req.body.country
        }
        const data = await db.collection("users").doc(id).set(userJson);
        res.status(200).send(data);
        ///res.redirect(301,'/reservation');
    }else{
        res.send(`<p>
            invalid
        <p>`);
    }
});
/// Login post method
///====================================================================///
app.post("/Login",(req,res) =>{
    if (req.body.email ==)
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