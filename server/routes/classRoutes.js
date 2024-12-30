// server/routes/classRoutes.js
const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');

// Route principale per ottenere tutte le classi
router.get('/', function(req, res) {    // NOTA: usa function(req, res) invece di un oggetto
    console.log('GET /api/classes route hit');
    console.log('Request headers:', req.headers);
    
    res.json({
        success: true,
        data: [
            {
                nome: "1",
                sezione: "A",
                annoScolastico: "2023/2024"
            }
        ]
    });
});

// Route di debug
router.get('/test', function(req, res) {   // NOTA: usa function(req, res)
    console.log('Test route hit');
    res.json({ message: 'Test route working' });
});

module.exports = router;
