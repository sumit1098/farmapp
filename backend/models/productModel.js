const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter the product name"],
        trim: true
    },
    description:{
        type: String,
        required: [true, "Please Enter product description"]
    },
    price:{
        type: Number,
        required:[true, "Please enter product price"],
        maxlength:[8, "Price cannot exceed eight characters"]
    },
    ratings:{
        type: Number,
        default: 0
    },
    images:[
        {        
            public_id:{
                type: String,
                required: true
            },
            url:{
                type: String,
                required:true
            }
        }
    ],
    category:{
        type: String,
        required: [true, "Please Enter product category"],
    },
    Stock:{
        type: Number,
        required: [true, "Please enter product stock"],
        default: 1
    },
    numberOfReviews:{
        type: Number,
        default: 0
    },
    reviews:[
        {
            user:{
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            name:{
                type: String,
                required:true,
            },
            rating:{
                type: Number,
                required:true
            },
            comment:{
                type: String,
                required: true
            }
        }
    ],

    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },

    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Product", productSchema);