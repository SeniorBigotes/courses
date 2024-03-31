// progresoUsuariosRouter.js
const express = require('express');
const router = express.Router();
const { registrarProgresoUsuario, obtenerProgresoUsuario, obtenerProgresoPorUsuarioYCurso, eliminarProgresoUsuario } = require('../controladores/progresoUsuariosController');

// Rutas CRUD para el progreso de usuarios
router.post('/', registrarProgresoUsuario);
router.get('/', obtenerProgresoUsuario);
router.get('/:usuarioId/:cursoId', obtenerProgresoPorUsuarioYCurso);
router.delete('/:id', eliminarProgresoUsuario);

module.exports = router;
