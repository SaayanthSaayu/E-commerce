const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req,res) => {

    try {
        const user = new User(req.body);
        await user.save();
        res.send("User created");
    }catch (err){
        res.status(400).send(err.message);
    }
    
});


router.post("/login",async (req,res) => {

    try{
        const { email , password } = req.body;
        const user = await User.findOne({email});

        if(!user || !(await bcrypt.compare( password , user.password))){
            return res.status(400).send("Invalid email or password");
        } 

        const token = jwt.sign(
          { userId: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        res.json({ msg: "Login succes", token: token, role: user.role , username: user.username ,userId: user._id});
    }catch(err){
        res.status(400).send(err.message);
    }
});


router.post("/logout", (req,res) => {
    res.json({ msg: "Logged out successfully" });
})

module.exports = router;