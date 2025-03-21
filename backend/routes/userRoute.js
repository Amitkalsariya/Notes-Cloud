const express = require("express")
const { newUser, loginUser, updateUserProfile } = require("../controllers/userControllers")
const { Secure } = require("../middlewares/authMiddleware")
const router=express.Router()
router.route('/').post(newUser)
router.route('/login').post(loginUser)
router.route('/profile').post(Secure,updateUserProfile)

module.exports=router