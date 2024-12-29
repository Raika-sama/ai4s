const express = require('express');
const router = express.Router();
const Class = require('../models/Class');
const { authMiddleware } = require('../middleware/authMiddleware');
const classController = require('../controllers/classController');

// Debug route
router.get('/test', (req, res) => {
    res.json({ message: "Class route working" });
});

// GET /api/classes - Ottieni tutte le classi
router.get('/', authMiddleware, async (req, res) => {
    try {
        console.log('1. Route /api/classes chiamata');
        console.log('2. User autenticato:', req.user);
        
        // Verifica che il modello sia disponibile
        console.log('3. Class model:', typeof Class);
        
        // Query per ottenere le classi della scuola dell'utente autenticato
        const classes = await Class.find({ scuola: req.user.school })
            .populate('docenti', 'nome cognome email')
            .populate('studenti', 'nome cognome email')
            .populate('createdBy', 'nome cognome')
            .lean()
            .exec();
            
        console.log('6. Query completata, classi trovate:', classes.length);

        res.json({
            success: true,
            data: classes
        });
    } catch (error) {
        console.error('ERRORE DETTAGLIATO:', {
            message: error.message,
            stack: error.stack,
            code: error.code,
            name: error.name
        });

        res.status(500).json({
            success: false,
            message: 'Errore nel recupero delle classi',
            debug: {
                errorMessage: error.message,
                errorName: error.name
            }
        });
    }
});

// GET /api/classes/:id - Ottieni una classe specifica
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const classe = await Class.findOne({ 
            _id: req.params.id,
            scuola: req.user.school 
        })
        .populate('docenti', 'nome cognome email')
        .populate('studenti', 'nome cognome email')
        .populate('createdBy', 'nome cognome');

        if (!classe) {
            return res.status(404).json({
                success: false,
                message: 'Classe non trovata'
            });
        }

        res.json({
            success: true,
            data: classe
        });
    } catch (error) {
        console.error('Errore nel recupero della classe:', error);
        res.status(500).json({
            success: false,
            message: 'Errore nel recupero della classe',
            error: error.message
        });
    }
});

// POST /api/classes - Crea una nuova classe
router.post('/', authMiddleware, async (req, res) => {
    try {
        // Verifica se esiste già una classe con lo stesso nome e sezione nella scuola
        const existingClass = await Class.findOne({
            nome: req.body.nome,
            sezione: req.body.sezione,
            scuola: req.user.school,
            annoScolastico: req.body.annoScolastico
        });

        if (existingClass) {
            return res.status(400).json({
                success: false,
                message: 'Esiste già una classe con questo nome e sezione per questo anno scolastico'
            });
        }

        const newClass = new Class({
            ...req.body,
            scuola: req.user.school,
            createdBy: req.user.userId
        });

        await newClass.save();

        const populatedClass = await Class.findById(newClass._id)
            .populate('docenti', 'nome cognome email')
            .populate('studenti', 'nome cognome email')
            .populate('createdBy', 'nome cognome');

        res.status(201).json({
            success: true,
            message: 'Classe creata con successo',
            data: populatedClass
        });
    } catch (error) {
        console.error('Errore nella creazione della classe:', error);
        res.status(500).json({
            success: false,
            message: 'Errore nella creazione della classe',
            error: error.message
        });
    }
});

// PUT /api/classes/:id - Aggiorna una classe
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        // Verifica se la classe appartiene alla scuola dell'utente
        const classe = await Class.findOne({
            _id: req.params.id,
            scuola: req.user.school
        });

        if (!classe) {
            return res.status(404).json({
                success: false,
                message: 'Classe non trovata'
            });
        }

        // Verifica se il nuovo nome/sezione crea un duplicato
        if (req.body.nome || req.body.sezione) {
            const existingClass = await Class.findOne({
                nome: req.body.nome || classe.nome,
                sezione: req.body.sezione || classe.sezione,
                scuola: req.user.school,
                annoScolastico: req.body.annoScolastico || classe.annoScolastico,
                _id: { $ne: req.params.id }
            });

            if (existingClass) {
                return res.status(400).json({
                    success: false,
                    message: 'Esiste già una classe con questo nome e sezione per questo anno scolastico'
                });
            }
        }

        const updatedClass = await Class.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        )
        .populate('docenti', 'nome cognome email')
        .populate('studenti', 'nome cognome email')
        .populate('createdBy', 'nome cognome');

        res.json({
            success: true,
            message: 'Classe aggiornata con successo',
            data: updatedClass
        });
    } catch (error) {
        console.error('Errore nell\'aggiornamento della classe:', error);
        res.status(500).json({
            success: false,
            message: 'Errore nell\'aggiornamento della classe',
            error: error.message
        });
    }
});

// DELETE /api/classes/:id - Elimina una classe
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const classe = await Class.findOneAndDelete({
            _id: req.params.id,
            scuola: req.user.school
        });

        if (!classe) {
            return res.status(404).json({
                success: false,
                message: 'Classe non trovata'
            });
        }

        res.json({
            success: true,
            message: 'Classe eliminata con successo'
        });
    } catch (error) {
        console.error('Errore nell\'eliminazione della classe:', error);
        res.status(500).json({
            success: false,
            message: 'Errore nell\'eliminazione della classe',
            error: error.message
        });
    }
});

// POST /api/classes/:id/students - Aggiungi studenti alla classe
router.post('/:id/students', authMiddleware, async (req, res) => {
    try {
        const classe = await Class.findOneAndUpdate(
            { _id: req.params.id, scuola: req.user.school },
            { $addToSet: { studenti: { $each: req.body.studentIds } } },
            { new: true }
        )
        .populate('docenti', 'nome cognome email')
        .populate('studenti', 'nome cognome email')
        .populate('createdBy', 'nome cognome');

        if (!classe) {
            return res.status(404).json({
                success: false,
                message: 'Classe non trovata'
            });
        }

        res.json({
            success: true,
            message: 'Studenti aggiunti con successo',
            data: classe
        });
    } catch (error) {
        console.error('Errore nell\'aggiunta degli studenti:', error);
        res.status(500).json({
            success: false,
            message: 'Errore nell\'aggiunta degli studenti',
            error: error.message
        });
    }
});

// DELETE /api/classes/:id/students/:studentId - Rimuovi uno studente dalla classe
router.delete('/:id/students/:studentId', authMiddleware, async (req, res) => {
    try {
        const classe = await Class.findOneAndUpdate(
            { _id: req.params.id, scuola: req.user.school },
            { $pull: { studenti: req.params.studentId } },
            { new: true }
        )
        .populate('docenti', 'nome cognome email')
        .populate('studenti', 'nome cognome email')
        .populate('createdBy', 'nome cognome');

        if (!classe) {
            return res.status(404).json({
                success: false,
                message: 'Classe non trovata'
            });
        }

        res.json({
            success: true,
            message: 'Studente rimosso con successo',
            data: classe
        });
    } catch (error) {
        console.error('Errore nella rimozione dello studente:', error);
        res.status(500).json({
            success: false,
            message: 'Errore nella rimozione dello studente',
            error: error.message
        });
    }
});

module.exports = router;