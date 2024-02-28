const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Configurar el servidor web para servir archivos estáticos desde la raíz del servidor
app.use(express.static(path.join(__dirname, '')));

// Iniciar el servidor Node.js
app.listen(port, () => {
  console.log(`Servidor web Node.js en ejecución en http://localhost:${port}`);
});
