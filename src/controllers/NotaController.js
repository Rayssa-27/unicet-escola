
const Nota = require('../models/Nota');

exports.listar = (req, res) => {
    Nota.listarTodos((err, notas) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(notas);
    });
};

exports.buscarPorId = (req, res) => {
    Nota.buscarPorId(req.params.id, (err, nota) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (!nota) return res.status(404).json({ mensagem: 'Nota não encontrada' });
        res.json(nota);
    });
};

exports.buscarPorMatricula = (req, res) => {
    Nota.buscarPorMatricula(req.params.matricula_id, (err, notas) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(notas);
    });
};

exports.criar = (req, res) => {
    const { matricula_id, disciplina_id, valor, tipoAvaliacao, dataLancamento } = req.body;

    if (
        matricula_id == null ||
        disciplina_id == null ||
        valor == null ||
        !tipoAvaliacao ||
        !dataLancamento
    ) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    }

    if (Number(valor) < 0 || Number(valor) > 10 || !Number.isFinite(Number(valor))) {
        return res.status(400).json({ mensagem: 'A nota deve estar entre 0 e 10' });
    }

    Nota.criar(
        { matricula_id, disciplina_id, valor, tipoAvaliacao, dataLancamento },
        function(err) {
            if (err) return res.status(400).json({ erro: err.message });
            res.status(201).json({
                id: this.lastID,
                mensagem: 'Nota lançada com sucesso'
            });
        }
    );
};

exports.atualizar = (req, res) => {
    const { valor, tipoAvaliacao } = req.body;

    if (valor == null || !tipoAvaliacao) {
        return res.status(400).json({ mensagem: 'Valor e tipo de avaliação são obrigatórios' });
    }

    if (Number(valor) < 0 || Number(valor) > 10 || !Number.isFinite(Number(valor))) {
        return res.status(400).json({ mensagem: 'A nota deve estar entre 0 e 10' });
    }

    Nota.atualizar(req.params.id, { valor, tipoAvaliacao }, function(err) {
        if (err) return res.status(400).json({ erro: err.message });
        if (this.changes === 0) {
            return res.status(404).json({ mensagem: 'Nota não encontrada' });
        }
        res.json({ mensagem: 'Nota atualizada com sucesso' });
    });
};

exports.excluir = (req, res) => {
    Nota.excluir(req.params.id, function(err) {
        if (err) return res.status(500).json({ erro: err.message });
        if (this.changes === 0) {
            return res.status(404).json({ mensagem: 'Nota não encontrada' });
        }
        res.json({ mensagem: 'Nota excluída com sucesso' });
    });
};
