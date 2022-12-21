const express=require('express');
const router=express.Router();
const asyncHandler=require('express-async-handler');
const auth = require('../middleware/checkAuth');
const orderStatus = require('../orderStatus');
const orderModel = require('../models/orderModel');

router.use(auth);
router.post('/create',asyncHandler(
    async(req,res)=>{
        const requestOrder = req.body;

        if(requestOrder.items.length<=0){
            res.status(400).send('Cart is empty');
            return;
        }

        await orderModel.deleteOne({
            user:req.user.id,
            status:orderStatus.NEW
        })

        const newOrder = new orderModel({...requestOrder, user:req.user.id});
        await newOrder.save();
        res.send(newOrder);

    }
))

module.exports= router;