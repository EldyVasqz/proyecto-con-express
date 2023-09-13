const express = require('express');
const router = express.Router();

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
//1. Maneje solicitudes POST con cuerpo vacio y que no tengan informacion valida o atributos faltantes.  
//2. Maneje solicitudes PUT con cuerpo vacio y que no tengan informacion valida o atributos faltantes. 

const validarErrores = (req, res, next) => {
const tarea = req.body
console.log(tarea)
const metodo = req.method
console.log(Object.keys(tarea).length)

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

