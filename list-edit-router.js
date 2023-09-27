
const express = require('express');
const jwt = require("jsonwebtoken");
const router = express.Router();

require("dotenv").config();

const tareas=require('./data')

router.use(express.json());
const {validarMetodo, validarTarea, validarErrores }=require("./middlewares/middlewares")


router.use(validarMetodo);



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

    if(userName === "Arely" && passUser === "1234"){
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

