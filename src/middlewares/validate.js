const { ValidationError } = require('joi');

// Validate middleware to check the request body or parameters against the provided schema
const validate = (validator) => {
    return (req, res, next) => {
        const { error } = validator.validate(req.body || req.params);

        if (error) {
            return res.status(400).json({
                error: error.details.map(err => err.message).join(', '),
            });
        }

        next(); // If there are no errors, continue to the next middleware or controller
    };
};

module.exports = validate;
