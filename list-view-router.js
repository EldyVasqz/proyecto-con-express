const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const tareas=require('./data')

require("dotenv").config();

router.use(express.json());

//Cree un middleware para gestionar los parametros y si no que devuelva un error
const validarPagina = (req, res, next) => {
    const metodo=req.method
    if(metodo==="GET")
    { const pagina = req.originalUrl
        if(pagina!="/tareas" && pagina!="/tareas/completas" && pagina!="/tareas/incompletas" && pagina!="/tareas/rutaAdmin"){
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

const authMiddleware = (req, res, next) => {
    const headerToken = req.headers.authorization;
    console.log("Token",headerToken)
    if(!headerToken){
        return res.status(404).send("No se tiene un Token")
    }
    try {
        const decoded = jwt.verify(headerToken, process.env.SECRET_KEY);
        console.log("---->", decoded)
        req.user = decoded 
        next()
    } catch (error){
        res.status(400).send("Token no valido")
    }
};

router.get("/rutaAdmin", 
authMiddleware, (req, res)=>{
    res.send({mensaje:"Bienvenido administrador", user : req.user})
});


module.exports=router; 

