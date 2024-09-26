// import user model
const UserModel = require("../models/user_model");

// Middleware to restrict access based on user type
function restrictAccessByUserType(allowedTypes) {
  return (req, res, next) => {
    const { userId } = req.params; // Assuming userId is available in the request
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Fetch user from database based on userId
    UserModel.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        // Check if user's type is allowed to access the route
        if (!allowedTypes.includes(user.usergroup)) {
          return res.status(403).json({
            message:
              "You don't have the admin priviledge to perform this action",
          });
        }

        // User is authorized, proceed to the next middleware/route handler
        next();
      })
      .catch((err) => {
        console.error("Error checking user type:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      });
  };
}

module.exports = restrictAccessByUserType;
