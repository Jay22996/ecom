var express = require("express");
const {
  addcoupne,
  showc,
  showcid,
  findyou,
  coupneuse,
  coupne_status,
  ref,
  cdelete,
  cupdate,
} = require("../Controller/Coupne_controller");
var router = express.Router();

router.post("/addcoupne", addcoupne);
router.get("/cdelete/:id", cdelete);
router.post("/cupdate/:id", cupdate);
router.get("/coupneshow", showc);
router.get("/coupnefind/:id", showcid);
router.get("/findone", findyou);
router.post("/coupneuse", coupneuse);
router.post("/coupnestatus", coupne_status);
router.post("/courefpne", ref);

module.exports = router;
