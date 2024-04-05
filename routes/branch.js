var express = require('express');
const { addbranch, updatebranch, datelebranch, showallbranch, showbranch } = require('../Controller/Branch_controller');
var router = express.Router();


router.post('/',addbranch)
router.post('/updatebranch/:id',updatebranch)
router.get('/deletebranch/:id',datelebranch)
router.get('/showbranch',showallbranch)
router.get('/showbranch/:id',showbranch)

module.exports = router;