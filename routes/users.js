const express = require('express')
const {getdir, compile,readsrcfile} = require('../controllers/users')
const router = express.Router()



/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource')
});

router.get('/dir',getdir)
// router.post('/dir',)
router.get('/srcfile',readsrcfile)
router.get('/compile',compile)

module.exports = router;
