const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
app.use(cors());

dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is Running");
});

app.use("/api/inventory", inventoryRoutes);

let PORT = process.env.PORT;
app.listen(PORT, console.log(`Server started on ${PORT}`));
