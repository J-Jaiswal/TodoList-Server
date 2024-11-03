const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const TaskModel = require("./models/Tasks.model");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/getTasks", async (req, res) => {
  try {
    const todos = await TaskModel.find({});
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await TaskModel.findByIdAndUpdate(id, { done: true });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Error updating task", details: error });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await TaskModel.findByIdAndDelete(id);

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Error updating task", details: error });
  }
});

app.post("/add", async (req, res) => {
  try {
    const todo = req.body;
    const newTodo = new TaskModel(todo);
    await newTodo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://jayeshjaiswal2510:KArAG2FHXEPJM9Vx@tasks.ak1un.mongodb.net/todos?retryWrites=true&w=majority&appName=Tasks"
  )
  .then(() => {
    console.log("Connected with Database");
    app.listen(5000, () => {
      console.log("Server runnning on port number 5000 ");
    });
  })
  .catch((error) => {
    console.log("Database connection Failed ", error);
  });

// database password -> KArAG2FHXEPJM9Vx
