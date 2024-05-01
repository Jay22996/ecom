var express = require('express');
const { addcoupne, showc, showcid, findyou, coupneuse, coupne_status} = require('../Controller/Coupne_controller');
var router = express.Router();
    
router.post('/addcoupne/:id',addcoupne)
router.get('/coupneshow',showc)
router.get('/coupnefind/:id',showcid)
router.get('/findone',findyou)
router.post("/coupneuse",coupneuse)
router.post("/coupnestatus",coupne_status)

module.exports = router;