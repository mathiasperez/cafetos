/*
    Investigadores
    ruta: '/api/investigadores'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getInvestigadores, 
    crearInvestigador,
    actualizarInvestigador,
    eliminarInvestigador
} = require('../controllers/investigadores.controller')


const router = Router();

router.get( '/', getInvestigadores );

router.post( '/',
    [
        validarJWT,
        check('nombre','El nombre del investigador es necesario').not().isEmpty(),
        check('proyecto','El id del proyecto debe de ser válido').isMongoId(),
        validarCampos
    ], 
    crearInvestigador 
);

router.put( '/:id',
    [
        validarJWT,
        check('nombre','El nombre del investigador es necesario').not().isEmpty(),
        check('proyecto','El id del proyecto debe de ser válido').isMongoId(),
        validarCampos
    ],
    actualizarInvestigador
);

router.delete( '/:id',
    eliminarInvestigador
);



module.exports = router;


