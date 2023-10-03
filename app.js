const express=require("express");

var cookieParser = require('cookie-parser');
var session = require('express-session');

const bodyParser = require("body-parser");
const app=express();
const port=4307;

//server
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));


app.listen(port,function(){
    console.log("listining of port 4307")
})

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.get("/",function(req,res){
    res.render('home')
})

const teacherRoutes=require("./routes/teacherRoute");
const studentsRoutes=require("./routes/studentRoute");
app.use('/teacher',teacherRoutes);
app.use('/student',studentsRoutes);


app.use(bodyParser.urlencoded({ extended: true })); 


app.use(bodyParser.json());
