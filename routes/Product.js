var express = require('express');
const { addproduct, showallproduct, showproduct, deleteproduct, updateproduct } = require('../Controller/Product_controller');
var router = express.Router();


router.post('/:id',addproduct)
router.get('/showproduct',showallproduct)
router.get('/showproduct/:id',showproduct)
router.get('/deleteproduct/:id',deleteproduct)
router.post('/updateproduct/:id',updateproduct)


module.exports = router;