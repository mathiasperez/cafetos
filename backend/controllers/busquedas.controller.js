//busquedaTotal

const { response } = require("express")

const Usuario = require('../models/usuario.model');
const Investigador = require('../models/investigador.model');
const Proyecto = require('../models/proyecto.model');



const busquedaTotal = async (req, res=response)=>{

    const busqueda = req.params.busqueda; 
    const miRegExp = new RegExp(busqueda,'i'); //i  insensible

    const [usuarios, investigadores, proyectos] = await Promise.all ([
        Usuario.find({nombre:miRegExp}), // la busqueda es por nombre
        Investigador.find({nombre:miRegExp}),
        Proyecto.find({nombre:miRegExp})
    ]);

    res.json({
        ok: true,
        msg: 'busqueda total',
        usuarios,
        investigadores,
        proyectos
    });

}

//estructura de la peticion 
const busquedaColeccion = async (req, res=response)=>{

    const miColeccion = req.params.micoleccion;
    const busqueda = req.params.busqueda; 
    const miRegExp = new RegExp(busqueda,'i'); //i  insensible

    let data = [];

    switch (miColeccion) {
        case 'usuarios':
            data = await Usuario.find({nombre:miRegExp})
                            
            break;
        case 'proyectos':
            data = await Proyecto.find({nombre:miRegExp})
                    .populate('usuario','nombre img'); 
            break;    
        case 'investigadores':
            data = await Investigador.find({nombre:miRegExp})
                    .populate('usuario','nombre img')
                    .populate('proyecto','nombre img');
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: "La coleccion tiene que ser usuarios/proyectos/investigadores"
            });
    }
    res.json({
        ok: true,
        resultados: data
    });
    
}





module.exports ={
    busquedaTotal,
    busquedaColeccion
}