const express = require('express');
const router = express.Router();
const { crearCurso, obtenerCursos, obtenerCursoPorId, actualizarCurso, eliminarCurso, obtenerMiniaturaId, porID, porUsuario } = require('../controladores/controladorCursos');

// multer
const multer = require('multer');
const { storage } = require('../ayuda/multer');

// descarga de archivos en la carpeta general
const upload = multer({ storage });

// Rutas para cursos
router.post('/', upload.fields([{name: 'archivo'}, {name: 'miniatura'}]), crearCurso);
router.get('/', obtenerCursos);
router.get('/por_id/:ordenar', porID);
router.get('/por_usuario/:userID', porUsuario);
router.get('/miniaturas/:cursoID', obtenerMiniaturaId);
router.get('/:id', obtenerCursoPorId);
router.put('/:id', actualizarCurso);
router.delete('/:id', eliminarCurso);


module.exports = router;