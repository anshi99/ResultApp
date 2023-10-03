// var connection=require('../models/checkdb').con;

var mysql = require('mysql2');


  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "result_management"
});

con.connect(function(err){
    if (err) throw err
});

function deleteStudentById(rollnumber,Callback){
  return con.query("delete from student where rollnumber=?",[rollnumber],function(err,result){
    if(err) throw err;
    Callback(result);
  })

}

function findStudentByRollnumber(rollnumber,Callback){
  return con.query("select * from student where rollnumber=?",[rollnumber],function(err,result){
    if(err) throw err;
    Callback(result);
  })
}

function updateStudentById(rollnumber,fullname,dob,score,Callback){
  return con.query("update student set fullname=?,score=?,dob=? where rollnumber=?",[fullname,score,dob,rollnumber],function(err,result){
    if(err) throw err;
    Callback(result)
  })
}

function  getAllStudentData(Callback){
    return con.query("select * from student",function(err,result){
      if(err) throw err;
      Callback(result);
    })
    
}

function checkStudentAndGetData(fullname,rollnumber,dob,Callback){
    return  con.query("SELECT * FROM student where fullname = ? and rollnumber = ? and dob = ?",[fullname,rollnumber,dob] ,function (err, result) {
        if (err) throw err;
        Callback(result);
      });
}

function checkTeacherAndLogin(email,password,Callback){
  return  con.query("SELECT * FROM teacher where email = ? and password = ?",[email,password] ,function (err, result) {
    if (err) throw err;
    Callback(result);
  });
}

function addStudent(rollnumber,fullname,dob,score,Callback){
  return con.query("insert into student values (?,?,?,?)",[rollnumber,fullname,score,dob],function(err,result){
    if(err){
      Callback("ALREADY THIS ROLL NUMBER STUDENT EXIST")
    } 
    Callback(result)
  })
}

module.exports={
    getAllStudentData,
    checkStudentAndGetData,
    checkTeacherAndLogin,
    getAllStudentData,
    deleteStudentById,
    findStudentByRollnumber,
    addStudent,
    updateStudentById
}