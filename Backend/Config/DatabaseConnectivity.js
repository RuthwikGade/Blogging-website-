
const mongoose = require('mongoose')

require('dotenv').config()
const DbString  = process.env.DbString

const DbConnection = async () => {
    try {
        await mongoose.connect(DbString)
    }
    catch(error){
        console.error('DB connection failed ',error)
    }
}

module.exports = DbConnection ;