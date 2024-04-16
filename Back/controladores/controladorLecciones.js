// En controladorLecciones.js
const connection = require('../conexionSQL');

// Operación CRUD: Crear una nueva lección
function crearLeccion(req, res) {
    const { titulo, contenido_txt, contenido_vlc, curso_id } = req.body;

    const nuevaLeccion = {
        titulo,
        contenido_txt,
        contenido_vlc,
        curso_id
    };

    connection.query('INSERT INTO lecciones SET ?', nuevaLeccion, (error, result) => {
        if (error) {
            console.error('Error al crear lección: ', error);
            res.status(500).json({ error: 'Error al crear lección' });
        } else {
            res.status(201).json({ mensaje: 'Lección creada correctamente' });
        }
    });
}

// Operación CRUD: Leer todas las lecciones
function obtenerLecciones(req, res) {
    const cursoID = req.params.id;

    connection.query('SELECT * FROM lecciones WHERE curso_id = ? ORDER BY id ASC', cursoID, (error, results) => {
        if (error) {
            console.error('Error al obtener lecciones: ', error);
            res.status(500).json({ error: 'Error al obtener lecciones' });
        } else {
            res.status(200).json(results);
        }
    });
}

// Operación CRUD: Leer una lección por su ID
function obtenerLeccionPorId(req, res) {
    const cursoID = req.params.cursoID;
    const leccion = req.params.leccion;
    let tumbnaiUrl;
    connection.query(`SELECT ubicacion FROM lecciones WHERE curso_id = ${cursoID} AND nombre = '${leccion}'`, (err, result) => {
        if(err) {
                res.status(404).send('Leccion no encontrada');
        } else {
            tumbnaiUrl = `${process.env.URL}/${result[0].ubicacion}`;
            res.status(200).json({tumbnaiUrl});
        }
    })
}

// Operación CRUD: Actualizar una lección por su ID
function actualizarLeccion(req, res) {
    const idLeccion = req.params.id;
    const { titulo, contenido_txt, contenido_vlc, curso_id } = req.body;

    const leccionActualizada = {
        titulo,
        contenido_txt,
        contenido_vlc,
        curso_id
    };

    connection.query('UPDATE lecciones SET ? WHERE id = ?', [leccionActualizada, idLeccion], (error, result) => {
        if (error) {
            console.error('Error al actualizar lección: ', error);
            res.status(500).json({ error: 'Error al actualizar lección' });
        } else {
            res.status(200).json({ mensaje: 'Lección actualizada correctamente' });
        }
    });
}

// Operación CRUD: Eliminar una lección por su ID
function eliminarLeccion(req, res) {
    const idLeccion = req.params.id;

    connection.query('DELETE FROM lecciones WHERE id = ?', [idLeccion], (error, result) => {
        if (error) {
            console.error('Error al eliminar lección: ', error);
            res.status(500).json({ error: 'Error al eliminar lección' });
        } else {
            res.status(200).json({ mensaje: 'Lección eliminada correctamente' });
        }
    });
}

module.exports = {
    crearLeccion,
    obtenerLecciones,
    obtenerLeccionPorId,
    actualizarLeccion,
    eliminarLeccion
};
