var express = require('express');
const { addCategory, showCategory, deleteCategory, updateCategory, addbrand, showbrand, deletebrand, updatebrand } = require('../Controller/Category_controller');
var router = express.Router();


router.post('/',addCategory)
router.get('/categoryshow',showCategory)
router.get('/categorydelete/:id',deleteCategory)
router.post('/categoryupdate/:id',updateCategory)
router.post('/brand',addbrand)
router.get('/showbrand',showbrand)
router.get('/detelebrand/:id',deletebrand)
router.post('/updatebrand/:id',updatebrand)






module.exports = router;