// import mongoose from "mongoose";

// const reviewSchema=mongoose.Schema(
//     {
//         name:{
//             type:String,
//             required:true
//         },
//         rating:{
//             type:Number,
//             required:true
//         },
//         comment:{
//             type:String,
//             required:true,
//         },
//         user:{
//             type:mongoose.Schema.Types.ObjectId,
//             required:true,
//             ref:"User"
//         }
//     },
//     {
//         timestamps:true
//     }
// )

// const productSchema= mongoose.Schema(
//     {
//         user:{
//             type: mongoose.Schema.Types.ObjectId,
//             required: true,
//             ref:"User",
//         },
//         name:{
//             type : String ,
//             required :true,
//             // require : [true,"Please provide a name for the product"]
//         },
//         image:{
//             type: [String],
//             required: true,
//         },
//         brand:{
//             type: String,
//             required: true,
//         },
//         category:{
//             type:mongoose.Schema.Types.ObjectId, 
//             required: true,
//             ref:'Category'
//             // enum:["Electronics","Fashion","Home Decor"],
//         },
//         subCategory:{
//             type:mongoose.Schema.Types.ObjectId, 
//             required: true,
//             ref:'subCategory'
//         },
//         description:{
//             type: String,
//             required:true,
//         },
//         reviews:[reviewSchema],
//         rating:{
//             type:Number,
//             required:true,
//             default:0,
//         },
//         numReviews:{
//             type: Number,
//             required:true,
//             default:0
//         },
//         price:{
//             type: Number,
//             required: true,
//             default:0
//         },
//         countInStock: {
//             type: Number,
//             required: true,
//             default:0
//         },
//         size:{
//             type:[String],
//             required:true
//         },
//         colors:{
//             type:[String],
//             required:true
//         }
//     },
//     {
//         timestamps: true,
//     }
// )

// const Product = mongoose.model('Product',productSchema)

// export default Product

import mongoose from "mongoose";
const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
export default Product;