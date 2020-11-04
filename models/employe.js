const mongoose = require("mongoose")

const employeSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        maxlength: 32,
        required: true,
        unique:true,
        trim: true
    },
    age: {
        type:Number,
        maxlength: 2,
        required: true,
        
    },
    email: {
        type: String,
        maxlength: 32,
        required: true,
        unique:true,
        trim: true
    },
    phone: {
        type: Number,
        maxlength: 12,
        required: true,
        unique:true,
        
    },
    gender: {
        type: String,
        maxlength: 9,
        required: true,
       
    }
} , {timestamps : true})

module.exports = mongoose.model("Employe" , employeSchema)