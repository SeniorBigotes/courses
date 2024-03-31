// rolesRouter.js
const express = require('express');
const router = express.Router();
const controlador = require('../controladores/controladorRoles');

// Rutas CRUD para roles
// router.post('/', crearRol);
// router.get('/', obtenerRoles);
router.get('/:id', controlador.obtenerRolPorID);
// router.put('/:id', actualizarRol);
// router.delete('/:id', eliminarRol);

module.exports = router;
