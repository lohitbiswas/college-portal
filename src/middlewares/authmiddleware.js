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
       
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(`${JSON.stringify(decoded)}`);
        req.user = decoded;
        req.body = { ...req.body, newField: 'newValue' };

        next(); 
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;
