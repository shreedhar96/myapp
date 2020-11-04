const express = require('express')
const router = express.Router()
const {sinup ,sinin , sinout , isSignedIn} = require("../controllers/auth")
const { check, validationResult } = require('express-validator');

// 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


router.post("/sinup" ,[
    check("name" , "name should be atleast 5 char").isLength({ min: 5 }),
    check("email" , "proper email shud be passed").isEmail(),
    check("password" , "name should be atleast 5 char").isLength({ min: 5 }),

], sinup)

router.post("/sinin" ,[
    check("email" , "email field is requireds").isEmail(),
    check("password" , "password is required").isLength({ min: 5 }),

], sinin)

router.get("/sinout" , sinout)

router.get("/testroute", isSignedIn , (req , res)=>{
   res.send("proected roue")
})

module.exports = router;