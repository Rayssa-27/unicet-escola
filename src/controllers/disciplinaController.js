const db = require('../database/db');
const Disciplina = require('../models/Disciplina');

exports.listar = (req, res) => {
    db.all(`
        SELECT disciplinas.*, cursos.nome AS nomeCurso
        FROM disciplinas
        INNER JOIN cursos ON disciplinas.curso_id = cursos.id
    `, [], (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
};

exports.buscarPorId = (req, res) => {
    db.get(
        'SELECT * FROM disciplinas WHERE id = ?',
        [req.params.id],
        (err, row) => {
            if (err) return res.status(500).json(err);
            if (!row) return res.status(404).json({ mensagem: 'Disciplina não encontrada' });
            res.json(row);
        }
    );
};

exports.buscarPorCurso = (req, res) => {
    db.all(
        'SELECT * FROM disciplinas WHERE curso_id = ?',
        [req.params.curso_id],
        (err, rows) => {
            if (err) return res.status(500).json(err);
            res.json(rows);
        }
    );
};

exports.criar = (req, res) => {
    const { nome, codigo, cargaHoraria, curso_id } = req.body;

    const disciplina = new Disciplina(nome, codigo, cargaHoraria, curso_id);

    db.run(
        `INSERT INTO disciplinas (nome, codigo, cargaHoraria, curso_id)
         VALUES (?, ?, ?, ?)`,
        [disciplina.nome, disciplina.codigo, disciplina.cargaHoraria, disciplina.curso_id],
        function (err) {
            if (err) return res.status(400).json(err);
            res.status(201).json({
                id: this.lastID,
                ...disciplina
            });
        }
    );
};

exports.atualizar = (req, res) => {
    const { nome, codigo, cargaHoraria } = req.body;

    db.run(
        `UPDATE disciplinas
         SET nome = ?, codigo = ?, cargaHoraria = ?
         WHERE id = ?`,
        [nome, codigo, cargaHoraria, req.params.id],
        function (err) {
            if (err) return res.status(400).json(err);
            if (this.changes === 0) return res.status(404).json({ mensagem: 'Disciplina não encontrada' });
            res.json({ mensagem: 'Disciplina atualizada com sucesso' });
        }
    );
};

exports.excluir = (req, res) => {
    db.run(
        'DELETE FROM disciplinas WHERE id = ?',
        [req.params.id],
        function (err) {
            if (err) return res.status(500).json(err);
            if (this.changes === 0) return res.status(404).json({ mensagem: 'Disciplina não encontrada' });
            res.json({ mensagem: 'Disciplina removida com sucesso' });
        }
    );
};