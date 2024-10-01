const { Router } = require("express");
const router = Router();
const TODO = require("../models/ToDoModel");

//get all the todos list
router.get("/list", async (req, res) => {
  const toDos = await TODO.find();
  res.json(toDos);
});

//create todo
router.post("/create", (req, res) => {
  const { todo } = req.body;
  // console.log(todo);

  TODO.create({ todo })
    .then((data) => {
      res.status(201).send(`Todo list create successfully\n${data}`);
    })
    .catch((err) => {
      console.log(`Error in creating in todo:${err}`);
    });
});

//update todo by id
router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { todo, completed } = req.body;
  //   console.log(todo);

  TODO.findByIdAndUpdate(id, { todo, completed }, { new: true })
    .then((data) => {
      res.send(`Todo updated successfully\n${data}`);
    })
    .catch((err) => {
      console.log(`Error in updating in todo:${err}`);
    });
});

//Delete todo by id
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);

  TODO.findByIdAndDelete(id)
    .then((data) => {
      res.send(`Todo Deleted successfully.`);
    })
    .catch((err) => {
      console.log(`Error in deleting in todo:${err}`);
    });
});

module.exports = router;
