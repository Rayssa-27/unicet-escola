const express = require('express');
const router = express.Router();

const disciplinaController = require('../controllers/disciplinaController');

router.get('/', disciplinaController.listar);
router.get('/curso/:curso_id', disciplinaController.buscarPorCurso);
router.get('/:id', disciplinaController.buscarPorId);
router.post('/', disciplinaController.criar);
router.put('/:id', disciplinaController.atualizar);
router.delete('/:id', disciplinaController.excluir);

module.exports = router;