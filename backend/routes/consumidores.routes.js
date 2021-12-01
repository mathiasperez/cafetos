/*
    Path: /api/consumidores
*/

const { Router } = require('express');
const { check } =  require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getConsumidores,crearConsumidor,actualizarConsumidor,eliminarConsumidor } = require('../controllers/consumidores.controller');
const { validarJWT } = require ('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getConsumidores);
router.post('/',
    [
        check('nombreUsuario', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('password','El password es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        validarCampos,
    ] ,
    crearConsumidor);
router.put('/:id',
    [
        validarJWT,
        check('nombreUsuario', 'El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        validarCampos,   
    ] ,
    actualizarConsumidor);

router.delete('/:id',validarJWT, eliminarConsumidor);


module.exports = router;