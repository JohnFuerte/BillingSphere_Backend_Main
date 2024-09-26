
const express = require("express");
const ExcelRoutes = express();

const ExcelExportController = require("../controllers/excel_controller");

const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

ExcelRoutes.use(bodyParser.urlencoded({ extended: true }));
ExcelRoutes.use(express.static(path.resolve(__dirname, 'public')));

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)

    }
});
var upload = multer({ storage: storage });

ExcelRoutes.post('/importItem', upload.single('file'), ExcelExportController.importExcel);

ExcelRoutes.get("/export-to-excel-item", ExcelExportController.exportExcel);

module.exports = ExcelRoutes;
