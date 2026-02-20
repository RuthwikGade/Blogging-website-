
const jwt = require('jsonwebtoken');
require('dotenv').config()
const AuthMidd = (req,res,next) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message : "Unauthorize token not found"});
    }
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decode;
        next();
    }
    catch (error){
        console.error("Token Invalid ",error);
        return res.status(401).json({message : "Token Invalid"})
    }

}

module.exports = AuthMidd