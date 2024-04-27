var order = require("../Model/Order");
var cart = require("../Model/Cart");
var orderitel = require("../Model/Order_tiemlist")


exports.add_to_cart = async (req,res)=>{

    var id = req.params.id
    var pid = req.body.product_id
    var data = await cart.findOneAndUpdate({user_id:id},{$push:{product_list:{product_id:pid}}})
    res.status(200).json({
        status:"add to cart",
        data
    })

}

exports.remove_to_cart = async (req,res)=>{

    var id = req.params.id
    var pid = req.body.product_id
    var data = await cart.findOneAndUpdate({user_id:id},{$pull:{product_list:{product_id:pid}}})
    res.status(200).json({
        status:"add to cart",
        data
    })

}

exports.update_to_cart = async (req, res) => {
    try {
        var id = req.params.id;
        var pid = req.body.product_id;
        var quantity = req.body.quantity;

        var data = await cart.findByIdAndUpdate(id, { 
            $set: { 
                "product_list.$[elem].quantity": quantity 
            } 
        }, { 
            arrayFilters: [{ "elem.product_id": pid }], 
            new: true 
        });

        res.status(200).json({
            status: "add to cart",
            data
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

exports.order_generate = async (req, res) => {

    var data = await order.create(req.body)
    
    res.status(200).json({
        status: "add done",
        data:data
    });
}

exports.place_order = async (req, res) => {

    var id = req.params.id
    req.body.order_id = id
    var data = await orderitel.create(req.body)

    var orderitelid = data._id
    var data1 = await order.findByIdAndUpdate({_id: id},{$push: { orderitems: { orderitem_id: orderitelid } }})
    res.status(200).json({
        status: "add to itemlist",
        data:data,data1
    });
}

exports.order_update = async (req, res) => {

    var id = req.params.id
    var data = await order.findByIdAndUpdate(id,req.body)
    
    res.status(200).json({
        status: "update done",
        data:data
    });
}

exports.pending_order = async (req, res) => {

    var data = await order.find({status:"pending"})
    
    res.status(200).json({
        status: "show",
        data:data
    });
}

exports.going_order = async (req, res) => {

    var data = await order.find({status:"on going"})
    
    res.status(200).json({
        status: "show",
        data:data
    });
}

exports.shipping_order = async (req, res) => {

    var data = await order.find({status:"shipping"})
    
    res.status(200).json({
        status: "show",
        data:data
    });
}

exports.past_order = async (req, res) => {

    var data = await order.find({status:"past order"})
    
    res.status(200).json({
        status: "show",
        data:data
    });
}
