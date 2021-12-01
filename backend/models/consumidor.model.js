const {Schema, model, SchemaTypes} = require('mongoose');

//Definicion del esquema para la coleccion de Consumidor

const ConsumidorSchema = Schema({
    nombreUsuario:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
},{collecion: 'consumidores'});

//Configuracion opcional para cambiar el _id por uid
//Este cambio es solo para fines visuales, la bd permanece con _id
ConsumidorSchema.method('toJSON', function(){
    const {__v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

//Se ha creado el schema, ahora necesitamos implementar el modelo
//Se exporta el modelo
//Por defecto moongose creara en mongodb un documento en plural: usuarios
module.exports = model ('Consumidor', ConsumidorSchema);


