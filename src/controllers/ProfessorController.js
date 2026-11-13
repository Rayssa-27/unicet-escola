
const Professor = require('../models/Professor');

exports.listar = (req, res) => {
    Professor.listarTodos((err, professores) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(professores);
    });
};

exports.buscarPorId = (req, res) => {
    Professor.buscarPorId(req.params.id, (err, professor) => {
        if (err) return res.status(500).json({ erro: err.message });
        if (!professor) return res.status(404).json({ mensagem: 'Professor não encontrado' });
        res.json(professor);
    });
};

exports.criar = (req, res) => {
    const { nome, email, titulacao, telefone } = req.body;

    if (!nome || !email || !titulacao) {
        return res.status(400).json({ mensagem: 'Nome, email e titulação são obrigatórios' });
    }

    Professor.criar({ nome, email, titulacao, telefone }, function(err) {
        if (err) return res.status(400).json({ erro: err.message });
        res.status(201).json({
            id: this.lastID,
            mensagem: 'Professor cadastrado com sucesso'
        });
    });
};

exports.atualizar = (req, res) => {
    const { nome, email, titulacao, telefone } = req.body;

    Professor.atualizar(
        req.params.id,
        { nome, email, titulacao, telefone },
        function(err) {
            if (err) return res.status(400).json({ erro: err.message });
            if (this.changes === 0) {
                return res.status(404).json({ mensagem: 'Professor não encontrado' });
            }
            res.json({ mensagem: 'Professor atualizado com sucesso' });
        }
    );
};

exports.excluir = (req, res) => {
    Professor.excluir(req.params.id, function(err) {
        if (err) return res.status(500).json({ erro: err.message });
        if (this.changes === 0) {
            return res.status(404).json({ mensagem: 'Professor não encontrado' });
        }
        res.json({ mensagem: 'Professor excluído com sucesso' });
    });
};
