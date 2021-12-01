const { response } = require('express');

const Investigador = require('../models/investigador.model');

const getInvestigadores = async(req, res = response) => {

    const investigadores = await Investigador.find()
                                .populate('usuario','nombre img')
                                .populate('proyecto','nombre img')


    res.json({
        ok: true,
        investigadores: investigadores
    })
}

const crearInvestigador = async (req, res = response) => {

    const uid = req.uid;
    const investigador = new Investigador({
        usuario: uid,
        ...req.body
    });


    try {

        const investigadorDB = await investigador.save();

        
        res.json({
            ok: true,
            investigador: investigadorDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede crear investigador, consulte con el administrador'
        })
    }


}

const actualizarInvestigador = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const investigador = await Investigador.findById( id );

        if ( !investigador ) {
            return res.status(404).json({
                ok: true,
                msg: 'Investigador no encontrado por id',
            });
        }

        const cambiosInvestigador = {
            ...req.body,
            usuario: uid
        }

        const investigadorActualizado = await Investigador.findByIdAndUpdate( id, cambiosInvestigador, { new: true } );


        res.json({
            ok: true,
            investigador: investigadorActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar investigador, consulte con el administrador'
        })
    }

}

const eliminarInvestigador = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const investigador = await Investigador.findById( id );

        if ( !investigador ) {
            return res.status(404).json({
                ok: true,
                msg: 'Investigador no encontrado por id',
            });
        }

        await Investigador.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Investigador borrado'
        }); 

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Investigador no puede eliminarse, consulte con el administrador'
        })
    }

}



module.exports = {
    getInvestigadores,
    crearInvestigador,
    actualizarInvestigador,
    eliminarInvestigador
}