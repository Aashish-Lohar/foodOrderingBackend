const express = require("express");
const router = express.Router();
const asyncHandler=require('express-async-handler');
app = express();
const stripe = require('stripe')('sk_test_51MMW2PSARWQdi33XLmVEx64xS8hfJyBpdPc6TShnDiVDFZkvRGFFSyJ1BozvRB7juT92UelqJ3mc7iNi2u5oOXUd00XaQxqQgS');

router.post('/payment',async(req,res,next)=>{
    try {
        console.log(req.body.items[0].price);
        const session = await stripe.checkout.sessions.create({
            line_items: req.body.items.map((item)=>({
                price_data: {
                    currency: 'INR', 
                    product_data: {
                        name: item.food.name,
                        images: []
                    }, 
                    unit_amount: item.price*100
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
