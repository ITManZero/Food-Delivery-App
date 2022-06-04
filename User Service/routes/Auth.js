const router = require("express").Router();
const { customerRegister, customerLogin } = require("../controller");

router.post("/register", customerRegister);

router.post("/login", customerLogin);

module.exports.Auth = router;
