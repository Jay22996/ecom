var express = require('express');
const { Reviewall, Reviewupdate, Reviewfine, Reviewdelete } = require('../Controller/Review_controller');
const { addlikelist, unlikelist, showlikelist } = require('../Controller/Like_controller');

var router = express.Router();


router.post('/reviewadd/:id',Reviewall)
router.post('/reviewupdate/:id',Reviewupdate)
router.get('/reviewfine/:id',Reviewfine)
router.get('/reviewdelete/:id',Reviewdelete)
router.get('/reviewdelete/:id',Reviewdelete)
router.post("/likeproduct/:id",addlikelist)
router.post("/unlike/:id",unlikelist)
router.get("/showlike/:id",showlikelist)


module.exports = router;
