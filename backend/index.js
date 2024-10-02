const express = require("express");
const app = express();
require("./db");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const path = require('path');
const todo = require("./routes/ToDo");
const user = require("./routes/User");
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use("/todo", todo);
app.use("/user", user);
app.use(express.static(path.join(__dirname, "build")));
// index file path
app.get("/*", (req, res) => {
  return res.status(200).sendFile(__dirname + "/build/index.html");
});
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
