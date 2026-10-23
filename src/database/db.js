const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Cria ou abre o arquivo escola.db na raiz do projeto
const dbPath = path.resolve(__dirname, '../../escola.db');
const db = new sqlite3.Database(dbPath);

// Inicializa a tabela caso ela não exista
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS estudantes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      dataNascimento TEXT NOT NULL,
      telefone TEXT
    )
  `);
});

module.exports = db;
