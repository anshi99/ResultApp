var express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const studentController = require('../controllers/studentController');


 

 
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/login',studentController.student_login_get);
router.post('/login',urlencodedParser,studentController.student_login_post);


router.use(express.static('public')) // for showing images or any static file on page


module.exports = router;