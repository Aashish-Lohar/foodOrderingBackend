const express=require('express');
const router=express.Router();
const asyncHandler=require('express-async-handler');
const auth = require('../middleware/checkAuth');
const orderStatus = require('../orderStatus');
const orderModel = require('../models/orderModel');

router.use(auth);
router.post('/orders/create',asyncHandler(
    async(req,res)=>{
        const requestOrder = req.body;
        // console.log('request order',requestOrder)

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
        // console.log('order',newOrder)
        res.send(newOrder);

    }
))

router.get('/orders/newOrderFromCurrentUser',asyncHandler(
    async(req,res)=>{
        const order = await orderModel.findOne({user:req.user.id, status:orderStatus.NEW});
        if(order) res.send(order);
        else res.status(400).send();
    }
))

module.exports= router;