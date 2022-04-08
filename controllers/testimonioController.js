
import { Testimonio } from "../models/Testimonios.js";


const guardarTestimonio=async (req,res)=>{

    //validar...
    const {nombre, correo, mensaje}=req.body;
    const errores=[]
    if(nombre.trim()===""){
        errores.push({mensaje:"El nombre está vacio"})
    }
    if(correo.trim()===""){
        errores.push({mensaje:"El correo está vacio"})
    }
    if(mensaje.trim()===""){
        errores.push({mensaje:"El mensaje está vacio"})
    }

    //Validar los errores en la vista si los hay recorriendo el array de errores
    if(errores.length>0){
        //consultar testimonios existentes
        const testimonios= await Testimonio.findAll();

        //Mostrar la vista con errores
        res.render("testimonios",{
            pagina:"Testimonios",
            errores,
            nombre,
            correo,
            mensaje,
            testimonios
        })
    }else{
        //Almacenar los datos del form en la bd
        try {
            await Testimonio.create({
                nombre,
                correo,
                mensaje
            })

            res.redirect("/testimonios")
        } catch (error) {
            console.log(error)
        }
    }

   
}



export {
    guardarTestimonio
}