const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/Product");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");


router.post("/product-upload", upload , async ( req , res ) => {
    try {
        const { productname, price, description, category, stock } = req.body;
        const products = new Product({
            productname,
            price,
            description,
            category,
            stock,
            clientId: req.user.userId,
            image: req.file.filename,
        })
        await products.save();
        res.json({msg:"product sub,itted for approval"})
    }catch (err ) {
        res.json({msg:"error"+err})
    }
});

router.get("/product/pending", async ( req , res ) => {
    try{
        const products = await Product.find({clientId: req.user.userId , status: "pending"});
        res.json(products);
    }catch(err){
        res.json({msg:"error"+err})
    }
});

router.get("/product/approved", async (req, res) => {
  try {
    const products = await Product.find({
      clientId: req.user.userId,
      status: "approved",
    });
    res.json(products);
  } catch (err) {
    res.json({ msg: "error" + err });
  }
});

router.get("/product/rejected", async (req, res) => {
  try {
    const products = await Product.find({
      clientId: req.user.userId,
      status: "rejected",
    });
    res.json(products);
  } catch (err) {
    res.json({ msg: "error" + err });
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({
      clientId: req.user.userId,
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});





module.exports = router;



