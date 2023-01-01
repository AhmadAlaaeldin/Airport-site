const mongoose  = require("mongoose")
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/FlightBooking")
.then(()=>{
    console.log("mongo db connected");
})
.catch(()=>{
    console.log("failed to connect");
})

const UserSchema  = new mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    country:{
        type:String,
        required: true
    },
    number:{
        type:String,
        required: true
    }
})



const TicketSchema  = new mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    Origin:{
        type:String,
        required : true
    },
    Dest:{
        type:String,
        required : true
    },
    debt:{
        type:String,
        required : true
    },
    return:{
        type:String,
        required : true
    },
    ticketid:{
        type:Int16Array,
        required : true
    },
    price:{
        type:Int16Array,
        required : true
    }
})


const  collection1 = new mongoose.model("Collection1",UserSchema)
const  collection2 = new mongoose.model("Collection2",TicketSchema)

module.exports = {collection1, collection2}
