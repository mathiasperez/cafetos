const { response } = require('express');
const bcrypt = require('bcryptjs');
const Consumidor = require('../models/consumidor.model');


const getConsumidores = async (req, res)=>{

    const consumidores = await Consumidor.find();
    

    res.json({
        ok:true,
        consumidores
    });
}

const crearConsumidor = async(req, res=response)=>{

    //console.log(req.body);
    const {email,password,nombreUsuario} = req.body;

    try {

        const existeEmail = await Consumidor.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg: 'El email ya ha sido registrado'
            });
        }

        const existeConsumidor = await Consumidor.findOne({nombreUsuario});
        if(existeConsumidor){
            return res.status(400).json({
                ok:false,
                msg: 'El nombre de usuario ya ha sido registrado'
            });
        }

        //creamos un objeto de la clase model Consumidor
        const consumidor = new Consumidor(req.body);

        // Encriptar password
        const salt = bcrypt.genSaltSync();
        consumidor.password = bcrypt.hashSync(password, salt);

        //indicamos a mongoose que registre al consumidor en la bd
        await consumidor.save();

        
        res.json({
            ok:true,
            consumidor
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error en el servidor, revisar logs'
        });
    }  
} 

const actualizarConsumidor = async (req, res= response)=>{
    const uid = req.params.id;
        
    try {
        const consumidorDB = await Consumidor.findById(uid);

        if (!consumidorDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un consumidor con ese id'
            });
        }

        //Codigo previo a la actualizacion 
        const {password, email, ...campos} = req.body;
        if(consumidorDB.email !== email){
            const existeEmail = await Consumidor.findOne({email});
            if (existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un consumidor con este email'
                });
            }
        }
        campos.email = email;
               
        //actualizacion de datos
        const consumidorActualizado = await Consumidor.findByIdAndUpdate(uid, campos, {new:true});

        res.json({
            ok:true,
            consumidor: consumidorActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al actualizar consumidor'
        });
    }
}

const eliminarConsumidor = async(req, res=response) =>{
    const uid = req.params.id;
    try {
        const consumidorDB = await Consumidor.findById(uid);
        if(!consumidorDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un consumidor con ese id'
            });
        }

        await Consumidor.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg: 'Consumidor eliminado de la bd'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'No es posible eliminar consumidor'
        });
    }
}


module.exports = {
    getConsumidores,
    crearConsumidor,
    actualizarConsumidor,
    eliminarConsumidor
}

