const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB=require("./config/db");

const inventoryRoutes = require("./routes/inventoryRoutes");

const app = express();
app.use(cors());

dotenv.config();
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is Running");
});

app.use("/api/inventory", inventoryRoutes);

let PORT = process.env.PORT;
app.listen(PORT, console.log(`Server started on ${PORT}`));
