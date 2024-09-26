const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  codeNumber: {
    type: Number,
    required: [true, "Please provide code number for this product."],
    trim: true,
    maxLength: [10, "Product code can not more than 10 character"],
  },
  itemBrand: {
    type: String,
    required: [true, "Please provide brand name for this product"],
    trim: true,
    maxLength: [50, "Brand name can not be more than 50 characters"],
  },
  itemName: {
    type: String,
    required: [true, "Please provide product name."],
    trim: true,
    maxLength: [50, "Product name cannot be more than 50 characters."],
  },
  productCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Please provide product category"],
  },
  priceCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Price",
    required: [true, "Please provide price Type"],
  },
  taxCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TaxRate",
    required: [true, "Please provide Tax rate "],
  },
  hsnCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HSN",
    default:''
  },
  storeLocation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StoreLocation",
    default:''
  },
  measurement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MeasurementLimit",
    default:''
  },
  secondaryUnit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SecondaryUnit",
    default:''
  },

  printName: {
    type: String,
    required: [true, "Please provide print name for this product."],
  },
  remarks: {
    type: String,
    default:''
    
  },
  barCodeSerialNumber:{
    type:String,
    default:''

  },
  price: {
    type: Number,
    required: [true, "Please provide price for this product."],
  },
  minimumStock: {
    type: Number,
    default:0,
  },
  maximumStock: {
    type: Number,
    default:0,
  },
  monthlySaleQuantity:{
    type: Number,
    default:0,
  },
  productImage:{
    type: Array,
    default:[],
  },
  openingStock:{
    type:String,
    default:"",
  },
  isActive:{
    type:String,
    default:'',

  }
  
});

const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;

