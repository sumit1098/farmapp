const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");


// Create Product -- Admin

exports.createProduct = catchAsyncError(async (req, res, next)=>{

    req.body.user = req.user.id

    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
}) 

// GET all products
exports.getAllProducts = catchAsyncError(async(req, res, next)=>{

    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
    
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeature.query;
    res.status(200).json({
        success:true, 
        products,
        productsCount,
        resultPerPage
    })

})

//GET product details
exports.getProductDeatails = catchAsyncError(async(req, res, next)=>{

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",  404))
    }

    
    res.status(200).json({
        success:true,
        product,
    })
})

//UPDATE product -- admin

exports.updateProduct = catchAsyncError(async(req, res, next)=>{

    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",  404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new:true, 
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product
    })
})

//DELETE product

exports.deleteProduct = catchAsyncError(async(req, res, next)=>{

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",  404))
    }

    await product.remove();

    res.status(200).json({
        success:true,
        message: "Product deleted"
    })
})

//Reviews
exports.createProductReview = catchAsyncError(async(req, res, next)=>{

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString())

    if(isReviewed){

        product.reviews.forEach((rev) => {
            if(rev.user.toString()===req.user._id.toString())
                (rev.rating = rating), (rev.comment = comment);
        });
    }else{
        product.reviews.push(review);
        product.numberOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });
    
    product.ratings = avg / product.reviews.length;

    await product.save({
        validateBeforeSave: false
    });

    res.status(200).json({
        success: true,
    });
});

//get all reviews of a product
exports.getProductReviews = catchAsyncError(async (req, res, next)=>{
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success:true,
        reviews: product.reviews,
    })
})

//Delete Reviews
exports.deleteReviews = catchAsyncError(async (req, res, next)=>{
    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter( rev => rev._id.toString() !== req.query.id.toString())

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });
    
    let ratings = 0;

    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }

    const numberOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numberOfReviews,
    },
    {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success:true,
    })
})