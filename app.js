require('dotenv').config()
const mongoose = require("mongoose")
const express = require("express")
const app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var cors = require('cors')
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const Path = require("path")





const employeRoute = require("./routes/employe")






mongoose.connect(process.env.DATABASE, {useNewUrlParser: true,
useCreateIndex: true, useUnifiedTopology:true}).then(()=>{
    console.log("DB CONNECTED")
});



app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

app.use("/api" , authRoute)
app.use("/api" , userRoute)

app.use("/api" , employeRoute)




if(process.env.NODE_ENV === 'production'){
    app.use(express.static("client/build"))
    app.use('*' , (req,res) => {
        res.sendFile(path.resolve(__dirname , 'client' , 'build' , 'index.html'));
    })
}





const port = process.env.PORT || 8000;

app.listen(port , ()=> {
    console.log(`server is running at port ${port}`)
})