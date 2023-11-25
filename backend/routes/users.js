const router = require("express").Router();
const {userController,getProfile,updateProfile} = require("../controllers/usercontroller");
router.post("/register",userController );
router.get("/profile/:userId", getProfile);
router.put("/profile/:userId", updateProfile);
module.exports = router;

