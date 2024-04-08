const express = require('express');
const router = express.Router();
const { crearCurso, obtenerCursos, obtenerCursoPorId, actualizarCurso, eliminarCurso } = require('../controladores/controladorCursos');

// multer
const multer = require('multer');
const { storage } = require('../ayuda/multer') 

const subir = multer({storage});

// Rutas para cursos
router.post('/', subir.fields([{name: 'archivo'}, {name: 'miniatura'}]), crearCurso); // Crear un nuevo curso
router.get('/', obtenerCursos); // Obtener todos los cursos
router.get('/:id', obtenerCursoPorId); // Obtener un curso por su ID
router.put('/:id', actualizarCurso); // Actualizar un curso por su ID
router.delete('/:id', eliminarCurso); // Eliminar un curso por su ID

module.exports = router;


//  ORDEN DE EJECUCION DE MULTER