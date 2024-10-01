const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT tokens
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header not found' });
    }

    const token = authHeader.split(' ')[1]; // Extract token from the "Bearer <token>" format

    if (!token) {
        return res.status(401).json({ message: 'Access token is missing' });
    }

    try {
        // Verify the token with the JWT_SECRET from the environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add the decoded user info to the request object

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;
