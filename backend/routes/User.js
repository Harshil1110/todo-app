const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const router = express.Router();
const jwt = require("jsonwebtoken");

// user registration
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  //   console.log(email, password);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    User.create({ email, password: hashedPassword })
      .then((data) => {
        res.status(201).send(`User registered successfully.\n${data}`);
      })
      .catch((err) => {
        console.log(`Error in registering user:${err}`);
      });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
    // console.log(email, password);

  try {
    // check email is valid or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    // compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid password");
    }

    // generate a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
module.exports = router;
