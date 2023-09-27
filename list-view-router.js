const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const tareas=require('./data')

require("dotenv").config();

router.use(express.json());

const {authMiddleware}=require("./middlewares/middlewares")


router.get("/rutaAdmin", 
authMiddleware, (req, res)=>{
    res.send({mensaje:"Bienvenido administrador", user : req.user})
});

//Cree un middleware para gestionar los parametros y si no que devuelva un error
const validarPagina = (req, res, next) => {
    const metodo=req.method
    if(metodo==="GET")
    { const pagina = req.originalUrl
       
        if(pagina!="/tareas" && pagina!="/tareas/completas" && pagina!="/tareas/incompletas" && pagina!="/tareas/rutaAdmin" && pagina!=paginaParms){
            res.status(404).send({mensaje:"Pagina no encontrada"})
        }} 
   
    next()

}

//router.use (validarPagina)
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

router.get('/:id', (req, res) => {
    const idTarea = req.params.id;
    const tareaIndividual=tareas.filter((tarea)=>tarea.id == idTarea )
    if (tareaIndividual=="") {
        res.status(404).json({ error: 'Tarea no encontrada' });
      } else {
        res.json(tareaIndividual);
      } 
});  


module.exports=router; 

