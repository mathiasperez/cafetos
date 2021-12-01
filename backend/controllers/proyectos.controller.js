const { response } = require('express');

const Proyecto = require('../models/proyecto.model');


const getProyectos = async(req, res = response) => {

    const proyectos = await Proyecto.find()
                                    .populate('usuario','nombre img');

    res.json({
        ok: true,
        proyectos
    })
}

const crearProyecto = async(req, res = response) => {

    const uid = req.uid;
    const proyecto = new Proyecto({ 
        usuario: uid,
        ...req.body 
    });

    try {
        
        const proyectoDB = await proyecto.save();
        
        res.json({
            ok: true,
            proyecto: proyectoDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al grabar proyecto, consulte con el administrador'
        })
    }

}

const actualizarProyecto = async (req, res = response) => {
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const proyecto = await Proyecto.findById( id );

        if ( !proyecto ) {
            return res.status(404).json({
                ok: true,
                msg: 'Proyecto no encontrado por id',
            });
        }

        const cambiosProyecto = {
            ...req.body,
            usuario: uid
        }

        const proyectoActualizado = await Proyecto.findByIdAndUpdate( id, cambiosProyecto, { new: true } );


        res.json({
            ok: true,
            proyecto: proyectoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar el proyecto, consulte con el administrador'
        })
    }

}

const eliminarProyecto = async(req, res = response) => {

    const id  = req.params.id;

    try {
        
        const proyecto = await Proyecto.findById( id );

        if ( !proyecto ) {
            return res.status(404).json({
                ok: true,
                msg: 'Proyecto no encontrado por id',
            });
        }

        await Proyecto.findByIdAndDelete( id );


        res.json({
            ok: true,
            msg: 'El Proyecto se ha eliminado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar el proyecto, consulte con el administrador'
        })
    }
}

module.exports = {
    getProyectos,
    crearProyecto,
    actualizarProyecto,
    eliminarProyecto
}