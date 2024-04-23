var express = require('express');
const { verify, register, login, finduser, finduserid, updateuser, updateuserresaller, showreseller } = require('../Controller/User_controller');
var router = express.Router();

/* GET home page. */
router.post('/verify',verify)
router.post('/register',register)
router.post('/login',login)
router.get('/finduser',finduser)
router.get('/finduser/:id',finduserid)
router.post('/updateuser/:id',updateuser)
router.get('/updatere/:id',updateuserresaller)
router.get('/showree/:id',showreseller)





module.exports = router;
