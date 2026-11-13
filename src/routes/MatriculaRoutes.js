const express = require('express');
const router = express.Router();

const matriculaController = require('../controllers/MatriculaController');

router.get('/', matriculaController.listar);
router.get('/estudante/:estudante_id', matriculaController.buscarPorEstudante);
router.get('/:id', matriculaController.buscarPorId);
router.post('/', matriculaController.criar);
router.put('/:id/status', matriculaController.atualizarStatus);
router.delete('/:id', matriculaController.excluir);

module.exports = router;