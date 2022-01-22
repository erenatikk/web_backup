
const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema
const projeSchema = new Schema( {
    email: { type:String , required: true },
    password: { type: String, required: true },
    
    
})
/*const amountScehma = new Schema ({
    
    name: { type:String , required: true },
    amount: { type: Number, required: true },
})*/
const User = mongoose.model("user",projeSchema);
module.exports = User;

