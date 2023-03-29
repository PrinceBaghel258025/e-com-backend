const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "Product"},
            quantity: Number
        }
    ],
    address: {
        type: String,
        default: "Your Home Address"
    },
    phone: {
        type: Number
    },
    status: {
        type: String,
        default: "Not Processed",
        enum: [
            "Not Processed",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled"
        ]
    },
}, {
    timestamps: true
})

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;