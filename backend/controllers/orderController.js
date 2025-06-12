import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'

//gateway initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//global variables
const deliveryChanrges = 10

//placing orders using COD Method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "order placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: true, message: "error" });
  }
};

//placing orders using stripe method
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const {origin} = req.headers
    console.log(origin);
    
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100
      },
       quantity: item.quantity,
    }))
     line_items.push({
      price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: deliveryChanrges * 100
            },
            quantity: 1
     })

     const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: "payment"
        })

         res.json({success: true, session_url: session.url})
  } catch (error) {
    console.log(error);
    res.json({ success: true, message: "error" });
  }

};

//verify stripe route
const verifyStripe = async(req, res) => {
  const {orderId, success, userId} = req.body
  try {
    if (success === 'true') {
      await orderModel.findByIdAndUpdate(orderId, {payment: true, paymentMethod:'Stripe'})
      await userModel.findByIdAndUpdate(userId, {cartData: {}})
      res.json({success:true, message:'paid'})
    }
    else{
      await orderModel.findByIdAndDelete(orderId)
        res.json({success: false, message: "Not Paid"})
    }
  } catch (error) {
    console.log(error)
    res.json({success:false, message:'error'})
  }
}

//placing orders using razor pay method
const placeOrderRazorpay = async (req, res) => {};

//all orders data for admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//user orders data for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "no data" });
  }
};

//update orders status from admin panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "status updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe
};
