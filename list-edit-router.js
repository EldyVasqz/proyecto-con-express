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
    const idEliminar=parseInt(req.params.id)
    const indice = tareas.findIndex((tarea)=>tarea.id===idEliminar)
    tareas.splice(indice,1)
    res.status(201).json({mensaje:'Tarea Eliminada'})
    res.status(404).json({mensaje:'Tarea no encontrada'})
})

router.put('/:id', (req, res) => {
    const idEliminar=parseInt(req.params.id)
    
    console.log(idEliminar)

    const index=tareas.findIndex((tarea)=>tarea.id===idEliminar)
    console.log(index)
    const {tarea, isCompleted} = req.body;
    

    tareas[index].tarea=tarea
    tareas[index].isCompleted=isCompleted

    res.status(201).json({mensaje:'Tarea Actualizada'})
    res.status(404).json({mensaje:'Tarea no encontrada'})
})

module.exports=router;

