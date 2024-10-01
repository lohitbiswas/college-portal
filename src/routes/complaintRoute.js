const express = require('express');
const complaintController = require('../controllers/complaintController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Student registers a complaint 
router.post('/register', authMiddleware, complaintController.registerComplaint);

// Admin views all complaints 
router.get('/all', authMiddleware, complaintController.getAllComplaints);


router.put('/respond/:id', authMiddleware, complaintController.respondToComplaint);

module.exports = router;
