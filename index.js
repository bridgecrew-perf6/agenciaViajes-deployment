//const express=require("express")//extraemos express, sintaxis de commonjs
import express from "express"; //sintaxis de imports,se debe habilitar en package.json los modules
import router from "./routes/index.js"//importamos las rutas
import db from "./config/db.js"
import dotenv from "dotenv"

dotenv.config({path:"variables.env"})



const app=express()//ejecutamos express como funcion

//conexion a la bd por medio de una promesa
db.authenticate()
    .then(()=>console.log("BD conectada"))
    .catch(error=>console.log(error));

//definir puerto, la variable de entorno asigna el puerto o sino se toma por defecto el puerto 4000, en local sera el 4000, pero al subir a remoto la variable de entorno asigna el puerto
const port=process.env.PORT || 4000;

//hailitar pug para los templates
app.set("view engine","pug");

//middleware para mostrar el año actual
app.use((req,res,next)=>{
    const year=new Date();
    res.locals.miVariable=year.getFullYear();
    
    // console.log(res.locals);

    return next();
})

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended:true}));


//definir la carpeta publica
app.use(express.static("public"));

//express soporta los verbos del crud, req es lo que el usuario solicita,osea visitar una url, y res es lo que el servidor responde.Con send() mostramos algo en pantalla. Aqui el usuario solicita obtener el home de la pagina y el servidor le responde con el hola mundo. Se puede usar en res.json y mostrara un objeto json si queremos, o el mas utilizado es render para mostrar una vista. Estas rutas se separan en un archivo aparte para organizar mejor todo, es el MVC

// app.get("/",(req,res)=>{
//     res.send("Hola mundo");
// })

// app.get("/nosotros",(req,res)=>{
//     res.send("Nosotros");
// })

// app.get("/contacto",(req,res)=>{
//     res.send("Contacto");
// })


//aqui agregamos el router a la app, use sirve para que la app pueda de una vez trabajar con cualquier verbo del crud(get,post,etc), aqui lo que indicamos es que desde el home del proyecto agregar router y eso carga las diferentes urls que tenemos,osea contacto, nosotros,etc. Si probamos, las rutas deben de seguir trabajando normalmente.
app.use("/",router);

//arrancamos el servidor con el metodo listen() y le pasamos el host, este host sera dinamico para cuando desplegemos la aplicacion en el servidor, como ya importamos las variables de entorno, la variable HOST servira para cuando estemos en local, y si estamos en produccion le ponemos la direccion "0.0.0.0", esta direccion la reemplazara heroku dinamicamente por otra valida..

const host=process.env.HOST || '0.0.0.0'

app.listen(port,host,()=>{

    if(port){
    console.log(`El servidor está funcionando en el puerto ${port} en local`)

    }else if(host){
    console.log(`El servidor está funcionando en el host ${host} en producción`)

    }
})