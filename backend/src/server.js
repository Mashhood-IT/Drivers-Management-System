
  require("dotenv").config();
  const express = require("express");
  const cors = require('cors');
  const app = express();
  const mongoose = require("mongoose");
  const driverRoutes = require("./routes/driverRoutes");
  const {createAdminIfNotExists}= require("./controller/userController")
 const authRoutes = require("./routes/authRoutes")
  app.use(express.json());
  app.use(cors({
    origin: process.env.FRONTEND_ORIGIN, 
    credentials: true 
  }));
  app.use("/api/driver", driverRoutes);
  app.use("/api/auth", authRoutes);

  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("db connected")
      app.listen(process.env.PORT , () =>{
        createAdminIfNotExists()
        console.log("port connected")
      });
    })
    .catch((err) => console.error(err));
