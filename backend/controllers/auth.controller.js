const { response } = require("express");
const bcrypt = require('bcryptjs');

const Consumidor = require ('../models/consumidor.model');
const { generarJWT } =  require('../helpers/jwt')


const login = async(req, res= response)=> {
    const { email, password } = req.body;

    try {
        
        // Verificar al consumidor por su email
        const consumidorDB = await Consumidor.findOne({ email });

        if ( !consumidorDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Verificar password
        const validPassword = bcrypt.compareSync( password, consumidorDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Invalid Password'
            });
        }

        // Generar el TOKEN - JWT
        const token = await generarJWT( consumidorDB.id );

        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el administrador'
        })
    }

}

module.exports = {
    login
}