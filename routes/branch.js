var express = require("express");
const {
  addbranch,
  updatebranch,
  datelebranch,
  showallbranch,
  showbranch,
  s,
  login,
} = require("../Controller/Branch_controller");
var router = express.Router();

router.post("/", addbranch);
router.post("/login", login);
router.post("/updatebranch/:id", updatebranch);
router.get("/deletebranch/:id", datelebranch);
router.get("/showbranch", showallbranch);
router.get("/showbranch/:id", showbranch);
router.post("/a/:id", s);

module.exports = router;
