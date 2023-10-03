var studentDao=require('../models/opretionsDao');

const student_login_get = (req, res) => {
    res.render("findResult");
};

const student_login_post =(req, res) => {
    console.log("mai submit hua")
    fullname=req.body.fullname;
    rollnumber=req.body.rollnumber;
    dob=req.body.dob;
    var result=[]
    studentDao.checkStudentAndGetData(fullname,rollnumber,dob,function(studentData){
        result=studentData;
        if(result.length==0){
            res.render("findResult",{error:"DATA NOT FOUND"})
        }else{
            console.log(result[0])
            res.render("showResult",{studentData:result[0]})
        }
    })
    
    
     
    
};


module.exports={
    student_login_get,
    student_login_post
};