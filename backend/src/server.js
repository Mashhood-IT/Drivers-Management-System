
require("dotenv").config();
const express = require("express");
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const driverRoutes = require("./routes/driverRoutes");
const methodOverride = require("method-override");

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN, 
  credentials: true 
}));
app.use(methodOverride("_method")); 
app.use("/api/driver", driverRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((err) => console.error(err));
