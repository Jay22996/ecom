var express = require('express');
const { verify, register, login, finduser, finduserid, updateuser, updateuserresaller, showreseller, resallerreqsend, showree, reqdelete } = require('../Controller/User_controller');
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
router.get('/delete',reqdelete)








module.exports = router;
