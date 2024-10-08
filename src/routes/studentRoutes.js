const express = require('express');
const studentController = require('../controllers/studentController');
const { createStudentValidator, loginStudentValidator } = require('../validators/studentValidator');
const validate = require('../middlewares/validate');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../config/multerConfig');


const router = express.Router();

router.post('/create', validate(createStudentValidator), studentController.createStudent);
router.post('/login', validate(loginStudentValidator), studentController.loginStudent);

router.post('/upload-photo', authMiddleware, upload.single('profilePhoto'), studentController.uploadProfilePhoto);

router.post('/refresh-token', studentController.refreshToken);
router.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: `Welcome to your profile, ${req.user.email}!` });
});
router.put('/profile/:id', authMiddleware, studentController.correctProfile);

module.exports = router;
