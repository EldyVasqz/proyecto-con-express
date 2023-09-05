const express = require('express');
const app = express();
const port = 3000;

const listaTareas = [

    {
        "id":"1",
        "isCompleted":false,
        "description":"Lavar la ropa",
    },
    {
        "id":"2",
        "isCompleted":false,
        "description":"Asear la casa",
    },
    {
        "id":"3",
        "isCompleted":true,
        "description":"Jugar con el gato",
    },
    {
        "id":"4",
        "isCompleted":true,
        "description":"Cocinar la cena",
    }]

app.use(express.json());

console.log(listaTareas)

app.get('/tareas', (req, res) => {
    res.send(listaTareas);
  });
  
app.get('/mensaje', (req, res) => {
  res.send("Este es mi servidor");
});

app.listen(port, () => {
  console.log(`La app está escuchando en el puerto ${port}`);
}); 


