var express = require('express');
const { verify, register, login, finduser, finduserid, updateuser } = require('../Controller/User_controller');
var router = express.Router();

/* GET home page. */
router.post('/verify',verify)
router.post('/register',register)
router.post('/login',login)
router.get('/finduser',finduser)
router.get('/finduser/:id',finduserid)
router.post('/updateuser/:id',updateuser)



module.exports = router;
