const BarcodePrint = require("../models/barcode_print_model");
const Barcode = require("jsbarcode");
const { createCanvas } = require("canvas");

const createBarcodePrint = async (req, res) => {
  try {
    const barcodePrint = await BarcodePrint.create(req.body);
    return res.json({
      success: true,
      message: "Barcode Print Created",
      data: barcodePrint,
    });
  } catch (ex) {
    res.json({ success: false, message: ex });
  }
};

// const createBarcodePrint = async (req, res) => {
//   try {
//     // Remove duplicate objects based on the barcode value
//     const uniqueItems = [];
//     const seen = new Set();
//     req.body.forEach((item) => {
//       const barcode = item.barcode;
//       if (!seen.has(barcode)) {
//         seen.add(barcode);
//         uniqueItems.push(item);
//       }
//     });

//     // Create barcode prints for the unique items
//     const createdBarcodePrints = await Promise.all(
//       uniqueItems.map(async (item) => await BarcodePrint.create(item))
//     );

//     return res.json({
//       success: true,
//       message: "Barcode Prints Created",
//       data: createdBarcodePrints,
//     });
//   } catch (ex) {
//     res.status(400).json({ success: false, message: ex.message });
//   }
// };

const createBarcodeImage = async (req, res) => {
  try {
    const numBarcodes = parseInt(req.params.numBarcodes); // Number of barcodes requested
    const barcodeValue = req.params.barcodeValue; // Barcode value to be used for all barcodes

console.log(numBarcodes, barcodeValue);

    const barcodeImages = [];
    for (let i = 0; i < numBarcodes; i++) {
      const canvas = createCanvas();
      Barcode(canvas, barcodeValue, {
        format: "CODE128",
        displayValue: true,
        fontSize: 20,
        margin: 10,
        width: 2,
        height: 100,
      });

      const buffer = canvas.toBuffer("image/png");
      const base64Image = buffer.toString("base64");
      
      barcodeImages.push(base64Image); // Store the Base64-encoded image
    }

    res.json({ success: true, barcodeImages }); // Send the array of Base64-encoded images
  } catch (ex) {
    res.status(400).json({ success: false, message: ex.message });
  }
};

// Fetch barcode by id
const getBarcodePrintById = async (req, res) => {
  try {
    const barcodePrint = await BarcodePrint.findById(req.params.id);
    return res.json({
      success: true,
      message: "Barcode Print Found",
      data: barcodePrint,
    });
  } catch (ex) {
    res.json({ success: false, message: ex });
  }
};



module.exports = {
  createBarcodePrint,
  createBarcodeImage,
  getBarcodePrintById,
};
