const Todolist = require("../models/todolist_model");
const createTodolist = async (req, res) => {
  try {
    const newTodolistData = req.body;

    // Handle image data if present
  

    const newTodolist = await Todolist.create(newTodolistData);
    res.json({ success: true, data: newTodolist });
  } catch (ex) {
    res.json({ success: false, message: ex });
  }
};

const getadminallTodoList = async (req, res) => {
    try {
      const allTodolist = await Todolist.find();
      res.json({ success: true, data: allTodolist });
    } catch (ex) {
      res.json({ success: false, message: ex });
    }
  };

  const getTodolistByuserId = async (req, res) => {
    try {
      const list = await Todolist.findById(req.params.user_id);
      if (list) {
        res.json({ success: true, data: list });
      } else {
        res.json({ success: false, message: "Item not found" });
      }
    } catch (ex) {
      res.json({ success: false, message: ex });
    }
  };

  const updateTodolist = async (req, res) => {
    try {
      const updatedlist = await Todolist.findByIdAndUpdate(
        { _id: req.params.todolistId },
        req.body,
        { new: true, runValidators: true }
      );
      if (updatedlist) {
        res.json({ success: true, data: updatedlist });
      } else {
        res.json({ success: false, message: "Item not found" });
      }
    } catch (ex) {
      res.json({ success: false, message: ex });
    }
  };

 
module.exports = {
    createTodolist,
    getadminallTodoList,
    getTodolistByuserId,
    updateTodolist,
  };