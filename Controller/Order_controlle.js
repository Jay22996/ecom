var order = require("../Model/Order");
var cart = require("../Model/Cart");
var orderitel = require("../Model/Order_tiemlist");
var product = require("../Model/ProductModel");
var rev = require("../Model/Branch_revenew");



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

  res.status(200).json({
    status: "add done",
    data: data,
  });
};

exports.show_date = async (req, res) => {

  var data = await order.find();

  const today = new Date();
  const todayOrders = data.filter((data) => {
    const orderDate = data.order_date;
    return (
      orderDate.getFullYear() === today.getFullYear() &&
      orderDate.getMonth()+ 1 === today.getMonth()+ 1 &&
      orderDate.getDate() === today.getDate()
    );
  });

  res.status(200).json({
      status: "add done",
      data:todayOrders
  });
};

exports.place_order = async (req, res) => {
  var id = req.params.id;
  req.body.order_id = id;
  var product_id = req.body.product_id
  var produ = await product.findByIdAndUpdate({ _id: product_id },
    { $inc: { selling: 1 } })
  var data = await orderitel.create(req.body);
  var quantity = data.quantity
  var produ1 = await product.findByIdAndUpdate({ _id: product_id },{ $inc: { stock_Id: quantity } })

  var orderitelid = data._id;
  var data1 = await order.findByIdAndUpdate(
    { _id: id },
    { $push: { orderitems: { orderitem_id: orderitelid , product_id:product_id} } }
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
    var data = await order.findByIdAndUpdate(id, req.body);
    var data1 = data.branch_id;
    var total_amount = data.total_amount;
    // console.log(data1);
    // console.log(total_amount);

    if (req.body.status === "past order") {
      const today = new Date();
      const month = today.toLocaleString('default', { month: 'long' });

      var updatedData = await rev.findOneAndUpdate(
        { branch_id: data1 },
        {
          $inc: {
            "revenew.$[elem].m_rev": total_amount
          }
        },
        {
          arrayFilters: [{ "elem.month": month }],
          new: true
        }
      );

      // Assuming you want to retrieve the updated document
      // console.log("Updated Data:", updatedData);
    }

    res.status(200).json({
      status: "update done",
      data: data,updatedData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.rev_show = async (req, res) => {
  var data = await rev.find().populate("branch_id")

  res.status(200).json({
    status: "show",
    data: data,
  });
};

exports.order_show = async (req, res) => {
  var id = req.params.id;
  var data = await order
    .find({user_id:id})
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

exports.going_order = async (req, res) => {
  var data = await order.find({ status: "on going" }).populate("user_id");

  res.status(200).json({
    status: "show",
    data: data,
  });
};

exports.show_all = async (req, res) => {
    var data = await order.find({ordermode:"offline"});
    var data1 = await order.find({ordermode:"online"});

  
    res.status(200).json({
      status: "show",
      data: data,data1
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
    data.forEach(data => {
      total += data.total_amount;
    });
    return total;
  }
  const totalAmount = calculateTotalAmount(data);

  res.status(200).json({
    status: "show",
    data: data,totalAmount
  });
};

exports.past = async (req, res) => {
  // var data = await order.updateMany({
  //   selling:101
  // });
  // const today = new Date();
  // const month = today.toLocaleString('default', { month: 'long' });
  // console.log(month);
  // res.status(200).json({
  //   status: "show",
  //   data: data,
  // });
};
