
//title,content,ower_id

const mongoose = require('mongoose')

const blogsSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            required : true,
            trim : true
        },
        content : {
            type : String,
            required : true
        },
        ownerid : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true,
        }

    },
    {
        timestamps : true
    }
)

module.exports = mongoose.model("blog",blogsSchema);

