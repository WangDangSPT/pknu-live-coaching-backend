const express = require('express')
const {getdir, compile, register, getprojects,newproject} = require('../controllers/users')
const router = express.Router()



/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource')
});

// router.post('/dir',)
//router.get('/srcfile',readsrcfile)
router.get('/compile',compile)
router.get('/getprojects',getprojects)
router.post('/newproject',newproject)
router.post('/register',register)

module.exports = router;
