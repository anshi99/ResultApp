var express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const bodyParser = require("body-parser");



 

 
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/login',teacherController.teacher_login_get);
router.post('/login',urlencodedParser,teacherController.teacher_login_post);

router.get('/logout',teacherController.teacher_logout_get);

router.get('/teacherDashboard',teacherController.teacher_dashboard_get);

router.get('/deletestudent/:rollnumber',teacherController.teacher_delete_student)

router.get('/editstudent/:rollnumber',teacherController.teacher_edit_student_get)
router.post('/editstudent',urlencodedParser,teacherController.teacher_edit_student_post)

router.get('/addstudent',teacherController.teacher_add_student_get)
router.post('/addstudent',urlencodedParser,teacherController.teacher_add_student_post)
router.use(express.static('public'))


module.exports = router;