const NewCompany = require("../models/new_company_model");
const User = require("../models/user_model");

//For Creating New Company
const createNewCompany = async (req, res) => {
  try {

    const newComp = req.body;


    console.log(newComp);

    // Handle image data if present
    if (newComp.logo1 && newComp.logo1.length > 0) {
      newComp.logo1 = newComp.logo1.map((image) => ({
        data: Buffer.from(image.data, "base64"),
        contentType: image.contentType,
        filename: image.filename,
      }));
    }
    if (newComp.logo2 && newComp.logo2.length > 0) {
      newComp.logo2 = newComp.logo2.map((image) => ({
        data: Buffer.from(image.data, "base64"),
        contentType: image.contentType,
        filename: image.filename,
      }));
    }

    const company = await NewCompany.create(newComp);

    return res.json({ success: true, message: "Company Created", data: company });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};

//For updating Company
const updateNewCompany = async (req, res) => {
  try {
    const newItemData = req.body;
    const storesLength = newItemData.stores.length;
    const companyId = newItemData.id;

    const prevCompanyData = await NewCompany.findOne({ _id: companyId });
    const prevCompanyDataStores = prevCompanyData.stores;
    const prevCompanyDataStoresLength = prevCompanyData.stores.length;

    // Compare the content of stores arrays
    const newStores = newItemData.stores.filter(store => !prevCompanyDataStores.includes(store));
    const deletedStores = prevCompanyDataStores.filter(store => !newItemData.stores.includes(store));
    // Add random code to new stores


    const storeCodeRandom =
      Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

    if (newStores.length > 0) {
      newStores.forEach(store => {
        if (!store.code) {
          store.code = storeCodeRandom.toString();
        }
      });
    }

    // Create new user for new stores
    if (storesLength > prevCompanyDataStoresLength) {
      const lastStore = newStores[newStores.length - 1]; // Get the last store
      await User.create({
        fullName: lastStore.address,
        email: lastStore.email,
        password: lastStore.password, // Remember to hash the password before storing it
        hintpassword: lastStore.password,
        companies: lastStore.code ?? Math.random().toString(), // Consider using uuid() to generate a unique code
        usergroup: "Admin"
      });
    }

    // Handle image data if present
    if (newItemData.logo1 && newItemData.logo1.length > 0) {
      newItemData.logo1 = newItemData.logo1.map((image) => ({
        data: Buffer.from(image.data, "base64"),
        contentType: image.contentType,
        filename: image.filename,
      }));
    }
    if (newItemData.logo2 && newItemData.logo2.length > 0) {
      newItemData.logo2 = newItemData.logo2.map((image) => ({
        data: Buffer.from(image.data, "base64"),
        contentType: image.contentType,
        filename: image.filename,
      }));
    }

    const updatedNewCom = await NewCompany.findByIdAndUpdate(
      req.params.id,
      newItemData,
      { new: true, runValidators: true }
    );

    if (updatedNewCom) {
      res.json({ success: true, data: updatedNewCom });
    } else {
      res.json({ success: false, message: "New Company not found" });
    }

  } catch (ex) {
    res.json({ success: false, message: ex });
  }
}


//For Deleting Company
const deleteNewCompany = async (req, res) => {
  try {
    const company = await NewCompany.deleteOne({ _id: req.params.id });
    if (!company) {
      return res.json({ success: false, message: "Company not found" });
    }
    return res.json({ success: true, message: "Company Deleted Successfully!" });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};

const getAllCompany = async (req, res) => {
  try {
    const company = await NewCompany.find({});
    return res.json({ success: true, data: company });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};

const getSingleCompany = async (req, res) => {
  try {
    const company = await NewCompany.findById(req.params.id);
    if (!company) {
      return res.json({ success: false, message: "Company not found" });
    }
    return res.json({ success: true, data: company });
  } catch (ex) {
    return res.json({ success: false, message: ex });
  }
};

module.exports = {
  createNewCompany,
  updateNewCompany,
  deleteNewCompany,
  getAllCompany,
  getSingleCompany,
};


