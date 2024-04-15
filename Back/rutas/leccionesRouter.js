const express = require('express');
const { obtenerLecciones, obtenerLeccionPorId } = require('../controladores/controladorLecciones');
const router = express.Router();

// Rutas para cursos
// router.post('/', crearCurso); // Crear un nuevo curso
router.get('/:id', obtenerLecciones); // Obtener todos los cursos
router.get('/:cursoID/:leccion', obtenerLeccionPorId); // Obtener un curso por su ID
// router.put('/:id', actualizarCurso); // Actualizar un curso por su ID
// router.delete('/:id', eliminarCurso); // Eliminar un curso por su ID

module.exports = router;
