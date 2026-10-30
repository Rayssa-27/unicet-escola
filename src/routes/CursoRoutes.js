const express = require('express');
const router = express.Router();
const CursoController = require('../controllers/CursoController');

router.get('/cursos', CursoController.listarTodos);
router.get('/cursos/:id', CursoController.listarPorId);
router.post('/cursos', CursoController.salvar);
router.put('/cursos/:id', CursoController.editar);
router.delete('/cursos/:id', CursoController.deletar);

module.exports = router;