const express = require('express');
const router = express.Router();

const tareas=require('./data')

//Cree un middleware para gestionar los parametros y si no que devuelva un error
const validarPagina = (req, res, next) => {
    const metodo=req.method
    if(metodo==="GET")
    { const pagina = req.originalUrl
        if(pagina!="/tareas" && pagina!="/tareas/completas" && pagina!="/tareas/incompletas"){
            res.status(404).send({mensaje:"Pagina no encontrada"})
        }}
   
    next()
}
router.use (validarPagina)
    

router.use(express.json());

router.get('/', (req, res) => {
    res.json(tareas);
  });

  //Cree una solicitud GET a una ruta especifica para tareas completas
router.get('/completas', (req, res) => {
    const tareasCompletadas=tareas.filter((tarea)=>tarea.isCompleted===true)

    res.json(tareasCompletadas);
});

 //Cree una solicitud GET a una ruta especifica para tareas incompletas
router.get('/incompletas', (req, res) => {
    const tareasCompletadas=tareas.filter((tarea)=>tarea.isCompleted===false)

    res.json(tareasCompletadas);
});

module.exports=router; 

