var Item = require("../models/items_model");
var ItemGroup = require("../models/item_group_model");
var ItemsBrand = require("../models/item_brand_model");
var TaxRate = require("../models/tax_model");
var HSN = require("../models/hsn_code_model");
var BarcodePrint = require("../models/barcode_print_model");
var StoreLocation = require("../models/store_location_model");
var MeasurementLimit = require("../models/measurement_limit_model");
var SecondaryUnit = require("../models/secondaryunit_model");
var csv = require('csvtojson');
const { response } = require("../routes/excel_routes");
const CsvParser = require('json2csv').Parser;
const fs = require('fs');

const importExcel = async (req, res) => {
    try {
        var itemData = [];

        csv()
            .fromFile(req.file.path)
            .then(async (response) => {
                for (var x = 0; x < response.length; x++) {
                    // Assuming you have a mongoose model for itemGroup
                    let itemGroup = await ItemGroup.findOne({ name: response[x].itemGroup });
                    let itemBrand = await ItemsBrand.findOne({ name: response[x].itemBrand });
                    let taxRate = await TaxRate.findOne({ rate: response[x].taxCategory });
                    let hsnCode = await HSN.findOne({ hsn: response[x].hsnCode });
                    let barcodePrint = await BarcodePrint.findOne({ barcode: response[x].barcode });
                    let storeLocation = await StoreLocation.findOne({ location: response[x].storeLocation });
                    let measurementLimit = await MeasurementLimit.findOne({ measurement: response[x].measurementUnit });
                    let secondaryUnit = await SecondaryUnit.findOne({ secondaryUnit: response[x].secondaryUnit });

                    if (!itemGroup) {
                        // Create a new itemGroup if it doesn't exist
                        itemGroup = new ItemGroup({ name: response[x].itemGroup, desc: response[x].itemGroup });
                        await itemGroup.save();
                    }
                    if (!itemBrand) {
                        // Create a new itemGroup if it doesn't exist
                        itemBrand = new ItemsBrand({ name: response[x].itemBrand });
                        await itemBrand.save();
                    }
                    if (!taxRate) {
                        // Create a new itemGroup if it doesn't exist
                        taxRate = new TaxRate({ rate: response[x].taxCategory });
                        await taxRate.save();
                    }
                    if (!hsnCode) {
                        // Create a new itemGroup if it doesn't exist
                        hsnCode = new HSN({ hsn: response[x].hsnCode, updatedOn: new Date() });
                        await hsnCode.save();
                    }
                    if (!barcodePrint) {
                        // Create a new itemGroup if it doesn't exist
                        barcodePrint = new BarcodePrint({ barcode: response[x].barcode });
                        await barcodePrint.save();
                    }
                    if (!storeLocation) {
                        // Create a new itemGroup if it doesn't exist
                        storeLocation = new StoreLocation({ location: response[x].storeLocation });
                        await storeLocation.save();
                    }
                    if (!measurementLimit) {
                        // Create a new itemGroup if it doesn't exist
                        measurementLimit = new MeasurementLimit({ measurement: response[x].measurementUnit });
                        await measurementLimit.save();
                    }
                    if (!secondaryUnit) {
                        // Create a new itemGroup if it doesn't exist
                        secondaryUnit = new SecondaryUnit({ secondaryUnit: response[x].secondaryUnit });
                        await secondaryUnit.save();
                    }
                    itemData.push({
                        companyCode: response[x].companyCode,
                        itemGroup: itemGroup._id,
                        itemBrand: itemBrand._id,
                        itemName: response[x].itemName,
                        printName: response[x].printName,
                        codeNo: response[x].codeNo,
                        taxCategory: taxRate._id,
                        hsnCode: hsnCode._id,
                        barcode: barcodePrint._id,
                        storeLocation: storeLocation._id,
                        measurementUnit: measurementLimit._id,
                        secondaryUnit: secondaryUnit._id,
                        minimumStock: response[x].minimumStock,
                        maximumStock: response[x].maximumStock,
                        monthlySalesQty: response[x].monthlySalesQty,
                        date: response[x].date,
                        dealer: response[x].dealer,
                        subDealer: response[x].subDealer,
                        retail: response[x].retail,
                        mrp: response[x].mrp,
                        price: response[x].price,
                        openingStock: response[x].openingStock,
                        status: response[x].status,
                    });
                }
                // Assuming you have a mongoose model for Item
                await Item.insertMany(itemData);

                fs.unlink(req.file.path, (err) => {
                    if (err) {
                        console.error("Error removing file:", err);
                    } else {
                        console.log("File removed successfully");
                    }
                });

                res.send({ status: 200, success: true, msg: 'CSV Imported' });
            });
    } catch (error) {
        res.send({ status: 400, success: false, msg: error.message });
    }
};

const exportExcel = async (req, res) => {
    try {
        let items = [];
        var itemData = await Item.find({});

        itemData.forEach((item) => {
            const { _id, companyCode, itemGroup, itemBrand, itemName, printName, codeNo, taxCategory, hsnCode, barcode, storeLocation, measurementUnit, secondaryUnit, minimumStock, maximumStock, monthlySalesQty, date, dealer, subDealer, retail, mrp, price, openingStock, status } = item;
            items.push({ _id, companyCode, itemGroup, itemBrand, itemName, printName, codeNo, taxCategory, hsnCode, barcode, storeLocation, measurementUnit, secondaryUnit, minimumStock, maximumStock, monthlySalesQty, date, dealer, subDealer, retail, mrp, price, openingStock, status });
        });

        const csvFields = ['_id', 'companyCode', 'itemGroup', 'itemBrand', 'itemName', 'printName', 'codeNo', 'taxCategory', 'hsnCode', 'barcode', 'storeLocation', 'measurementUnit', 'secondaryUnit', 'minimumStock', 'maximumStock', 'monthlySalesQty', 'date', 'dealer', 'subDealer', 'retail', 'mrp', 'price', 'openingStock', 'status'];
        const csvParser = new CsvParser({ csvFields });
        const csvData = csvParser.parse(items);

        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=itemsData.csv");
        res.status(200).end(csvData);

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
};

module.exports = { importExcel, exportExcel };
