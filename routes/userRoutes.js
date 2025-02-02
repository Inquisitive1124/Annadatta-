const express = require("express");
const router = express.Router();

const {signup,login} = require("../controllers/authController.js");
const {auth} = require("../middlewares/authMiddleware.js")
const{getUserPosts} = require("../controllers/getUserPosts.js")
const{getAllPosts} = require("../controllers/getAllPosts.js");
const{localFileUpload} = require("../controllers/fileUpload.js");
const{imageUpload} = require("../controllers/fileUpload.js");

router.post("/signup",signup);
router.post("/login",login);
router.get("/getUserPosts",auth,getUserPosts);
router.get("/getAllPosts",getAllPosts);
// router.post("/localFileUpload",localFileUpload );
router.post("/imageUpload",imageUpload );

module.exports = router;
