import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/Users.js";
import products from "./data/Products.js";
import User from "./Models/userModel.js";
import Order from "./Models/orderModel.js";
import Product from "./Models/productModel.js";
import connectDB from "./config/db.js";

dotenv.config();

const link=process.env.DB_URI
connectDB(link);

const importData = async () => {
  try {
    await User.deleteMany(); //clears the user collection before importing new data
    await Product.deleteMany();
    // await User.deleteMany();
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);

    console.log("Data Imported".green.inverse);
    process.exit();
  } catch (error) {
    console.error(error.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    console.log("Data Destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.log(error.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
