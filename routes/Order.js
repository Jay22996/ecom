var express = require('express');
const { add_to_cart, remove_to_cart, update_to_cart, order_generate, place_order, order_update } = require('../Controller/Order_controlle');
const { add_shipment, update_shipment, Delete_shipment, find_shipment } = require('../Controller/Shipment_controller');
var router = express.Router();


router.post('/addtocart/:id',add_to_cart)
router.post('/removetocard/:id',remove_to_cart)
router.post('/updatetocart/:id',update_to_cart)
router.post("/ordergenerat",order_generate)
router.post("/placeorder/:id",place_order)
router.post("/shipment/:id",add_shipment)
router.post("/shipmentupdate/:id",update_shipment)
router.get("/shipmentdelete/:id",Delete_shipment)
router.get("/shipmentfind/:id",find_shipment)
router.post("/updateorder/:id",order_update)











module.exports = router;