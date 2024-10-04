const express = require('express');
const adminController = require('../controllers/adminController');
const { createAdminValidator, loginAdminValidator } = require('../validators/adminValidator');
const validate = require('../middlewares/validate');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../config/multerConfig');

const router = express.Router();

router.post('/create', validate(createAdminValidator), adminController.createAdmin);
router.post('/login', validate(loginAdminValidator), adminController.loginAdmin);
router.post('/refresh-token',adminController.refresh_Token);

router.post('/upload-photo',authMiddleware,upload.single('profilephoto'),adminController.uploadProfilePhoto);

router.get('/get-all-students', authMiddleware, adminController.getAllStudents);
router.get('/get-student-by-id/:id', authMiddleware, adminController.getStudentbyId);
router.get('/get-student-by-email/:email', authMiddleware, adminController.getstudentbyemail);
router.put('/update/:id',authMiddleware,adminController.updateStudent);
router.put('/updateProfile/:id',authMiddleware,adminController.updateStudentprofile);

module.exports = router;
