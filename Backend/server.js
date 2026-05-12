require('dotenv').config()
const { CONFLICT } = require('http-status-codes')
const app = require('./src/app')
const connectDB = require('./src/config/db')





connectDB();



app.listen(3000,()=>{
    console.log("Server is running on PORT 3000")
})

