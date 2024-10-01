const expres = require("express");
const app = expres();
require("./db");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const todo = require("./routes/ToDo");
app.use(expres.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use("/todo", todo);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
