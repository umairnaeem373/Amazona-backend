import asyncHandler from "express-async-handler";
import Order from "../Models/orderModel.js";

// @dec Create New order
// @route  POST /api/orders
// @aceess Private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemPrice,
      taxPrice,
      totalPrice,
      shippingPrice
    });
    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @dec GET ORDER BY ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @dec  UPDATE ORDER TO PAID
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if(order){
    order.isPaid = true,
    order.paidAt = Date.now(),
    order.paymentResult = {
      id: req.body.id,
      status:  req.body.status,
      update_time :   req.body.update_time,
      email_address :  req.body.payer.email_address
    }

    const  updatedOrder = await order.save()
    res.json(updatedOrder)
  } else{
    res.status(404)
    throw new Error ('Order Not Found')
  }
  }
)

//@dec Get Logged in user orders
//@route GET /api/orders/myorders
//@access Privete
const getMyOrders= asyncHandler(async(req,res)=>{
  const orders =await Order.find({ user: req.user._id })
  res.json(orders)
  // .sort('-createdAt')
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found') }})



export { addOrderItems , getOrderById , updateOrderToPaid , getMyOrders , getOrders , updateOrderToDelivered };
