const db = require('../database/db');
const Matricula = require('../models/Matricula');

exports.listar = (req, res) => {
    db.all(`
        SELECT matriculas.*,
        estudantes.nome AS nomeEstudante,
        cursos.nome AS nomeCurso
        FROM matriculas
        INNER JOIN estudantes ON matriculas.estudante_id = estudantes.id
        INNER JOIN cursos ON matriculas.curso_id = cursos.id
    `, [], (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
};

exports.buscarPorId = (req, res) => {
    db.get(
        `SELECT matriculas.*,
        estudantes.nome AS nomeEstudante,
        cursos.nome AS nomeCurso
        FROM matriculas
        INNER JOIN estudantes ON matriculas.estudante_id = estudantes.id
        INNER JOIN cursos ON matriculas.curso_id = cursos.id
        WHERE matriculas.id = ?`,
        [req.params.id],
        (err, row) => {
            if (err) return res.status(500).json(err);
            if (!row) return res.status(404).json({ mensagem: 'Matrícula não encontrada' });
            res.json(row);
        }
    );
};

exports.buscarPorEstudante = (req, res) => {
    db.all(
        'SELECT * FROM matriculas WHERE estudante_id = ?',
        [req.params.estudante_id],
        (err, rows) => {
            if (err) return res.status(500).json(err);
            res.json(rows);
        }
    );
};

exports.criar = (req, res) => {
    const { estudante_id, curso_id, numeroMatricula, dataMatricula } = req.body;

    const data = dataMatricula || new Date().toISOString().split('T')[0];

    const matricula = new Matricula(
        estudante_id,
        curso_id,
        numeroMatricula,
        data
    );

    db.run(
        `INSERT INTO matriculas
        (estudante_id, curso_id, numeroMatricula, dataMatricula, status)
        VALUES (?, ?, ?, ?, 'ATIVA')`,
        [
            matricula.estudante_id,
            matricula.curso_id,
            matricula.numeroMatricula,
            matricula.dataMatricula
        ],
        function (err) {
            if (err) return res.status(400).json(err);
            res.status(201).json({
                id: this.lastID,
                ...matricula
            });
        }
    );
};

exports.atualizarStatus = (req, res) => {
    const { status } = req.body;

    const statusValidos = ['ATIVA', 'TRANCADA', 'CONCLUIDA', 'CANCELADA'];

    if (!statusValidos.includes(status)) {
        return res.status(400).json({ mensagem: 'Status inválido' });
    }

    db.run(
        'UPDATE matriculas SET status = ? WHERE id = ?',
        [status, req.params.id],
        function (err) {
            if (err) return res.status(500).json(err);
            if (this.changes === 0) return res.status(404).json({ mensagem: 'Matrícula não encontrada' });
            res.json({ mensagem: 'Status atualizado com sucesso' });
        }
    );
};

exports.excluir = (req, res) => {
    db.run(
        'DELETE FROM matriculas WHERE id = ?',
        [req.params.id],
        function (err) {
            if (err) return res.status(500).json(err);
            if (this.changes === 0) return res.status(404).json({ mensagem: 'Matrícula não encontrada' });
            res.json({ mensagem: 'Matrícula removida com sucesso' });
        }
    );
};