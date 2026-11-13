
const db = require('../database/db');

class Nota {
    static listarTodos(callback) {
        db.all(`
            SELECT notas.*,
                   estudantes.nome AS nomeEstudante,
                   disciplinas.nome AS nomeDisciplina
            FROM notas
            JOIN matriculas ON notas.matricula_id = matriculas.id
            JOIN estudantes ON matriculas.estudante_id = estudantes.id
            JOIN disciplinas ON notas.disciplina_id = disciplinas.id
        `, [], callback);
    }

    static buscarPorId(id, callback) {
        db.get(`
            SELECT notas.*,
                   estudantes.nome AS nomeEstudante,
                   disciplinas.nome AS nomeDisciplina
            FROM notas
            JOIN matriculas ON notas.matricula_id = matriculas.id
            JOIN estudantes ON matriculas.estudante_id = estudantes.id
            JOIN disciplinas ON notas.disciplina_id = disciplinas.id
            WHERE notas.id = ?
        `, [id], callback);
    }

    static buscarPorMatricula(matriculaId, callback) {
        db.all(`
            SELECT notas.*,
                   estudantes.nome AS nomeEstudante,
                   disciplinas.nome AS nomeDisciplina
            FROM notas
            JOIN matriculas ON notas.matricula_id = matriculas.id
            JOIN estudantes ON matriculas.estudante_id = estudantes.id
            JOIN disciplinas ON notas.disciplina_id = disciplinas.id
            WHERE notas.matricula_id = ?
        `, [matriculaId], callback);
    }

    static criar(dados, callback) {
        const { matricula_id, disciplina_id, valor, tipoAvaliacao, dataLancamento } = dados;

        db.run(`
            INSERT INTO notas
            (matricula_id, disciplina_id, valor, tipoAvaliacao, dataLancamento)
            VALUES (?, ?, ?, ?, ?)
        `, [matricula_id, disciplina_id, valor, tipoAvaliacao, dataLancamento], callback);
    }

    static atualizar(id, dados, callback) {
        const { valor, tipoAvaliacao } = dados;

        db.run(`
            UPDATE notas
            SET valor = ?, tipoAvaliacao = ?
            WHERE id = ?
        `, [valor, tipoAvaliacao, id], callback);
    }

    static excluir(id, callback) {
        db.run('DELETE FROM notas WHERE id = ?', [id], callback);
    }
}

module.exports = Nota;
