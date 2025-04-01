
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const adminRoute = require("./routes/admin");
const { verifyToken, isAdmin ,isClient } = require("./middleware/uauth");
const orderRoute = require("./routes/order")
const clientRoutes = require("./routes/client.js")
const productRoute = require("./routes/product");
require("dotenv").config();



const app = express();
app.use(express.json()); 
app.use(cors())

app.use("/uploads", express.static("uploads"));

app.use("/user",userRoute);
app.use("/products",productRoute);
app.use("/client", verifyToken, isClient, clientRoutes);
app.use("/orders", verifyToken, orderRoute);
app.use("/admin", verifyToken , isAdmin , adminRoute);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to DB", err));



app.listen(1212, () => {
  console.log("Server is running on port 1212");
});
