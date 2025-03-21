const express =  require("express")
const { getNotes ,createNote ,getNoteById ,updateNote,deleteNote} = require("../controllers/noteControllers")
const { Secure } = require("../middlewares/authMiddleware")
const router=express.Router()
router.route("/").get(Secure,getNotes)
router.route("/create").post(Secure,createNote)
router.route("/:id").get(getNoteById).put(Secure,updateNote).delete(Secure,deleteNote)

module.exports = router