const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
const inventoryRoutes = require("./routes/inventoryRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());

connectDB()
  .then((onFul) => console.log(onFul))
  .catch((onRej) => console.log(onRej));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is Running");
});

app.use("/api/user", userRoutes);
app.use("/api/inventory", inventoryRoutes);

let PORT = process.env.PORT;
app.listen(PORT, console.log(`Server started on ${PORT}`));
