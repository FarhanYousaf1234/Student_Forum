const router = require("express").Router();
const { Authcontroller } = require("../controllers/authController");
router.post("/login",Authcontroller );
module.exports = router;
