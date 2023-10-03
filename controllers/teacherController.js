const teacherDao=require("../models/opretionsDao")


const teacher_dashboard_get =(req,res)=>{
    if(req.session.user===true){
        console.log("session hai")
        teacherDao.getAllStudentData(function(allStudent){
            var studentlist=[]
            allStudent.forEach(element => {
                var dob=element.dob.toString().substring(4,15);
                
                // console.log(dob)
                var student={
                    rollnumber:element.rollnumber,
                    fullname:element.fullname,
                    dob:dob,
                    score:element.score
                }
                // console.log(student)
                studentlist.push(student)
            });
            res.render("teacherDashboard",{students:studentlist})
        })
    }
    else{
        console.log("session nhi hai")
    }
    
}

const teacher_logout_get=(req,res)=>{
    req.session.destroy(function(){
        console.log("teacher logged out.")
        res.redirect('/teacher/login');
     });
}

const teacher_login_get = (req, res) => {
    res.render("teacherLogin");
};

const teacher_login_post = (req, res) => {
    
    var email=req.body.email;
    var password=req.body.password;
    // console.log(email)
    // console.log(password)
    teacherDao.checkTeacherAndLogin(email,password,function(teacherData){
        if(teacherData.length==0){
            console.log("wrong credintials ..")
            res.render("teacherLogin",{error:"no teacher with this information"})
        }else{
            
            var teacheremailid=teacherData[0].email;
            var teacherpassword=teacherData[0].password;
            user={email:teacheremailid,password:teacherpassword}
            console.log(user)
            req.session.user=true;
            res.redirect('/teacher/teacherDashboard')
        }
    })
};

const teacher_delete_student=(req,res)=>{
    var rollnumber=req.params.rollnumber;
    console.log(rollnumber)
    teacherDao.deleteStudentById(rollnumber,function(data){
        res.redirect("/teacher/teacherDashboard")
    });

}

const teacher_edit_student_get=(req,res)=>{
    teacherDao.findStudentByRollnumber(req.params.rollnumber,function(data){
        
        res.render("editStudentPage",{student:data[0]})
    });

}

const teacher_edit_student_post=(req,res)=>{
    console.log("-------------------------------------------")
    console.log(req.body.rollnumber)
    teacherDao.updateStudentById(req.body.rollnumber,req.body.fullname,req.body.dob,req.body.score,function(data){
        console.log(data.affectedRows + " record(s) updated");
        res.redirect("/teacher/teacherDashboard")
    })

}

const teacher_add_student_get=(req,res)=>{
    if(req.session.user===true){
        res.render("addStudent")
    }
    else{
        res.render("teacherLogin")
    }
}

const teacher_add_student_post=(req,res)=>{
    var rollnumber=req.body.rollnumber
    var fullname=req.body.fullname
    var dob=req.body.dob
    var score=req.body.score
    teacherDao.addStudent(rollnumber,fullname,dob,score,function(data){
        if(data!="ALREADY THIS ROLL NUMBER STUDENT EXIST"){
            //console.log(data.affectedRows)
            res.render("addStudent",{message:"NEW STUDENT ADDED"})
        }
        else{
            res.render("addStudent",{message:"ALREADY THIS ROLL NUMBER STUDENT EXIST"})
        }
        
    })
}

module.exports={
    teacher_login_get,
    teacher_login_post,
    teacher_dashboard_get,
    teacher_logout_get,
    teacher_delete_student,
    teacher_edit_student_get,
    teacher_edit_student_post,
    teacher_add_student_get,
    teacher_add_student_post
    
}