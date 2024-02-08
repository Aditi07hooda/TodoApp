import express from "express";
import { validateCreateTodo, validateUpdateTodo } from "./validationZod.js";
import { taskModel } from "./models/schemaModel.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const createTodo = async (req, res) => {
  const todoBody = req.body;
  const validateBody = validateCreateTodo.safeParse(todoBody);
  if (!validateBody.success) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  try {
    const createdTask = await taskModel.create({
      title: todoBody.title,
      description: todoBody.description || "",
      completionStatus: false,
      user: req.user._id,
    });
    res
      .status(201)
      .json({ message: "Task created successfully", task: createdTask });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateTodo = async (req, res) => {
  const updateTodoBody = req.body;
  const validateUpdatedBody = validateUpdateTodo.safeParse(updateTodoBody);
  if (!validateUpdatedBody.success) {
    return res.status(400).json({ message: "Invalid request body" });
  }
  const task = await taskModel.find({
    title: updateTodo.title,
    user: req.user._id,
  });
};

const deleteTodo = async (req, res) => {
  const { _id } = req.body;
  try {
    if (!_id) {
      res.send("Task not found");
      return;
    }
    const deletingTask = await taskModel.findOneAndDelete({
      _id,
      user: req.user._id, // Check if the TODO belongs to the authenticated user
    });
    if (!deletingTask) {
      res.send("Task is not deleted");
      return;
    }
    res.send("Task deleted");
  } catch (error) {
    console.log("Error:", error);
  }
};

const readTodo = async (req, res) => {
  try {
    const userId = req.user._id;
    const todoList = await taskModel.find({ user: userId });

    res.status(200).json({ todoList }); // Wrap todoList in an object

  } catch (error) {
    console.error("Error fetching TODOs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



const completeTodo = async (req, res) => {
  const { _id } = req.body;
  const validateUpdatedBody = validateUpdateTodo.safeParse({ _id });
  if (!validateUpdatedBody.success) {
    return res.status(400).json({ message: "Invalid request body" });
  }
  const taskFound = await taskModel.findOne({
    _id,
    user: req.user._id, // Check if the TODO belongs to the authenticated user
  });
  const taskCompletionStatus = !taskFound.completionStatus;
  await taskModel.findByIdAndUpdate(_id, {
    completionStatus: taskCompletionStatus,
  });
  if (taskCompletionStatus == true) {
    return res.send("Task marked as completed");
  }
  res.send("Task marked as pending");
};

export { createTodo, updateTodo, deleteTodo, readTodo, completeTodo };
