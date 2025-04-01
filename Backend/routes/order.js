const express = require("express");
const Product = require("../models/Product");
const Order = require("../models/Order")

const router = express.Router();

router.post("/" , async ( req , res ) => {
    try {
        
        const order = new Order({
            ...req.body,
            userId: req.user.userId
        })
        await order.save();
        res.status(201).json({ message: "Order created", order });

    }catch(err){
        return res.status(400).json({message:err.message});
    }
});

router.get("/", async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.userId });
        res.json(orders);
    }catch (err) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/:id", async ( req , res ) => {
    try {
        const order = await Order.findById({_id:req.params.id , userId: req.user.UserId });
        if(!order) return res.status(404).json({ message: "Order not found"});
        res.json(order);
    }catch (err) {
        res.status(500).json({ message: error.message });
    }
})


module.exports = router ;


