
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username : {
            type : String,
            require : true,
            trim : true,
            unique : true
        },

        email : {
            type : String,
            require :true,
            trim : true,
            unique : true
        },

        password : {
            type : String,
            require : true,
            trim : true
        },
        role : {
            type : String,
            enum : ["user","admin"],
            require : true
        }
    },
    {
        timestamps :true
    }
)

module.exports = mongoose.model("Users",userSchema);