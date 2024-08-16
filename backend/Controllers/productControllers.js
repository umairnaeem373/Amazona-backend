import asynchandler from "express-async-handler";
import Product from "../Models/productModel.js";

export const getProducts = asynchandler(async (req, res) => {
  const pageSize = 2
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword ? {
  name:{
    $regex: req.query.keyword ,
    $options:"i" //for case insensitive search
  }
} : {}
const count = await Product.countDocuments({...keyword})
  const products=await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1))
  res.json({products,page , pages:Math.ceil(count/pageSize)});
});

export const getProductsById = asynchandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).send("Product not found");
  }
  res.json(product);
});

//@dec       Delete product
//@route     DELETE /api/products/:id
//@access    Private /admin
export const deleteProduct = asynchandler(async (req, res) => {
  const product = req.params.id;

  if (product) {
    await Product.findByIdAndDelete(product);
    res.send({ message: "Product deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

//@dec       Create a product
//@route     POST /api/products
//@access    Private /admin
export const createProduct = asynchandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand ",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asynchandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = asynchandler(async (req, res) => {
  console.log(req.body,'bodyyyyyyyyyyyyyyyyy')
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  }
   else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
export const getTopProducts = asynchandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})


