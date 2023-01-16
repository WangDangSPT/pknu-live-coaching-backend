const express = require('express')
const {compile, getAllProjects,newproject,getAllClassrooms,newClassroom} = require('../controllers/users')
const {verifyToken} = require('../middleware/authjwt')
const router = express.Router()



/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource')
});

router.post('/compile',[verifyToken],compile)
router.get('/getallprojects',[verifyToken],getAllProjects)
router.post('/newproject',[verifyToken],newproject)
router.post('/newclassroom',[verifyToken],newClassroom)
router.get('/getallclassrooms',[verifyToken],getAllClassrooms)

module.exports = router;
