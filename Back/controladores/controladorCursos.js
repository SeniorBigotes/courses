// En controladorCursos.js
const { almacenarArchivos, leerArchivosZip, eliminarArchivos, verificarArchivos, renombreCarpeta, ultimoELemento } = require('../ayuda/helpers');
const { miniaturas, cursos, primeraEjecucion } = require('../ayuda/multer');
const connection = require('../conexionSQL');

// Operación CRUD: Crear un nuevo curso
async function crearCurso(req, res) {
    if(primeraEjecucion[0]) {
        while(primeraEjecucion.length !== 1) primeraEjecucion.shift();

        const { tema, titulo, descripcion, usuarioID } = req.body;
        
        // rutas general y de rehubicacion
        const miniaturasRuta = `public/${usuarioID}/miniaturas`;
        const cursosRuta = `public/${usuarioID}/cursos`;
        const rutaOrigen = 'public/upload';
    
        // archivos a manejar
        const cursoUltimo = ultimoELemento(cursos);
        const miniaturaUltima = ultimoELemento(miniaturas);
        
        // leer contendio de los archivos comprimidos
        let contenidoArchivosZip;
        await leerArchivosZip(`${rutaOrigen}/${cursoUltimo}`, cursosRuta)
            .then(contenido => contenidoArchivosZip = contenido)
            .catch(err => console.log('error al leer (Promesa)', err));
    
        // ruta establecida de los archivos
        const miniAlmacenadas = await almacearMiniaturas(miniaturaUltima, rutaOrigen, miniaturasRuta);
        const cursosAlmacenados = await almacenarCursos(cursoUltimo, rutaOrigen, cursosRuta);

        // renombrar carpeta
        renombreCarpeta(contenidoArchivosZip, cursosRuta, titulo);
    
        // conexion a sql
        if(cursosAlmacenados[0] && miniAlmacenadas[0] && contenidoArchivosZip) {
            const duracion = contenidoArchivosZip.length;
            const miniatura = miniaturaUltima;
            const miniatura_url = miniAlmacenadas[1];
            
            const insertCursos = `insert into 
            cursos (titulo, descripcion, duracion, miniatura, miniatura_url, tema, usuario_id)
            values ('${titulo}', '${descripcion}', ${duracion}, '${miniatura}', '${miniatura_url}', '${tema}', ${usuarioID})`;
        
            const seleccion = 'select * from usuarios';
    
            let error;
            connection.query(insertCursos, (err, result) => {
                if(err) {
                    console.log('Error al subir a la base de datos');
                    error = err;
                } else {
                    const curso_id = result.insertId;
                    contenidoArchivosZip.forEach(contenido => {
                        const insertLecciones = `insert into lecciones (nombre, ubicacion, curso_id) 
                                                values ('${contenido.nombre}', '${contenido.ruta}', ${curso_id})`;
                        connection.query(insertLecciones, (err, result) => {
                            if(err) error = err;
                        });
                    });
                }
            });

            error ? 
                res.status(500).json({mensaje: 'Error al crear el curso', error}) :
                res.status(201).json({mensaje: 'Curso creado con exito'});
        }
    } else {
        const archivosTotales = [miniaturas, cursos];
        while(primeraEjecucion.length !== 1) primeraEjecucion.shift();
        archivosTotales.forEach(archivos => {
            archivos.forEach(async archivo => {
                const ruta = `public/upload/${archivo}`;
                const existe = verificarArchivos(ruta);
                if(existe) eliminarArchivos(ruta);
            });
        });
    }
}

// almacenar, descomprimir, rehubicar, leer contenido y eliminar residuos
async function almacenarCursos(cursos, rutaOrigen, rutaDestino) {
    const promesas = await almacenarArchivos(cursos, rutaOrigen, rutaDestino);
    return await Promise.all(promesas); // esperar a que se cumplan todas las promesas
}

// almacenar, rehubicar contenido y eliminar residuos
async function almacearMiniaturas(miniaturas, rutaOrigen, rutaDestino) {
    const promesas = await almacenarArchivos(miniaturas, rutaOrigen, rutaDestino);
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
