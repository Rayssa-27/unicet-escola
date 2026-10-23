const db = require('../database/db');

class EstudanteController {
  // Listar Todos
  static listarTodos(req, res) {
    db.all("SELECT * FROM estudantes", [], (err, rows) => {
      if (err) return res.status(500).json({ erro: err.message });
      return res.status(200).json(rows);
    });
  }

  // Listar por ID
  static listarPorId(req, res) {
    const { id } = req.params;
    db.get("SELECT * FROM estudantes WHERE id = ?", [id], (err, row) => {
      if (err) return res.status(500).json({ erro: err.message });
      if (!row) return res.status(404).json({ erro: "Estudante não encontrado." });
      return res.status(200).json(row);
    });
  }

  // Salvar Estudante
  static salvar(req, res) {
    const { nome, dataNascimento, telefone } = req.body;
    if (!nome || !dataNascimento) {
      return res.status(400).json({ erro: "Nome e dataNascimento são obrigatórios." });
    }

    const sql = `INSERT INTO estudantes (nome, dataNascimento, telefone) VALUES (?, ?, ?)`;
    db.run(sql, [nome, dataNascimento, telefone], function(err) {
      if (err) return res.status(500).json({ erro: err.message });

      // this.lastID retorna o ID gerado pelo banco
      return res.status(201).json({
        id: this.lastID,
        nome,
        dataNascimento,
        telefone
      });
    });
  }

  // Editar Estudante
  static editar(req, res) {
    const { id } = req.params;
    const { nome, dataNascimento, telefone } = req.body;

    const sql = `UPDATE estudantes SET nome = ?, dataNascimento = ?, telefone = ? WHERE id = ?`;
    db.run(sql, [nome, dataNascimento, telefone, id], function(err) {
      if (err) return res.status(500).json({ erro: err.message });
      if (this.changes === 0) return res.status(404).json({ erro: "Estudante não encontrado." });
      return res.status(200).json({ id, nome, dataNascimento, telefone });
    });
  }

  // Deletar Estudante
  static deletar(req, res) {
    const { id } = req.params;
    db.run("DELETE FROM estudantes WHERE id = ?", [id], function(err) {
      if (err) return res.status(500).json({ erro: err.message });
      if (this.changes === 0) return res.status(404).json({ erro: "Estudante não encontrado." });
      return res.status(200).json({ mensagem: "Estudante removido com sucesso!" });
    });
  }
}
module.exports = EstudanteController;
