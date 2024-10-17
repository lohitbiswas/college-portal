const express = require('express');
const studentController = require('../controllers/studentController');
const { createStudentValidator, loginStudentValidator } = require('../validators/studentValidator');
const validate = require('../middlewares/validate');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../config/multerConfig');
const passport = require('passport');


const router = express.Router();

router.post('/create', validate(createStudentValidator), studentController.createStudent);
router.post('/login', validate(loginStudentValidator), studentController.loginStudent);

router.post('/upload-photo', authMiddleware, upload.single('profilePhoto'), studentController.uploadProfilePhoto);

// Auth 2.0
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// router.get('/auth/google', (req, res, next) => {
//     console.log('Google auth route hit');
//     passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
// });

// remember to note why the first router falses but after adding a middlware works?????
router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login'}),
    
    studentController.googleLogin 
);



router.post('/refresh-token', studentController.refreshToken);
router.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: `Welcome to your profile, ${req.user.email}!` });
});
router.put('/profile/:id', authMiddleware, studentController.correctProfile);

module.exports = router;
