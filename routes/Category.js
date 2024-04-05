var express = require('express');
const { addCategory, showCategory, deleteCategory, updateCategory } = require('../Controller/Category_controller');
var router = express.Router();


router.post('/',addCategory)
router.get('/categoryshow',showCategory)
router.get('/categorydelete/:id',deleteCategory)
router.post('/categoryupdate/:id',updateCategory)


module.exports = router;