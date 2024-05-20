var express = require("express");
const {
  stock,
  stockall,
  stockadd,
  stockupdate,
} = require("../Controller/Stock_manage");
var router = express.Router();

router.post("/:id", stockadd);
router.get("/showallstock", stock);
router.get("/showstockone", stockall);
// router.post("/updatestock/:id/:bid",stockupdate)

module.exports = router;
