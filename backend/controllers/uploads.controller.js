const path = require ('path');
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");



const fileUpload = (req, res= response) =>{

    const tipoColeccion = req.params.tipocoleccion;
    const id = req.params.id;

    //Validar tipo
    const tiposValidos = ['investigadores','proyectos','usuarios']; //son los nombres de las carpetas donde registramos los archivos cargados
    if (!tiposValidos.includes(tipoColeccion)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un tipo valido (investigador, proyecto, usuariio)'
        });
    }
    //Validar que existe un archivo en el body
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: true,
            msg: 'No se envio ningun archivo'
        });
      } 

    //Procesar la imagen
    const file = req.files.imagen;// imagen es el nombre que se creo en postman

    const nombreCortado = file.name.split('.'); // archivo.uno.dos.jpg
    const extensionArchivo = nombreCortado[nombreCortado.length-1].toLowerCase();

    //Validar extension
    const extensionesAceptadas = ['png','jpg','jpeg','gif'];
    if (!extensionesAceptadas.includes(extensionArchivo)){
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida'
        });
    }
    
    //Generar el nombre del archivo con uuid
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    //Path para guardar la imagen
    const path = `./uploads/${tipoColeccion}/${nombreArchivo}`;

    // Grabar la imagen en el directorio
    file.mv(path, (err)=> {
        if (err)
            return res.status(500).json({
                ok: false,
                msg:'Error al copia la imagen'
            });

        //Actualizar imagen
        actualizarImagen( tipoColeccion,id, nombreArchivo);


        res.json({
            ok: true,
            msg: 'file Uploaded',
            nombreArchivo
        });
        
    });
  

}


const verImagen = (req, res=response) => {
    const tipo = req.params.tipocoleccion;
    const imagen = req.params.imagen;

    

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${imagen}`);
    
    // Asignar imagen por defecto
    if (fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const pathImg = path.join(__dirname, `../uploads/no_image.png`);
        res.sendFile(pathImg);        
    }

}


module.exports = {
    fileUpload,
    verImagen
}