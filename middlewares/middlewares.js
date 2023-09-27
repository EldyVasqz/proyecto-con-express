
const tareas=require('../data')

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


const validarMetodo = (req, res, next) => { 
    const metodo = req.method
    console.log (metodo)
    if((metodo!="POST")&&(metodo!="GET")&&(metodo!="PUT")&&((metodo!="DELETE"))){ 
        return res.status(404).send({mensaje:"Metodo no admitido"})
    }
    next() 
};



 



//Cree un middleware a nivel de aplicacion para gestionar que solo lleguen solicitudes HTTP validos de lo contrario que devuelva un error
const validarTarea = (req, res, next)=> {
    const idEliminar=parseInt(req.params.id)
    const indice = tareas.findIndex((tarea)=>tarea.id===idEliminar)
    if(indice===-1){
        return res.status(404).json({mensaje:'Tarea no encontrada'})
    }
    next()
};


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
module.exports={authMiddleware, validarMetodo, validarTarea, validarErrores}