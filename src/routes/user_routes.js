const UserRoutes = require("express").Router();
const UserController = require("../controllers/user_controller");
const restrictAccessByUserType = require("../middleware/restriction");
const verifyToken = require("../middleware/verifyToken");

UserRoutes.post("/createAccount", UserController.createAccount);
UserRoutes.post(
  "/createAccount2/:userId",
  restrictAccessByUserType(["Admin", "Owner"]),
  UserController.createAccount2
);
UserRoutes.post("/signIn", UserController.signIn);

UserRoutes.get("/getUser", verifyToken, UserController.getAllUser);
UserRoutes.get("/:id", UserController.getUserById);
UserRoutes.put("/update/:id", verifyToken, UserController.updateUser);
UserRoutes.delete("/delete-user/:id", verifyToken, UserController.deleteUser);

module.exports = UserRoutes;
