import { Testimonio } from "../models/Testimonios.js";
import {Viaje} from "../models/Viaje.js"

const paginaInicio=async (req,res)=>{

    const promiseDB=[]

    promiseDB.push(Viaje.findAll({limit:3}))
    promiseDB.push(Testimonio.findAll({limit:3}))


    //consultar tres viajes del modelo Viaje.js
    try {
        const resultado= await Promise.all(promiseDB)

        res.render("inicio",{
            pagina:"Inicio",
            clase: "home",
            viajes:resultado[0],
            testimonios:resultado[1]

        });
    } catch (error) {
        console.log(error)
    }
}

const paginaNosotros=(req,res)=>{
    
    res.render("nosotros",{
        pagina:"Nosotros"
    });
}

const paginaViajes= async (req,res)=>{
    //codigo para consultar bd con el controlador de Viajes
    const viajes=await Viaje.findAll();
    // console.log(viajes);

    res.render("viajes",{
        pagina:"Próximos viajes",
        viajes
     

    });
}

//Muestra el detalle de cada viaje por su slug(boton de mas informacion). el findOne buscara
// el slug correspondiente y traera de la bd la informacion de ese slug
const paginaDetalleViaje= async (req,res)=>{
    const {slug}=req.params;//el slug es el comodin que especifique en la ruta

    try {
        const viaje=await Viaje.findOne({where:{slug}});

        res.render("viaje",{
            pagina: "Informacion viaje",
            viaje
        })
    } catch (error) {
        console.log(error)
    }
}

const paginaTestimonios=async (req,res)=>{
    try {
        //consultamos el modelo de Testimonios.js para poder renderizarlos en la bd
        const testimonios= await Testimonio.findAll();
        res.render("testimonios",{
            pagina:"Testimonios",
            testimonios
        });
    } catch (error) {
        console.log(error)
    }
   
}



export{
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimonios,
    paginaDetalleViaje
}