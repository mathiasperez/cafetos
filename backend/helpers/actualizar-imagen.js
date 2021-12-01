const fs = require('fs'); //para leer archivos y carpetas del filesystem
const Usuario = require('../models/consumidor.model');
const Proyecto = require('../models/proyecto.model');
const Investigador = require('../models/investigador.model');

const borrarImagen = (path)=>{
    
    if(fs.existsSync(path)){
        //borrar la imagen anterior
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async (tipoColeccion,id, nombreArchivo) =>{
    let pathViejo = '';
    switch (tipoColeccion) {
        case 'investigadores':
            const investigador = await Investigador.findById(id);
            if(!investigador){
                console.log('Id de investigador no encontrado');
                return false;
            }
            pathViejo = `./uploads/investigadores/${investigador.img}`;
            borrarImagen(pathViejo);
            //grabando path de la nueva imagen
            investigador.img = nombreArchivo;
            await investigador.save();
            return true;
        break;
            
        case 'proyectos':
            const proyecto = await Proyecto.findById(id);
            if(!proyecto){
                console.log('Id de proyecto no encontrado');
                return false;
            }
            pathViejo = `./uploads/proyectos/${proyecto.img}`;
            borrarImagen(pathViejo);
            //grabando path de la nueva imagen
            proyecto.img = nombreArchivo;
            await proyecto.save();
            return true;
            
            break;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if(!usuario){
                console.log('Id de usuario no encontrado');
                return false;
            }
            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);
            //grabando path de la nueva imagen
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;
        default:
            break;
    }

}


module.exports = {
    actualizarImagen
}