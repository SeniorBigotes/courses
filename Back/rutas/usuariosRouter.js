const express = require('express');
const router = express.Router();
const { crearUsuario, obtenerUsuarios, obtenerUsuarioPorId, obtenerUsuarioPorUsername, actualizarUsuario, eliminarUsuario, 
    buscarUsuarios, buscarUsername, totalUsuarios } = require('../controladores/controladorUsuarios');

// Rutas para usuarios
router.get('/total', totalUsuarios);
router.get('/busqueda/:buscar', buscarUsuarios); // busqueda de usuario por nombre completo
router.get('/username/:username', buscarUsername); // busqueda de usuario por username
router.get('/inicio/:username', obtenerUsuarioPorUsername);
router.get('/:id', obtenerUsuarioPorId); // Obtener un usuario por su ID
router.get('/:limite/:pagina', obtenerUsuarios); // Obtener todos los usuarios

router.post('/', crearUsuario); // Crear un nuevo usuario
router.put('/:id', actualizarUsuario); // Actualizar un usuario por su ID
router.delete('/:id', eliminarUsuario); // Eliminar un usuario por su ID

module.exports = router;
