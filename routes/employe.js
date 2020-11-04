const express = require("express")
const router = express.Router()

const {isSignedIn ,isAdmin , isAuthenticated} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

const { getEmployeById, createEmploye, getEmploye, getAllEmploye } = require("../controllers/employe")


router.param("userId" , getUserById);
router.param("employeId" , getEmployeById)


router.post("/employe/create" , createEmploye)
router.get("/employe/:employeId" , getEmploye)
router.get("/employes" , getAllEmploye)
















module.exports = router ;