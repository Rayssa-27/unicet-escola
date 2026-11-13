
const express = require('express');
const router = express.Router();

const professorController = require('../controllers/ProfessorController');

router.get('/', professorController.listar);
router.get('/:id', professorController.buscarPorId);
router.post('/', professorController.criar);
router.put('/:id', professorController.atualizar);
router.delete('/:id', professorController.excluir);

module.exports = router;
