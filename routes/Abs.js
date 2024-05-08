var express = require("express");
const {
  addabs,
  showabs,
  updateabs,
  deleteabs,
  showallabs,
} = require("../Controller/Abs_controller");
var router = express.Router();

router.post("/", addabs);
router.get("/show/:id", showabs);
router.get("/showall", showallabs);
router.post("/updateabs/:id", updateabs);
router.get("/deleteabs/:id", deleteabs);

module.exports = router;
