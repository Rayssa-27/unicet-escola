const express = require('express');

const estudantesRoutes = require('./src/routes/estudanteRoutes');
const cursoRoutes = require('./src/routes/cursoRoutes');
const disciplinaRoutes = require('./src/routes/disciplinaRoutes');
const matriculaRoutes = require('./src/routes/MatriculaRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/', estudantesRoutes);
app.use('/', cursoRoutes);
app.use('/disciplinas', disciplinaRoutes);
app.use('/matriculas', matriculaRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});