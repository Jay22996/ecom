var express = require('express');
const { add_to_cart, remove_to_cart, update_to_cart, order_generate, place_order, order_update, pending_order, going_order, shipping_order, past_order, past, order_show, show_show, show_date, show_all } = require('../Controller/Order_controlle');
const { add_shipment, update_shipment, Delete_shipment, find_shipment } = require('../Controller/Shipment_controller');
var router = express.Router();


router.post('/addtocart/:id',add_to_cart)
router.post('/removetocart/:id',remove_to_cart)
router.get('/showcart/:id',show_show)
router.post('/updatetocart/:id',update_to_cart)
router.post("/ordergenerat",order_generate)
router.post("/placeorder/:id",place_order)
router.post("/shipment/:id",add_shipment)
router.post("/shipmentupdate/:id",update_shipment)
router.get("/shipmentdelete/:id",Delete_shipment)
router.get("/shipmentfind/:id",find_shipment)
router.post("/updateorder/:id",order_update)
router.get("/pending_order",pending_order)
router.get("/going_order",going_order)
router.get("/shipping_order",shipping_order)
router.get("/past_order",past_order)
router.get("/ordershow/:id",order_show)
router.get("/past",past)
router.get("/showdate",show_date)
router.get("/showall",show_all)

module.exports = router;