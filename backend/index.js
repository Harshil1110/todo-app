const express = require("express");
const app = express();
require("./db");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const todo = require("./routes/ToDo");
const user = require("./routes/User");
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);
app.use("/todo", todo);
app.use("/user", user);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
