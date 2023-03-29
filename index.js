require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const products = require('./data/products')
const categories = require('./data/categories')
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')
const userRoutes = require('./routes/userRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const morgan = require('morgan')
const Product = require('./models/productModel')
app.use(cors());
app.use(morgan('common'))
app.use(bodyParser.json());

const URL = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

app.get('/api/products', async (req, res) => {
    return res.send(products)
})
app.get('/api/categories', (req, res) => {
    return res.send(categories)
})
app.post('/api/products/multiple', async (req, res) => {
    // console.log(req.body)
    const products = req.body.products
    try {
        products.forEach( async element => {
            
            const newProduct = new Product({...element, "pCategory" : "641ea496fbc7581cb707961c"});
            const product = await newProduct.save()
        });
        const createdProducts = await Product.find({})
        return res.status(200).json({
            products : createdProducts
        })
        } catch (error) {
            console.log(error)
    }

})
app.use('/api', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/product', productRoutes)
app.use('/api/order', orderRoutes)
// app.use('/admin', adminRoutes)
// app.use('/auth', authRoutes)





mongoose.connect(URL).then(
    response =>
        console.log("connected to database")
)
.catch(error => {
    console.log(error)
})

app.listen(5000, () =>{
    console.log("server is listening at port 5000")
})