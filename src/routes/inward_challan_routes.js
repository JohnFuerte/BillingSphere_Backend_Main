const inwardChallanController = require('../controllers/inward_challan_controller');
const express = require('express');
const router = express.Router();

router.post('/create', inwardChallanController.createInwardChallan);
router.get('/inward_challans', inwardChallanController.getAllInwardChallans);
router.get('/inward_challan/:id', inwardChallanController.getInwardChallanByid);
router.patch('/inward_challan/:id', inwardChallanController.updateInwardChallan);
router.delete('/inward_challan/:id', inwardChallanController.deleteInwardChallan);

module.exports = router;
