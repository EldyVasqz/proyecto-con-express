const express = require('express');
const router = express.Router();

const tareas=require('./data')

router.use(express.json());

router.post('/', (req, res) => {
    const nuevaTarea=req.body;
    console.log(nuevaTarea);
    tareas.push(nuevaTarea)
    res.json(tareas);
});

router.delete('/:id', (req, res) => {
    const idEliminar=req.params.id
    const tareasActualizadas=tareas.filter((tarea)=>tarea.id===idEliminar)
    res.status(201).json({mensaje:'Tarea Eliminada'})
    res.status(404).json({mensaje:'Tarea no encontrada'})
})

router.put('/:id', (req, res) => {
    const idEliminar=req.params.id
    const index=tareas.findIndex((tarea)=>tarea.id===idEliminar)
    const nuevaDescripcion=req.body;
    const nuevoEstado=req.body;
    tareas[index].tareas=nuevaDescripcion
    tareas[index].isCompleted=nuevoEstado
    res.status(201).json({mensaje:'Tarea Actualizada'})
    res.status(404).json({mensaje:'Tarea no encontrada'})
})

module.exports=router;