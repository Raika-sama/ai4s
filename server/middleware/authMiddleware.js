// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Get the secret key from environment variables
const secretKey = process.env.JWT_SECRET;

// Check if the secret key is defined
if (!secretKey) {
    throw new Error("JWT_SECRET environment variable not defined.");
}

const authMiddleware = (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({ message: 'Autenticazione richiesta. Header mancante.' });
        }

        // Check if it follows Bearer scheme
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Formato token non valido. Utilizzare Bearer scheme.' });
        }

        const token = authHeader.split(' ')[1];
        
        // Verify token using the same secret key as in authRoutes.js
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        // Provide more specific error messages
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token scaduto. Effettua nuovamente il login.' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Token non valido.' });
        }
        res.status(401).json({ message: 'Errore di autenticazione.' });
    }
};

module.exports = authMiddleware;