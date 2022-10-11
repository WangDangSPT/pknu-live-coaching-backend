const express = require('express')
const {compile, getprojects,newproject} = require('../controllers/users')
const {verifyToken} = require('../middleware/authjwt')
const router = express.Router()



/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource')
});

// router.post('/dir',)
// router.get('/srcfile',readsrcfile)
router.get('/compile',[verifyToken],compile)
router.get('/getprojects',[verifyToken],getprojects)
router.post('/newproject',[verifyToken],newproject)

module.exports = router;
