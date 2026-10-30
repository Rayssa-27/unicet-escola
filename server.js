const express = require('express');
const estudantesRoutes = require('./src/routes/estudanteRoutes');
const cursoRoutes = require('./src/routes/cursoRoutes');

const app = express();
const PORT = 3000;

app.use(express.json())

app.use('/', estudantesRoutes);
app.use('/', cursoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});