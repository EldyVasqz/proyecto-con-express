
const express = require('express');
const jwt = require("jsonwebtoken");
const router = express.Router();

require("dotenv").config();

const tareas=require('./data')

router.use(express.json());

const validarMetodo = (req, res, next) => { 
    const metodo = req.method
    console.log (metodo)
    if((metodo!="POST")&&(metodo!="GET")&&(metodo!="PUT")&&((metodo!="DELETE"))){ 
        return res.status(404).send({mensaje:"Metodo no admitido"})
    }
    next() 
};

router.use(validarMetodo);

//Cree un middleware que:
const validarErrores = (req, res, next) => {
const tarea = req.body
console.log(tarea)
const metodo = req.method
console.log(Object.keys(tarea).length)

//1. Maneje solicitudes POST con cuerpo vacio y que no tengan informacion valida o atributos faltantes.  
if (metodo==="POST") {
    if(!tarea){
        return res.status(404).send({mensaje:"Tarea no valida"})
    }
    if (Object.keys(tarea).length===0){
        return res.status(400).send({mensaje:"Tarea vacia"})
    }
    if (Object.keys(tarea).length<3){
        return res.status(404).send({mensaje:"Faltan atributos"})
    }

    next()  
};

//2. Maneje solicitudes PUT con cuerpo vacio y que no tengan informacion valida o atributos faltantes. 
if (metodo==="PUT") {
    if(!tarea){
        return res.status(404).send({mensaje:"Tarea no valida"})
    }
    if (Object.keys(tarea).length===0){
        return res.status(400).send({mensaje:"Tarea vacia"})
    }
   
    next()
};
};

//Cree una solitud POST a una ruta especifica para crear tareas
router.post('/', validarErrores, (req, res) => {
    const nuevaTarea=req.body;
    console.log(nuevaTarea);
    tareas.push(nuevaTarea)
    res.json(tareas);
});

//Cree una solicitud POST para el proceso de autenticacion
router.post('/login', (req, res) => {
    const userName = req.body.user; 
    const passUser = req.body.pass;

    if(userName === "user" && passUser === "1234"){
        const payload = {
            rol: "admin",
            user: "user",
            name: "Arely"
        }   

        const token = jwt.sign(payload, process.env.SECRET_KEY);

        res.status(200).send({mensaje:"Bienvenido a la aplicacion", token})
    } else {
        res.status(400).send("Credenciales incorrectas")
    }

});

//Cree un middleware a nivel de aplicacion para gestionar que solo lleguen solicitudes HTTP validos de lo contrario que devuelva un error
const validarTarea = (req, res, next)=> {
    const idEliminar=parseInt(req.params.id)
    const indice = tareas.findIndex((tarea)=>tarea.id===idEliminar)
    if(indice===-1){
        return res.status(404).json({mensaje:'Tarea no encontrada'})
    }
    next()
};

//Cree una solitud DELETE a una ruta especifica para eliminar tareas
router.delete('/:id', validarTarea, (req, res) => {
    const idEliminar=parseInt(req.params.id)
    const indice = tareas.findIndex((tarea)=>tarea.id===idEliminar)
    tareas.splice(indice,1)
    res.status(201).json({mensaje:'Tarea Eliminada'})
})

//Cree una solitud PUT a una ruta especifica para editar o actualizar tareas
router.put('/:id', validarErrores, validarMetodo, (req, res) => {
    const idEliminar=parseInt(req.params.id)
    
    console.log(idEliminar)

    const index=tareas.findIndex((tarea)=>tarea.id===idEliminar)
    console.log(index)
    const tareaN = req.body;
    
    tareas[index]={...tareas[index],...tareaN}

    res.status(201).json({mensaje:'Tarea Actualizada'})

})



module.exports=router;  

