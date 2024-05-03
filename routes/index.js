var express = require('express');
const { verify, register, login, finduser, finduserid, updateuser, updateuserresaller, showreseller, resallerreqsend, showree, reqdelete, forget_pass, find_data, find } = require('../Controller/User_controller');
var router = express.Router();

/* GET home page. */
router.post('/verify',verify)
router.post('/register',register)
router.post('/login',login)
router.get('/finduser',finduser)
router.get('/finduser/:id',finduserid)
router.post('/updateuser/:id',updateuser)
router.get('/updatere/:id',updateuserresaller)
router.get('/showree',showreseller)
router.post('/sendreq',resallerreqsend)
router.get('/showreq',showree)
router.get('/delete/:id',reqdelete)
router.post('/forgetpass/:id',forget_pass)
router.post('/finduser',find_data)
router.get('/find',find)











module.exports = router;
