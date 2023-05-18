import createError from "../utils/createError.js"
import  Order  from '../models/order.model.js';
import Gig from '../models/gig.model.js';
import Stripe from 'stripe';

export const intent = async (req, res,next) => {
    try
    {
        const stripe = new Stripe(process.env.STRIPE);
          const gig = await Gig.findById(req.params.id);
          const paymentIntent = await stripe.paymentIntents.create({
            amount: gig.price * 100,
            currency: "inr",
            automatic_payment_methods: {
              enabled: true,
            },
          });
           const newOrder = new Order({
             gigId: gig._id,
             img: gig.cover,
             title: gig.title,
             price: gig.price,
             sellerId: gig.userId,
             buyerId: req.userId,
             payment_intent: paymentIntent.id,
           });
           await newOrder.save();
           res.status(200).send(paymentIntent.client_secret);
    }
    catch(err){
        next(err);
    }
}


export const getOrders = async (req, res,next) => {
    try{
        console.log("hello");
        const orders = await Order.find({
            ...(req.isSeller?{sellerId:req.userId}:{buyerId:req.userId}),
            isCompleted:true
        })
        console.log(orders);
        res.status(200).send(orders);
    }
    catch(err){
        next(err);
    }

}