const express = require('express');
const router = express.Router();
const { crearCurso, obtenerCursos, obtenerCursoPorId, actualizarCurso, eliminarCurso } = require('../controladores/controladorCursos');

// multer
const multer = require('multer');
const { storage } = require('../ayuda/multer');

// descarga de archivos en la carpeta general
const upload = multer({ storage });

// Rutas para cursos
router.post('/', upload.fields([{name: 'archivo'}, {name: 'miniatura'}]), crearCurso);
router.get('/', obtenerCursos);
router.get('/:id', obtenerCursoPorId);
router.put('/:id', actualizarCurso);
router.delete('/:id', eliminarCurso);


module.exports = router;