const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const TodoListController = require("../controllers/test_controller");
const verifyToken = require("../middleware/verifyToken");

// Create an item
router.post(
  "/create-todolist",
  verifyToken,
  TodoListController.createTodolist
);

// Get all todolist for admin
router.get("/get-admin-all", verifyToken, TodoListController.getadminallTodoList);

// Get a specific todolist by user_ID
router.get("/get-todolist/:userId", verifyToken, TodoListController.getTodolistByuserId);

// Update a specific todoList by ID
router.put("/update-item/:todolistId", verifyToken, TodoListController.updateTodolist);
 

module.exports = router;
