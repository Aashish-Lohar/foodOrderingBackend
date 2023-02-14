const express = require("express");
const router = express.Router();
const asyncHandler=require('express-async-handler');
app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/payment',async(req,res,next)=>{
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: req.body.items.map((item)=>({
                price_data: {
                    currency: 'INR', 
                    product_data: {
                        name: item.food.name,
                        images: []
                    }, 
                    unit_amount: item.food.price*100
                },
                quantity: item.quantity,
            })),
            mode:"payment",
            success_url:"http://localhost:3000/success.html",
            cancel_url:"http://localhost:3000/cancel.html"
          });

          res.status(200).json(session);
        
    } catch (error) {
        next(error)
    }
})

module.exports = router;
