var express = require("express");
const {
  addproduct,
  showallproduct,
  showproduct,
  deleteproduct,
  updateproduct,
  productstatus,
  show_yes,
  product_quantity,
} = require("../Controller/Product_controller");
var router = express.Router();

router.post("/:id", addproduct);
router.get("/showproduct", showallproduct);
router.get("/showproduct/:id", showproduct);
router.get("/deleteproduct/:id", deleteproduct);
router.post("/updateproduct/:id", updateproduct);
router.get("/status/:id", productstatus);
router.get("/showyes", show_yes);
router.post("/update/:id",product_quantity);




module.exports = router;
