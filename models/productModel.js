const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    pName: {
        type: String,
        required: true,
    },
    pDescription: {
        type: String,
        required: true,
    },
    pPrice: {
        type: Number,
        required: true
    },
    pOfferPrice: {
        type: Number,
        // default: 
    },
    pSold: {
        type: Number,
        default: 0
    },
    pQuantity: {
        type: Number,
        default: 0,
    },
    pCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    pImages: {
        type: Array,
        // required: true
    },
    pStatus:{
        type: String,
        default: 'Available'
    },
    pBrand: {
        type: String,
    }
}, {
    timestamps: true
});

const Product = mongoose.model("Product", productSchema)
module.exports = Product