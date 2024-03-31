// En controladorCursos.js
const connection = require('../conexionSQL');

// Operación CRUD: Crear un nuevo curso
function crearCurso(req, res) {
    const { nombre_C, duracion, descripcion } = req.body;

    const nuevoCurso = {
        nombre_C,
        duracion,
        descripcion
    };

    connection.query('INSERT INTO cursos SET ?', nuevoCurso, (error, result) => {
        if (error) {
            console.error('Error al crear curso: ', error);
            res.status(500).json({ error: 'Error al crear curso' });
        } else {
            res.status(201).json({ mensaje: 'Curso creado correctamente' });
        }
    });
}

// Operación CRUD: Leer todos los cursos
function obtenerCursos(req, res) {
    connection.query('SELECT * FROM cursos', (error, results) => {
        if (error) {
            console.error('Error al obtener cursos: ', error);
            res.status(500).json({ error: 'Error al obtener cursos' });
        } else {
            res.status(200).json(results);
        }
    });
}

// Operación CRUD: Leer un curso por su ID
function obtenerCursoPorId(req, res) {
    const idCurso = req.params.id;

    connection.query('SELECT * FROM cursos WHERE id = ?', [idCurso], (error, results) => {
        if (error) {
            console.error('Error al obtener curso: ', error);
            res.status(500).json({ error: 'Error al obtener curso' });
        } else {
            if (results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).json({ mensaje: 'Curso no encontrado' });
            }
        }
    });
}

// Operación CRUD: Actualizar un curso por su ID
function actualizarCurso(req, res) {
    const idCurso = req.params.id;
    const { nombre_C, duracion, descripcion } = req.body;

    const cursoActualizado = {
        nombre_C,
        duracion,
        descripcion
    };

    connection.query('UPDATE cursos SET ? WHERE id = ?', [cursoActualizado, idCurso], (error, result) => {
        if (error) {
            console.error('Error al actualizar curso: ', error);
            res.status(500).json({ error: 'Error al actualizar curso' });
        } else {
            res.status(200).json({ mensaje: 'Curso actualizado correctamente' });
        }
    });
}

// Operación CRUD: Eliminar un curso por su ID
function eliminarCurso(req, res) {
    const idCurso = req.params.id;

    connection.query('DELETE FROM cursos WHERE id = ?', [idCurso], (error, result) => {
        if (error) {
            console.error('Error al eliminar curso: ', error);
            res.status(500).json({ error: 'Error al eliminar curso' });
        } else {
            res.status(200).json({ mensaje: 'Curso eliminado correctamente' });
        }
    });
}

module.exports = {
    crearCurso,
    obtenerCursos,
    obtenerCursoPorId,
    actualizarCurso,
    eliminarCurso
};
