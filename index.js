const sender = require("./services/scheduler");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const crypto = require('crypto');
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ متصل بقاعدة البيانات");

    sender();

    app.listen(process.env.PORT, () =>
      console.log(`🚀 الخادم يعمل على http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.log("❌ مشكلة في الاتصال بقاعدة البيانات:", err));
