
const express = require('express')

const {allblogs,createblog,editblog,deleteblog} = require('../Controllers/Blogs/blog.js')

const router = express.Router();

router.get("/allblogs",allblogs)


router.post("/createblog",createblog)


router.patch("/editblog",editblog)


router.delete("/deleteblog",deleteblog)

module.exports = router;