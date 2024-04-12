// En controladorCursos.js
const { almacenarArchivos, leerArchivosZip } = require('../ayuda/helpers');
const { miniaturas, cursos } = require('../ayuda/multer');
const connection = require('../conexionSQL');

// Operación CRUD: Crear un nuevo curso
async function crearCurso(req, res) {
    const { tema, titulo, descripcion, usuarioID } = req.body;

    // console.log(`files\n`, req.files);
    // console.log(`body\n`, req.body);

    // console.log('miniaturas', miniaturas);
    // console.log('cursos', cursos);
    
    const miniaturasRuta = `public/${usuarioID}/miniaturas`;
    const cursosRuta = `public/${usuarioID}/cursos`;
    const rutaOrigen = 'public/upload';

    const contenidoArchivosZip = await leerArchivosZip(`${rutaOrigen}/${cursos}`, cursosRuta);
    const miniAlmacenadas = await almacearMiniaturas(miniaturas, rutaOrigen, miniaturasRuta);
    const cursosAlmacenados = await almacenarCursos(cursos, rutaOrigen, cursosRuta);
    
    // console.log('cursos:', cursosAlmacenados[0]);
    // console.log('miniaturas:', miniAlmacenadas[0][1]);
    // console.log('contenido:', contenidoArchivosZip);
    
    if(cursosAlmacenados[0] && miniAlmacenadas[0]) {
        const duracion = contenidoArchivosZip.length;
        const miniatura = req.files.miniatura.filename;
        const miniatura_url = miniAlmacenadas[0][1]
        
        const insertCursos = `insert into 
        cursos (titulo, descripcion, duracion, miniatura, miniatura_url, tema, usuario_id)
        values ('${titulo}', '${descripcion}', ${duracion}, '${miniatura}', '${miniatura_url}', '${tema}', ${usuarioID})`;
    
        const seleccion = 'select * from usuarios'

        connection.query(insertCursos, (err, result) => {
            if(err) {
                console.log('Error al subir a la base de datos');
            } else {
                const curso_id = result.insertId;
                contenidoArchivosZip.forEach(contenido => {
                    const insertLecciones = `insert into lecciones (nombre, ubicacion, curso_id) 
                                            values ('${contenido.nombre}', '${contenido.ruta}', ${curso_id})`;
                    connection.query(insertLecciones, (err, result) => {
                        if(err) console.log('Error al insertar:', err)
                    });
                });
            }
        });
    }
}

async function almacenarCursos(cursos, rutaOrigen, rutaDestino) {
    const promesas = cursos.map(curso => almacenarArchivos(curso, rutaOrigen, rutaDestino));
    return await Promise.all(promesas); // esperar a que se cumplan todas las promesas
}

async function almacearMiniaturas(miniaturas, rutaOrigen, rutaDestino) {
    const promesas =  miniaturas.map(miniatura => almacenarArchivos(miniatura, rutaOrigen, rutaDestino));
    return await Promise.all(promesas);
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
