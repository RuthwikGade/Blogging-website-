
const express = require('express');
const router = express.Router();

const {signup,login,logout} = require('../Controllers/Authentication/Auth.js');

router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout)


module.exports = router;