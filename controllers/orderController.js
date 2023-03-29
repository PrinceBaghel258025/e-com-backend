const Order = require('../models/orderModel')

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate("products.id", "pName pPrice")
            .populate("user", "name, email")
        if (!orders) {
            return res.status(400).json({
                error: "No Orders exist"
            })
        }
        return res.status(200).json({
            orders: orders,
            message: "Orders found"
        })
    } catch (err) {
        console.log(err)
    }
}
const getSingleOrder = async (req, res) => {
    const { orderId } = req.params;
    try{ 
        const order = await Order.findById(orderId)
            .populate('products.id', "pName pPrice")
            .populate("user", "name ")
        if(!order) {
            return res.status(400).json({
                message: "id may be invalid OR order not found"
            })
        }
        return res.status(200).json({
            order: order
        })
    } catch(err) {
        console.log(err)
    }
}
const getOrderByUser = async (req, res) => {
    const {userId} = req.params;
    if(!userId) {
        return res.statu(400).json({
            message: "Please provide user id"
        })
    }
    try{
        const order = await Order
            .find({user: userId})
            .populate("products.id", "pName, pPrice")
            .populate("user", "name email")
        if(!order) {
            return res.status(400).json({
                message: "Invalid order id"
            })
        }
        return res.status(200).json({
            order: order
        })
    } catch(err) {
        console.log(err)
    }

}
const createOrder = async (req, res) => {
    const {products, user, amount, address, phone} = req.body;
    if(!products || !user || !amount || !address || !phone) {
        return res.status(400).json({
            message: "Please provide complete details"
        })
    }
    try{
        const newOrder = new Order({
            products,
            user,
            amount,
            address,
            phone
        })
        const savedOrder = await newOrder.save();
        if(!savedOrder) {
            return res.status(400).json({
                message: "something went wrong in saving order"
            })
        }
        return res.status(200).json({
            order: savedOrder,
            message: "Order Created Successfully"
        })
    } catch(err) {
        console.log(err)
    }
}
const updateOrder = async (req, res) => {

    const {orderId } = req.params;
    const {amount, address, phone } = req.body;
    if(!amount || !address || !phone) {
        return res.status(400).json({
            message: "Provide all fields"
        })
    }
    try{
        const updatedOrder = await Order.findByIdAndUpdate(orderId,
            {
                amount, address, phone, updatedAt: Date.now()
            }, { new : true } )
        if(!updatedOrder) {
            return res.status(400).json({
                message: "Order Can'nt be updated"
            })
        }
        return  res.status(200).json({
            order: updatedOrder,
            message: "Order updated successfully"
        })
    } catch(err) {
        console.log(err)
    }
 

}
const deleteOrder = async (req, res) => {
    const { orderId } = req.params;

    try{
        const deletedOrder = await Order.findByIdAndDelete(orderId);
        if(!deletedOrder) {
            return res.status(400).json({
                message: "No Order Found"
            })
        }
        return res.status(200).json({
            message: "Order deleted Successfully"
        })
    } catch(err) {
        console.log(err)
    }
}

module.exports = {
    getAllOrders,
    getOrderByUser,
    createOrder,
    updateOrder,
    deleteOrder,
    getSingleOrder
}

