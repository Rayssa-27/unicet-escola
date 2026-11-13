
const db = require('../database/db');

class Professor {
    static listarTodos(callback) {
        db.all('SELECT * FROM professores', [], callback);
    }

    static buscarPorId(id, callback) {
        db.get('SELECT * FROM professores WHERE id = ?', [id], callback);
    }

    static criar(dados, callback) {
        const { nome, email, titulacao, telefone } = dados;

        db.run(
            `INSERT INTO professores (nome, email, titulacao, telefone)
             VALUES (?, ?, ?, ?)`,
            [nome, email, titulacao, telefone],
            callback
        );
    }

    static atualizar(id, dados, callback) {
        const { nome, email, titulacao, telefone } = dados;

        db.run(
            `UPDATE professores
             SET nome = ?, email = ?, titulacao = ?, telefone = ?
             WHERE id = ?`,
            [nome, email, titulacao, telefone, id],
            callback
        );
    }

    static excluir(id, callback) {
        db.run('DELETE FROM professores WHERE id = ?', [id], callback);
    }
}

module.exports = Professor;
