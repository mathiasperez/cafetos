/*
    path: api/uploads/
*/

const { Router, application } = require('express');
const expressFileUpload = require('express-fileupload');

const { fileUpload, verImagen } = require('../controllers/uploads.controller');
const { validarJWT } = require ('../middlewares/validar-jwt');


const router = Router();

router.use(expressFileUpload()); // da acceso a files que se adjunten en el body

router.put( '/:tipocoleccion/:id', validarJWT , fileUpload );
router.get( '/:tipocoleccion/:imagen', verImagen );





module.exports = router;