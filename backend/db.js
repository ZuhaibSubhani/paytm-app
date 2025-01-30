const mongoose =require("mongoose");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,      
    },
    password:String,
    firstName:String,
    lastName:String
})

const accountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true    
    },
    balance:{
        type:Number,
        required:true
    }
})


const User=mongoose.model("User",userSchema);
const Account=mongoose.model("Account",accountSchema)
module.exports={User, Account};