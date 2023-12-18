const express = require("express");
const app = express();
const port = 8000;


app.use(express.json())




app.get("/:name", (req, res) => {
  const data = req.params.name;
  console.log(data)
//   if (data) {
//     console.log(data.name);
//     res.send("Hi I am Server backend");
//   }
res.send("Hi "+data);

});

app.listen(port, () => {
  console.log(`app is running on ${port}`);
});
