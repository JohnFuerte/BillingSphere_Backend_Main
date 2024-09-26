const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./user_model");

const NewCompanySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyCode: {
    type: String,
    required: false,
  },
  companyType: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
    required: false,
    default: "",
  },
  lstNo: {
    type: String,
    required: false,
    default: "",
  },
  cstNo: {
    type: String,
    required: false,
    default: "",
  },
  gstin: {
    type: String,
    required: false,

    default: "",
  },
  signatory: {
    type: String,
    required: false,
    default: "",
  },
  designation: {
    type: String,
    required: false,
    default: "",
  },
  pan: {
    type: String,
    required: false,
    default: "",
  },
  ewayBill: {
    type: String,
    required: false,
    default: "",
  },
  caching: {
    type: String,
    required: false,
    default: "",
  },
  taxation: {
    type: String,
    required: true,
  },
  acYear: {
    type: String,
    required: true,
  },
  acYearTo: {
    type: String,
    required: true,
  },
  tc1: {
    type: String,
    required: false,
  },
  tc2: {
    type: String,
    required: false,
  },
  tc3: {
    type: String,
    required: false,
  },
  tc4: {
    type: String,
    required: false,
  },
  tc5: {
    type: String,
    required: false,
  },
  logo1: [
    {
      data: {
        type: Buffer,
        required: true,
      },
      contentType: {
        type: String,
        required: true,
      },
      filename: {
        type: String,
        required: true,
      },
    },
  ],
  logo2: [
    {
      data: {
        type: Buffer,
        required: true,
      },
      contentType: {
        type: String,
        required: true,
      },
      filename: {
        type: String,
        required: true,
      },
    },
  ],
  signature: [
    {
      data: {
        type: Buffer,
        required: true,
      },
      contentType: {
        type: String,
        required: true,
      },
      filename: {
        type: String,
        required: true,
      },
    },
  ],
  stores: [
    {
      code: {
        type: String,
        required: false,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      bankName: {
        type: String,
        required: true,
      },
      branch: {
        type: String,
        required: true,
      },
      accountNo: {
        type: String,
        required: true,
      },
      accountName: {
        type: String,
        required: true,
      },
      upi: {
        type: String,
        required: true,
      },
      ifsc: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: false,
      },
      password: {
        type: String,
        required: false,
      },
    },
  ],
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
});

NewCompanySchema.pre("save", async function (next) {
  const randomNumber = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
  this.companyCode = randomNumber.toString();
  try {
    await Promise.all(
      this.stores.map(async (store) => {
        const storeCodeRandom =
          Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
        store.code = storeCodeRandom.toString();
        const user = new User({
          email: store.email,
          password: store.password,
          hintpassword: store.password,
          fullName: this.companyName + store.code,
          usergroup: "Admin",
          companies: [store.code],
        });
        await user.save();

        console.log(store.email);
      })
    );

    const companyUser = new User({
      email: this.email,
      password: this.password,
      hintpassword: this.password,
      fullName: this.companyName,
      usergroup: "Admin",
      companies: [this.companyCode],
    });
    await companyUser.save();

    next();
  } catch (error) {
    next(error);
  }
});

// Now write an update prehook and take the user name and password from the store and update the user in the user model

NewCompanySchema.pre(["update", "findOneAndUpdate", "updateOne"], async function (next) {
  try {
    const updatedFields = this.getUpdate();
    const companyCode = updatedFields.companyCode;
    const stores = updatedFields.stores || [];

    console.log("Updating company with code:", companyCode);

    // Update company user
    await User.findOneAndUpdate(
      { companies: companyCode },
      { email: updatedFields.email, password: updatedFields.password, hintpassword: updatedFields.password },
      { new: true }
    );

    console.log("Company updated successfully");

    // Update users associated with stores
    await Promise.all(
      stores.map(async (store) => {
        console.log("Updating store with code:", store.code);
        await User.findOneAndUpdate(
          { companies: store.code },
          { email: store.email, password: store.password, hintpassword: store.password },
          { new: true }
        );
        console.log("Store updated successfully");
      })
    );

    next();
  } catch (error) {
    console.error("Error updating company:", error);
    next(error);
  }
});


module.exports = mongoose.model("NewCompany", NewCompanySchema);
