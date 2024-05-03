var express = require('express');
const { add_address, find_address, update_address, delete_address, find } = require('../Controller/Shipping_address');
var router = express.Router();

router.post('/addaddress/:id',add_address)
router.get("/findaddress/:id",find_address)
router.post("/updateaddress/:id",update_address)
router.post("/deleteaddress/:id",delete_address)
router.get("/find",find)




module.exports = router;