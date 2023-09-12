const express = require('express');
const router = express.Router();

const tareas=require('./data')

router.use(express.json());

router.get('/', (req, res) => {
    res.json(tareas);
  });

router.get('/completas', (req, res) => {
    const tareasCompletadas=tareas.filter((tarea)=>tarea.isCompleted===true)

    res.json(tareasCompletadas);
});

router.get('/incompletas', (req, res) => {
    const tareasCompletadas=tareas.filter((tarea)=>tarea.isCompleted===false)

    res.json(tareasCompletadas);
});

module.exports=router;

