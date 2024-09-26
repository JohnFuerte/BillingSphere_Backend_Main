const { Schema, model } = require("mongoose");
const uuid = require("uuid");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    id: { type: String, unique: true },
    fullName: { type: String, default: "", required: true },
    email: { type: String, unique: true, required: true },
    usergroup: { type: String, default: 'Clerk' },
    dashboardAccess: { type: String, default: "Yes" },
    dashboardCategory: { type: String, default: "Yes" },
    backDateEntry: { type: String, default: "Yes" },
    companies: [{ type: String, ref: 'NewCompany', default: null }],
    password: { type: String, required: true },
    hintpassword: { type: String, required: false },
    updatedOn: { type: Date },
    creatededOn: { type: Date },
});

userSchema.pre("save", function (next) {
    this.id = uuid.v1();
    this.updatedOn = new Date();
    this.createdOn = new Date();
    //For Hashing the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    next();
});

// userSchema.pre(["update", "findOneAndUpdate", "updateOne"], function (next) {
//     const update = this.getUpdate();
//     delete update._id;
//     delete update.id;
//     this.updatedOn = new Date();
//     next();
// });

userSchema.pre(["update", "findOneAndUpdate", "updateOne"], function (next) {
    const update = this.getUpdate();
    if (update.password) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(update.password, salt);
        update.password = hash;
    }
    update.updatedOn = new Date();
    this.id = uuid.v1(); // Generate a new UUID

    next();
});

const UserModel = model("User", userSchema);
module.exports = UserModel;


