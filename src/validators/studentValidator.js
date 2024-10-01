const Joi = require('joi');

// Validator for creating a student
const createStudentValidator = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
    }),
    name: Joi.string().min(3).max(30).required().messages({
        'string.min': 'Name should have a minimum length of 3 characters',
        'string.max': 'Name should have a maximum length of 30 characters',
        'any.required': 'Name is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password should have a minimum length of 6 characters',
        'any.required': 'Password is required'
    })
});

// Validator for logging in a student
const loginStudentValidator = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required'
    })
});

// Validator for updating a student's profile
const updateProfileValidator = Joi.object({
    profileData: Joi.string().required().messages({
        'any.required': 'Profile data is required'
    })
});

module.exports = {
    createStudentValidator,
    loginStudentValidator,
    updateProfileValidator
};
