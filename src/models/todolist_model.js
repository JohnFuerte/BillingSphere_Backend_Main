const mongoose = require("mongoose");

const TodolistSchema = new mongoose.Schema({
   
  user_id: {
    type: String,
    required: false,
  },
  TodolistTitle: {
    type: String,
    required: true,
  },
  Todolistdescription: {
    type: String,
    required: true,
  },
 
  TodoListEndDate: {
    type: Date,
    required: true,
    default: Date.now,
  }, 
  createdAt: {
    type: Date,
    required: false,
  },
  updatedAt: {
    type: Date,
    required: false,
  },
});

TodolistSchema.pre("save", function (next) {
  this.updateOn = new Date();
  this.createdOn = new Date();
  next();
});

module.exports = mongoose.model("Todolist", TodolistSchema);
