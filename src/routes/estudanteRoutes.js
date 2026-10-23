const express = require('express');
const router = express.Router();
const  EstudantesController = require('../controllers/EstudanteController');

router.get('/estudante', EstudantesController.listarTodos);
router.get('/estudante/:id', EstudantesController.listarPorId);
router.post('/estudante', EstudantesController.salvar);
router.put('/estudante/:id', EstudantesController.editar);
router.delete('/estudante/:id', EstudantesController.deletar);

module.exports = router;