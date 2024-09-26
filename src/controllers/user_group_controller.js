const UserGroup = require("../models/user_group_model");

//For Creating User Group
const createUserGroup = async (req, res) => {
  try {
    const userGroup = await UserGroup.create(req.body);
    return res.json({
      success: true,
      message: "User Group Created",
      data: userGroup,
    });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};

//For updating User Group
const updateUserGroup = async (req, res) => {
  try {
    const userGroup = await UserGroup.updateOne(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!userGroup) {
      return res.json({ success: false, message: "User Group not found" });
    }
    return res.json({ success: true, data: userGroup });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};

//For Deleting User Group
const deleteUserGroup = async (req, res) => {
  try {
    const userGroup = await UserGroup.deleteOne({ _id: req.params.id });
    if (!userGroup) {
      return res.json({ success: false, message: "User Group not found" });
    }
    return res.json({
      success: true,
      message: "User Group Deleted Successfully!",
    });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};

const getAllUserGroup = async (req, res) => {
  try {
    const userGroup = await UserGroup.find({});
    return res.json({ success: true, data: userGroup });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};

const getSingleUserGroup = async (req, res) => {
  try {
    const userGroup = await UserGroup.findOne({ _id: req.params.id });
    if (!userGroup) {
      return res.json({ success: false, message: "User Group not found" });
    }
    return res.json({ success: true, data: userGroup });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};

module.exports = {
  createUserGroup,
  updateUserGroup,
  deleteUserGroup,
  getAllUserGroup,
  getSingleUserGroup,
};


