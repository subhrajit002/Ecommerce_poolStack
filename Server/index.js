const express = require("express");
const Razorpay = require("razorpay"); // Keep this as Razorpay
const cors = require("cors");
const crypto = require("crypto");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    if (!req.body) {
      return res.status(400).send("Bad Request");
    }
    const options = req.body;
    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(400).send("Bad Request");
    }

    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
