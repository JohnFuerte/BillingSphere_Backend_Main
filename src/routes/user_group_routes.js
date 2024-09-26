const UserRoutes = require("express").Router();
const UserGroupController = require("../controllers/user_group_controller");
const verifyToken = require("../middleware/verifyToken");
const restrictAccessByUserType = require("../middleware/restriction");

UserRoutes.post(
  "/create-user-group",
  verifyToken,
  // restrictAccessByUserType(["Admin", "Manager"]),
  UserGroupController.createUserGroup
);

UserRoutes.patch(
  "/update-user-group/:id",
  verifyToken,
  // restrictAccessByUserType(["Admin", "Manager"]),
  UserGroupController.updateUserGroup
);

UserRoutes.delete(
  "/delete-user-group/:id",
  verifyToken,
  // restrictAccessByUserType(["Admin", "Manager"]),
  UserGroupController.deleteUserGroup
);

UserRoutes.get(
  "/get-all-user-group",
  verifyToken,
  // restrictAccessByUserType(["Admin", "Manager"]),
  UserGroupController.getAllUserGroup
);

// Get single user group
UserRoutes.get(
  "/get-single-user-group/:id",
  verifyToken,
  // restrictAccessByUserType(["Admin", "Manager"]),
  UserGroupController.getSingleUserGroup
);

module.exports = UserRoutes;


