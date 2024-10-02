const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://ranaharshil557:harshil123@cluster0.fwleu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((err) => {
    console.log("Database is not connected.");
  });

module.exports = mongoose;
