const express = require('express');
const app = express();
const port = 8070;

const vista=require('./list-view-router')
const editar=require('./list-edit-router')

app.get('/', function (req, res) {
  res.send("Bienvenido a Mi Lista de Tareas");
});

app.use('/tareas',vista)
app.use('/tareas',editar)

app.listen(port, () => {
  console.log(`La app está escuchando en el puerto ${port}`);
});  


