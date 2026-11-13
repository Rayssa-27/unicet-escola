
const express = require('express');
const router = express.Router();

const notaController = require('../controllers/NotaController');

router.get('/', notaController.listar);
router.get('/matricula/:matricula_id', notaController.buscarPorMatricula);
router.get('/:id', notaController.buscarPorId);
router.post('/', notaController.criar);
router.put('/:id', notaController.atualizar);
router.delete('/:id', notaController.excluir);

module.exports = router;

