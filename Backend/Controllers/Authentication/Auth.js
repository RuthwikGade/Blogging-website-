

const bcrypt = require('bcrypt')

const User = require('../../Model/users')

const jwt = require('jsonwebtoken')

require('dotenv').config

const signup = async (req,res)=>{

    const {username,email,password} = req.body;
    
    try {

        if(!username || !email || !password){
            return res.status(400).json({message : " Fill all the details "})
        }
        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });


        if(existingUser){
            return res.status(401).json({message : " The use name need to be unique "})
        }
        
        const passwordHash = await bcrypt.hash(password,10);

        const user = await User.create({
            username,
            email,
            password : passwordHash,
            role : "user"
        })

        res.status(201).json({message : "User is inserter properly",userId : user._id}) ;      

    }
    catch (error){
        console.error("Sign failed",error)
        res.status(500).json({ message: "Internal server error" });
    }

}

const login = async (req,res) => {
    try {
        const {username , password} = req.body;

        user = await User.findOne({username});
        if(!user)
            return res.status(401).json({message : "Invalid User details"});

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(401).json({message : "Invalid User details"})
        }

        const token = jwt.sign(
            {
                userid : user._id
            },
            process.env.JWT_SECRET,
            {expiresIn :"1h"}
        )

        res.cookie("token",token,{
            httpOnly : true,
            secure :process.env.NODE_ENV === "production",
            sameSite:"strict",
            maxAge: 60 * 60 * 1000
        })

        res.status(200).json({message : "Sucessfull login"})


    }
    catch(error){
        console.log("Could not login",error);
        res.status(500).json({message : " User Cannot login"})
    }
}

const logout = (req,res) =>{
    res.status(200).send("logout page");
}

module.exports = {signup , login,logout}