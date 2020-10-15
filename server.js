const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ Menssage: "Hello My beautiful Friends" });
});

app.listen(PORT, () => {
  console.log("Server is listennig on PORT:", PORT);
});
