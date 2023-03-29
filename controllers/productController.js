const Category = require('../models/categoryModel')
const Product = require('../models/productModel')

const getAllProducts = async (req, res) => {
    try{
        const products = await Product
            .find({})
            .populate('pCategory', "_id cName")
            .sort({ _id: -1})
        if(products) {
            // console.log("Product controller", products)
            return res.status(200).json({
                products: products
            })
        }
    } catch(err) {
        console.log(err)
    }
}
const getProductByCategory = async (req, res) => {

    const {category} = req.query;
    // console.log(category)
    if(!category) {
        return res.status(400).json({
            message: 'please provide a category'
        })
    }
    try{
        // find category id
        const categoryId = await Category.find({ cName: category})
        if(!category) {
            return res.status(200).json({
                products: [],
                message: "Category Not Exists"
            })
        }
        const products = await Product
            .find({ pCategory: categoryId })
            .populate("pCategory", "cName")
        if(!products) {
            return res.status(200).json({
                products: [],
                message: "No products are available for this category"
            })
        }
        return res.status(200).json({
            products,
            message: "Products fetched successfully"
        })
    } catch(err) {
        console.log(err)
    }
    
    
 }
const getProductByPrice = async (req, res) => {
    const {minPrice, maxPrice} = req.query
    const mnPrice = Number(minPrice);
    const mxPrice = Number(maxPrice)
    // console.log(req.query)
    // res.send("request received")

    try{
        const products = await Product
            .find({ pPrice: { $gte: mnPrice , $lte: mxPrice}})
            .populate("pCategory", "cName")
            .sort({pPrice: -1});

        if(!products) {
            return res.status(400).json({
                message: "No Products in this range"
            })
        }
        return res.status(200).json({
            products: products
        })
    } catch(err) {
        console.log(err)
    }
 }

 // need to do some minor modifications
 const addProduct = async (req, res) => {
    const {pName, pDescription, pPrice, pCategory} = req.body;
    if(!pName || !pDescription || !pPrice || !pCategory){
        return res.status(404).json({
            message: "All Fields are mandatory"
        })
    }
    try {
        const newProduct = new Product({
            pName, pDescription, pPrice, pCategory
        });
        const product = await newProduct.save()
        if(product) {
            return res.status(201).json({
                product: product,
                message: "Product created successfully"
            })
        }
    } catch (error) {
        console.log(error)
    }
 }
 const updateProduct = async (req, res) => {
    const {id: pId} = req.params;
    const { pName, pDescription, pPrice} = req.body;
    if(!pId || !pName || !pDescription || !pPrice) {
        return res.status(400).json({
            message: "Please provide all fields"
        })
    }
    try{
        const editedProduct =  await Product.findByIdAndUpdate(pId, {
            pName, pDescription, pPrice
        }, { new: true})
        if(!editedProduct){
            return res.status(400).json({
                message: "Product could not be edited"
            })
        }
        return res.status(200).json({
            product : editedProduct,
            message: "Product updated Successfully"
        })
    } catch(err) {
        console.log(err)
    }
 }
 const deleteProduct = async (req, res) => {
    const {id } = req.params;
    if(!id) {
        return res.status(400).json({
            message: "Please provide an id"
        })
    }
    try{
        const deletedProduct = await Product.findByIdAndDelete(id);
        if(!deletedProduct) {
            return res.status(404).json({
                message: "Please provide a valid id"
            })
        }
        return res.status(204).json({
            message: "Product deleted successfully"
        })
    } catch(err) {
        console.log(err)
    }
 }
 const getSingleProduct = async (req, res) => {
    const { id } = req.params;
    // console.log(req.params)
    // console.log("getting single product")
    if(!id) {
        return res.status(404).json({
            message: "Please provide an id"
        })
    }
    try{
        let product = await Product
            .findById(id)
            .populate("pCategory", "cName")
        if(!product) {
            return res.status(404).json({
                message: "Provided id is not valid"
            })
        }
        // console.log(product)
        return res.status(200).json({
            product: product,
            message: "Product fetched successfully"
        })
    } catch(err) {
        console.log(err)
    }
 }

 module.exports = {
    getAllProducts,
    getProductByCategory,
    getProductByPrice,
    addProduct,
    updateProduct,
    deleteProduct,
    getSingleProduct
 }
