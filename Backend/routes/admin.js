const express = require("express");
const router = express.Router();
const User = require("../models/User");
const multer = require("multer");
const Product = require("../models/Product");
const Order = require("../models/Order");



const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
})

const upload = multer({ storage: storage }).single("image");


router.post("/add-product", upload, async (req, res) => {

    try{
        const { productname, price, description,  category, stock } = req.body;
        const product = new Product({
          productname,
          price,
          image: req.file.filename,
          description,
          category,
          stock,
          status: "approved",
        });

        await product.save();
        res.status(201).json({ message: "Product created", product });
    } catch (error) {
        res.status(500).json({ message: "Error creating product" });
    }

});

router.get("/pending-product", async ( req , res ) => {
    try{
        const products = await Product.find({ status: "pending" }).populate('clientId', 'email');
        res.status(200).json({ products });
    }catch(err) {
        res.status(400).json({ msg: "error" + err });
    }
});


router.put("/products/:id/approve", async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, { status: "approved" }, { new: true });
    res.json({ message: "Product approved" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.put("/products/:id/reject", async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, { status: "rejected" }, { new: true });
    res.json({ message: "Product rejected" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.get("/user-list", async ( req , res ) => {
    try {
        const users = await User.find({role:"user"});
        res.json(users);
    }catch(err){
        console.error(err);
    }
});

router.get("/client-list", async (req, res) => {
  try {
    const users = await User.find({ role: "client" });
    res.json(users);
  } catch (err) {
    console.error(err);
  }
});



router.get("/client-products/:clientId", async (req, res) => {
    try {
        const products = await Product.find({ clientId: req.params.clientId });
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching client products" });
    }
});


router.get("/users-orders", async (req, res) => {
  try {
    const usersWithOrders = await User.find({ role: "user" }).lean();

    const orders = await Order.find().populate("userId", "name email");

    const userOrders = usersWithOrders.map((user) => {
      return {
        ...user,
        orders: orders.filter(
          (order) => order.userId._id.toString() === user._id.toString()
        ),
      };
    });

    res.json(userOrders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users and orders", error });
  }
});




module.exports = router ;

