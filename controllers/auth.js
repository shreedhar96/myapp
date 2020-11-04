const User = require("../models/user")
const { check, validationResult } = require('express-validator');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
// const getUserById = require("../controllers/user")
var nodemailer = require('nodemailer');
var sendgridTransport = require('nodemailer-sendgrid-transport');


const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        API_KEY: "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"
    }
}))


exports.sinup = (req , res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
       return res.status(421).json({
            error : errors.array()[0].msg
        })
    }

    const user = new User(req.body);
    user.save((err , user) => {
        if(err){
            return res.status(400).json({
                err: "cant save in the DB"
            })
        }
       
        res.json({
            name: user.name,
            email: user.email,
            password:user.password,
            
        })
    })
    

}



    
            
    




exports.sinin = (req , res) => {
    const errors = validationResult(req);
const {email , password} = req.body;


    if(!errors.isEmpty()){
        return res.status(421).json({
             error : errors.array()[0].msg
         })
     }

     User.findOne({email}, (error , user)=> {
         if(error || !user){
             res.status(400).json({
                 error: "email not found"
             })
         }
         if(!user.authenticate(password)){
             return res.status(401).json({
                 error: "password doesnot match"
             })
         }

         const Token = jwt.sign({_id: user._id} , process.env.SECRET)

         res.cookie("Token" , Token , {expire: new Date + 9999});

         const {_id , name , email, role} = user;
          return res.json({ Token, user: { _id, name, email, role } });



     })

     
}

exports.sinout = (req , res) => {
    res.clearCookie();
    res.json({
        msg: "sinout sucessfull"
    })
   
    

}

exports.isSignedIn = expressJwt({ secret: process.env.SECRET, userProperty: 'auth' });

exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    
    
    if (!checker) {
        
      return res.status(403).json({
        error: "ACCESS DENIED"
      });

    }
    next();
  };

exports.isAdmin = (req,res,next) => {
    if(req.profile.role === 0){
        res.status(403).json({
            error: "you are not a admin"
        })
    }
     next();
}