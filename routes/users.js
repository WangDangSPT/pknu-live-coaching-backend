const express = require('express')
const {getdir, compile} = require('../controllers/users')
const router = express.Router()



/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource')
});

router.get('/dir/:id',getdir)
// router.post('/dir',)
router.get('/compile/:id',compile)

module.exports = router;
