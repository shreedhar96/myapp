
const Employe = require("../models/employe");


exports.getEmployeById = (req , res , next , id) => {

    Employe.findById(id).exec((err , employe) => {
        if(err){
            return res.status(400).json({
                err : "employe not found in db"
            })
        }
        req.employe = employe;
        
        
        next();
    })

    
}

exports.createEmploye = (req , res) => {
    const employe = new Employe(req.body);
    employe.save((err , employe) => {
        if(err){
            return res.status(400).json({
                err : "cannot save employe"
            })
        }
        res.json(employe)
        console.log(employe)
    })
}

exports.getEmploye = (req , res) => {
    return res.json(req.employe)
}

exports.getAllEmploye = ( req , res) => {
    Employe.find().exec((err , employes) => {
        if(err){
            return res.status(400).json({
                err : "no employes found"
            })
        }
        res.json(employes)
    })
}

