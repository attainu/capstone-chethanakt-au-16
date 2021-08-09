const Product = require('../models/product')


// Create new product => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors (async (req, res, next) => {

  const products = await Product.create(req.body)

  res.status(201).json({
        success: true,
        products
  })
})

// Get single product details => /api/v1/product/:id

exports.getSingleProduct = async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHandler('Product not found', 404));
    }


    res.status(200).json({
        success: true,
        product
    })
}

// Get all products => /api/v1/products

exports.getProducts = async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        count: products.length,
        products
  })
}

// Update Product => /api/v1/admin/project/:id
exports.updateProduct = async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        }) 
        
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.boy, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product

    })
}

// Delete product => /api/v1/admin/project/:id

exports.deleteProduct = async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return  res.status(404).json({
            success: false,
            message: "Product not found"
        }) 
    }

    await product.remove();

    res.status(200).json({ 
        success: true,
        message: 'Product deleted successfully'
    })
}
