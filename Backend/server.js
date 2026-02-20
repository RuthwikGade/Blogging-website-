
const express = require('express')

const app = express()
const port = 3000;

const DBconnection = require('./Config/DatabaseConnectivity.js');
const AuthRot = require("./Routers/AuthRot.js");
const BlogRot = require('./Routers/BlogRot.js');

app.use(express.json())

app.use("/app/auth",AuthRot);
app.use("/app/blogs",BlogRot);


const start = async () => {

    try {
        await DBconnection();

        app.listen(port ,()=> {
            console.log(`app is running on the port ${port}`);
        })
    }

    catch (error){
        console.error("DB cannot be cooected or The server",error);
        process.exit(1);
    }

}

start();

