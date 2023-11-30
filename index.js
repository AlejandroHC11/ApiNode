const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const jsonResponse = { mensaje: '¡Hola, este es un JSON desde mi aplicación Node.js!' };
  res.json(jsonResponse);
});

app.listen(port, () => {
  console.log(`La aplicación está escuchando en http://localhost:${port}`);
});