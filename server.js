const express = require('express');
const estudantesRoutes = require('./src/routes/estudanteRoutes');

const app = express();
const PORT = 3000;

app.use(express.json())

app.use('/', estudantesRoutes);

app.listen(PORT, () => {
    console.log(`Sevidor rodando em http;//local:${PORT}`);
});