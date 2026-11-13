
const express = require('express');

const estudantesRoutes = require('./src/routes/estudanteRoutes');
const cursoRoutes = require('./src/routes/cursoRoutes');
const disciplinaRoutes = require('./src/routes/disciplinaRoutes');
const matriculaRoutes = require('./src/routes/MatriculaRoutes');
const professorRoutes = require('./src/routes/ProfessorRoutes');
const notaRoutes = require('./src/routes/NotaRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/', estudantesRoutes);
app.use('/', cursoRoutes);
app.use('/disciplinas', disciplinaRoutes);
app.use('/matriculas', matriculaRoutes);
app.use('/professores', professorRoutes);
app.use('/notas', notaRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
