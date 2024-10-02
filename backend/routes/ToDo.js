const { Router } = require("express");
const router = Router();
const TODO = require("../models/ToDoModel");
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  // console.log(token);

  if (!token) return res.send("Token is required");
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.send("Invalid token");
    req.user = user;
    next();
  });
};

//get all the todos list
router.get("/list", authenticateToken, async (req, res) => {
  try {
    const toDos = await TODO.find({ userId: req.user.id });
    res.json(toDos);
  } catch (error) {
    console.error(`Error fetching todos: ${error}`);
    res.status(500).json({ message: "Server error" });
  }
});

//create todo
router.post("/create", authenticateToken, (req, res) => {
  const { todo } = req.body;
  // console.log(todo);

  try {
    TODO.create({ userId: req.user.id, todo })
      .then((data) => {
        res.status(201).send(`Todo list create successfully\n${data}`);
      })
      .catch((err) => {
        console.log(`Error in creating in todo:${err}`);
      });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//update todo by id
router.put("/update/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { todo, completed } = req.body;
  //   console.log(todo);

  try {
    TODO.findByIdAndUpdate(
      id,
      { userId: req.user.id, todo, completed },
      { new: true }
    )
      .then((data) => {
        res.send(`Todo updated successfully\n${data}`);
      })
      .catch((err) => {
        console.log(`Error in updating in todo:${err}`);
      });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//Delete todo by id
router.delete("/delete/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  // console.log(id);

  try {
    TODO.findOneAndDelete(id, { userId: req.user.id })
      .then((data) => {
        res.send(`Todo Deleted successfully.`);
      })
      .catch((err) => {
        console.log(`Error in deleting in todo:${err}`);
      });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
