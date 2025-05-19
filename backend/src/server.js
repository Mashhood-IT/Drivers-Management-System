
require("dotenv").config();
const express = require("express");
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const driverRoutes = require("./routes/driverRoutes");
const methodOverride = require("method-override");

app.use(express.json());
app.use(cors({
  origin: 'https://dms-frontend.netlify.app', // allow frontend to talk to backend
  credentials: true // only if you're using cookies or sessions
}));
app.use(methodOverride("_method")); 
app.use("/api/driver", driverRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error(err));
