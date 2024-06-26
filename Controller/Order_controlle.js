var order = require("../Model/Order");
var cart = require("../Model/Cart");
var orderitel = require("../Model/Order_tiemlist");
var product = require("../Model/ProductModel");
var rev = require("../Model/Branch_revenew");
var coupne = require("../Model/Coupne_details");
var p_stock = require("../Model/Product_stock");

exports.add_to_cart = async (req, res) => {
  var id = req.params.id;
  var pid = req.body.product_id;
  var data = await cart.findOneAndUpdate(
    { user_id: id },
    { $push: { product_list: { product_id: pid } } }
  );
  res.status(200).json({
    status: "add to cart",
    data,
  });
};

exports.remove_to_cart = async (req, res) => {
  var id = req.params.id;
  var pid = req.body.product_id;
  var data = await cart.findOneAndUpdate(
    { user_id: id },
    { $pull: { product_list: { product_id: pid } } }
  );
  res.status(200).json({
    status: "remove to cart",
    data,
  });
};

exports.show_show = async (req, res) => {
  var id = req.params.id;
  var data = await cart
    .find({ user_id: id })
    .populate("user_id")
    .populate("product_list.product_id");
  res.status(200).json({
    status: "show cart",
    data,
  });
};

exports.update_to_cart = async (req, res) => {
  try {
    var id = req.params.id;
    var pid = req.body.product_id;
    var quantity = req.body.quantity;

    var data = await cart.findByIdAndUpdate(
      id,
      {
        $set: {
          "product_list.$[elem].quantity": quantity,
        },
      },
      {
        arrayFilters: [{ "elem.product_id": pid }],
        new: true,
      }
    );

    res.status(200).json({
      status: "add to cart",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.order_generate = async (req, res) => {
  var data = await order.create(req.body);
  var id = data.coupon_id;
  if (id !== "") {
    var data1 = await coupne.findOneAndUpdate(
      { coupne_code: id },
      { userOrnot: "use" }
    );
  }

  res.status(200).json({
    status: "add done",
    data: data,
  });
};

exports.show_date = async (req, res) => {
  var data = await order.find();

  const today = new Date();
  // const todayOrders = data.filter((data) => {
  //   const orderDate = data.order_date;
  //   return (
  //     orderDate.getFullYear() === today.getFullYear() &&
  //     orderDate.getMonth() + 1 === today.getMonth() + 1 &&
  //     orderDate.getDate() === today.getDate()
  //   );
  // });
  const todayOrders = data.filter((data) => {
    const orderDate = data.order_date;
    // Check if orderDate is defined before accessing its properties
    if (orderDate) {
      return (
        orderDate.getFullYear() === today.getFullYear() &&
        orderDate.getMonth() + 1 === today.getMonth() + 1 &&
        orderDate.getDate() === today.getDate()
      );
    }
    return false; // Or handle this case according to your logic
  });

  res.status(200).json({
    status: "add done",
    data: todayOrders,
  });
};

exports.place_order = async (req, res) => {
  var id = req.params.id;
  req.body.order_id = id;
  var product_id = req.body.product_id;
  var produ = await product.findByIdAndUpdate(
    { _id: product_id },
    { $inc: { selling: 1 } }
  );
  var data = await orderitel.create(req.body);
  var quantity = data.quantity;

  var produ1 = await p_stock.findOneAndUpdate(
    {
      product_id: req.body.product_id,
      "quanitity.branch_id": req.body.branch_id,
    },
    {
      $inc: {
        "quanitity.$.quanititys": -quantity,
      },
    }
  );
  var orderitelid = data._id;
  var data1 = await order.findByIdAndUpdate(
    { _id: id },
    {
      $push: {
        orderitems: { orderitem_id: orderitelid, product_id: product_id },
      },
    }
  );
  res.status(200).json({
    status: "add to itemlist",
    data: data,
    data1,
  });
};

exports.order_update = async (req, res) => {
  try {
    var id = req.params.id;
    var data1 = await order.findByIdAndUpdate(id, req.body);
    var data = await order.findById(id);
    var orderitemss = data.orderitems;

    if (req.body.status === "past order") {
      const today = new Date();
      const month = today.toLocaleString("default", { month: "long" });
      var updatedData = await rev.findOneAndUpdate(
        { branch_id: data1.branch_id },
        {
          $inc: {
            "revenew.$[elem].m_rev": data1.total_amount,
          },
        },
        {
          arrayFilters: [{ "elem.month": month }],
          new: true,
        }
      );
    } else if (req.body.status === "rejected") {
      for (let i = 0; i < orderitemss.length; i++) {
        console.log(orderitemss.length);
        var item = orderitemss[i].orderitem_id;

        var isdata = await orderitel.findById(item);
        var quantity = isdata.quantity;
        var productid = isdata.product_id;
        var barnch = isdata.barnch_id;

        var produ1 = await p_stock.findOneAndUpdate(
          { product_id: productid, "quanitity.branch_id": data1.branch_id },
          {
            $inc: {
              "quanitity.$.quanititys": quantity,
            },
          }
        );
      }
    } else if (req.body.status === "cancel") {
      console.log("cancel");

      for (let i = 0; i < orderitemss.length; i++) {
        var item = orderitemss[i].orderitem_id;
        console.log(item);
        console.log(orderitemss.length);

        var isdata = await orderitel.findById(item);
        var quantity = isdata.quantity;
        var productid = isdata.product_id;
        var barnch = isdata.barnch_id;

        var produ1 = await p_stock.findOneAndUpdate(
          { product_id: productid, "quanitity.branch_id": data1.branch_id },
          {
            $inc: {
              "quanitity.$.quanititys": quantity,
            },
          }
        );
      }
    }

    res.status(200).json({
      status: "update done",
      data: data,
      updatedData,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.rev_show = async (req, res) => {
  var data = await rev.find().populate("branch_id");

  res.status(200).json({
    status: "show",
    data: data,
  });
};

exports.order_show = async (req, res) => {
  var id = req.params.id;
  var data = await order
    .find({ user_id: id })
    .populate("user_id")
    .populate("orderitems.orderitem_id")
    .populate("orderitems.product_id");
  res.status(200).json({
    status: "show",
    data: data,
  });
};

exports.order_showpc = async (req, res) => {
  var id = req.params.id;
  var data = await order
    .findById(id)
    .populate("user_id")
    .populate("orderitems.orderitem_id")
    .populate("orderitems.product_id");
  res.status(200).json({
    status: "show",
    data: data,
  });
};

exports.pending_order = async (req, res) => {
  var data = await order.find({ status: "pending" }).populate("user_id");

  res.status(200).json({
    status: "show",
    data: data,
  });
};

exports.cancel_order = async (req, res) => {
  var data = await order.find({ status: "cancel" }).populate("user_id");

  res.status(200).json({
    status: "show",
    data: data,
  });
};

exports.regected_order = async (req, res) => {
  var data = await order.find({ status: "rejected" }).populate("user_id");

  res.status(200).json({
    status: "show",
    data: data,
  });
};

exports.going_order = async (req, res) => {
  var data = await order.find({ status: "on going" }).populate("user_id");

  res.status(200).json({
    status: "show",
    data: data,
  });
};

exports.show_all = async (req, res) => {
  var data = await order.find({ ordermode: "shop" });
  var data1 = await order.find({ ordermode: "online" });

  res.status(200).json({
    status: "show",
    data: data,
    data1,
  });
};

exports.shipping_order = async (req, res) => {
  var data = await order.find({ status: "shipping" }).populate("user_id");

  res.status(200).json({
    status: "show",
    data: data,
  });
};

exports.past_order = async (req, res) => {
  var data = await order.find({ status: "past order" }).populate("user_id");

  function calculateTotalAmount(data) {
    let total = 0;
    data.forEach((data) => {
      total += data.total_amount;
    });
    return total;
  }
  const totalAmount = calculateTotalAmount(data);

  res.status(200).json({
    status: "show",
    data: data,
    totalAmount,
  });
};

exports.past = async (req, res) => {
  var data = await product.updateMany({ brand_id: "663893ad57060c812d72273f" });
  res.status(200).json({
    status: "show",
    data: data,
  });
};
