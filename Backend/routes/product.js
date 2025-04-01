const express = require('express');
const Product = require('../models/Product');


const router = express.Router();

router.get("/", async ( req , res ) => {
    try{
        const products = await Product.find({ status: "approved" } );
        res.json(products);
    }catch(err) {
        res.status(400).json({ msg : err.message });
    }
});

router.get("/:id", async ( req , res ) => {
    try{

        const product = await Product.findById(req.params.id)
        res.json({product});
    }catch (err) {
        res.status(400).json({msg: err.message});
    }
})

module.exports = router;