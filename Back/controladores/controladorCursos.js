// En controladorCursos.js
const { almacenarArchivos } = require('../ayuda/helpers');
const { miniaturas, cursos } = require('../ayuda/multer');
const connection = require('../conexionSQL');

// Operación CRUD: Crear un nuevo curso
async function crearCurso(req, res) {
    // console.log(`files\n`, req.files);
    // console.log(`body\n`, req.body);

    // console.log('miniaturas', miniaturas);
    // console.log('cursos', cursos);
    
    const { tema, titulo, descripcion, usuarioID, username } = req.body;
    const miniaturasRuta = `public/${usuarioID}/miniaturas`;
    const cursosRuta = `public/${usuarioID}/cursos`;
    const rutaOrigen = 'public/upload';

    const miniAlmacenadas = await almacearMiniaturas(miniaturas, rutaOrigen, miniaturasRuta);
    const cursosAlmacenados = await almacenarCursos(cursos, rutaOrigen, cursosRuta);
    
    console.log(cursosAlmacenados[0]);
    console.log(miniAlmacenadas[0]);

    /*
    const insertCursos = `insert into cursos (titulo, descripcion, duracion, miniatura, miniatrua_url, tema, usuario_id)
                        values ('${titulo}', '${descripcion}', 12, '${nombreMiniatura}', './sin_ruta', '${tema}', ${usuarioID})`;

    const insertarLecciones = `insert into lecciones (titulo, alias, ubicacion, curso_id) 
                        values ('leccion1', '${''}', './sin_ubicacion', 1)`;

    connection.query('select titulo from cursos where id = 1', (error, result) => {
        if (error) {
            console.error('Error al crear curso: ', error);
            res.status(500).json({ error: 'Error al crear curso' });
        } else {

            res.status(201).json({ mensaje: 'Curso creado correctamente' });
            console.log(`Curso creado correctamente\n`);
        }
    });
    */
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
