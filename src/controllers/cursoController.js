const db = require('../database/db');

class CursoController {
  // Listar todos os cursos
  static listarTodos(req, res) {
    db.all("SELECT * FROM cursos", [], (err, rows) => {
      if (err) return res.status(500).json({ erro: err.message });
      return res.status(200).json(rows);
    });
  }

  // Listar curso por ID
  static listarPorId(req, res) {
    const { id } = req.params;

    db.get("SELECT * FROM cursos WHERE id = ?", [id], (err, row) => {
      if (err) return res.status(500).json({ erro: err.message });
      if (!row) return res.status(404).json({ erro: "Curso não encontrado." });
      return res.status(200).json(row);
    });
  }

  // Salvar curso
  static salvar(req, res) {
    const { nome, cargaHoraria, turno } = req.body;

    if (!nome) {
      return res.status(400).json({ erro: "O nome do curso é obrigatório." });
    }

    const sql = `
      INSERT INTO cursos (nome, cargaHoraria, turno)
      VALUES (?, ?, ?)
    `;

    db.run(sql, [nome, cargaHoraria, turno], function(err) {
      if (err) return res.status(500).json({ erro: err.message });

      return res.status(201).json({
        id: this.lastID,
        nome,
        cargaHoraria,
        turno
      });
    });
  }

  // Editar curso
  static editar(req, res) {
    const { id } = req.params;
    const { nome, cargaHoraria, turno } = req.body;

    const sql = `
      UPDATE cursos
      SET nome = ?, cargaHoraria = ?, turno = ?
      WHERE id = ?
    `;

    db.run(sql, [nome, cargaHoraria, turno, id], function(err) {
      if (err) return res.status(500).json({ erro: err.message });
      if (this.changes === 0) {
        return res.status(404).json({ erro: "Curso não encontrado." });
      }

      return res.status(200).json({
        id: Number(id),
        nome,
        cargaHoraria,
        turno
      });
    });
  }

  // Deletar curso
  static deletar(req, res) {
    const { id } = req.params;

    db.run("DELETE FROM cursos WHERE id = ?", [id], function(err) {
      if (err) return res.status(500).json({ erro: err.message });
      if (this.changes === 0) {
        return res.status(404).json({ erro: "Curso não encontrado." });
      }

      return res.status(200).json({
        mensagem: "Curso removido com sucesso!"
      });
    });
  }
}

module.exports = CursoController;