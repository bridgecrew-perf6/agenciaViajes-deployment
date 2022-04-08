
//aqui definimos las rutas para organizar mejor todo, solo puede haber una instancia de express y esa ya la definimos en el index.js del proyecto entonces solo lo importamos, y luego utilizamos el Router de express para poder definir las rutas.

import express from "express"; //sintaxis de imports,se debe habilitar en package.json los modules

import { paginaInicio, paginaNosotros, paginaTestimonios, paginaViajes,paginaDetalleViaje } from "../controllers/paginasController.js";

import { guardarTestimonio } from "../controllers/testimonioController.js";
//definimos el router de express
const router=express.Router();

//ahora definimos nuestras rutas pero con la const router

router.get("/",paginaInicio)


router.get("/nosotros",paginaNosotros)

router.get("/testimonios",paginaTestimonios)
router.post("/testimonios",guardarTestimonio)//ruta para enviar datos del formulario


router.get("/viajes",paginaViajes)
router.get("/viajes/:slug",paginaDetalleViaje)



//por ultimo, exportamos este router para usarlo en nuestro index del proyecto y asi el puede usar las rutas
export default router;
