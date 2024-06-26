
const connection = require('../conexionSQL');

// Operación CRUD: Crear un nuevo usuario
function crearUsuario(req, res) {
    const { nombres, apellido_P, apellido_M, nombre_U, contraseña, rol_id } = req.body;

    const nuevoUsuario = {
        nombres,
        apellido_P,
        apellido_M,
        nombre_U,
        contraseña,
        rol_id
    };

    connection.query('INSERT INTO usuarios SET ?', nuevoUsuario, (error, result) => {
        if (error) {
            console.error('Error al crear usuario: ', error);
            res.status(500).json({ error: 'Error al crear usuario' });
        } else {
            res.status(201).json({ mensaje: 'Usuario creado correctamente' });
        }
    });
}

// Operación CRUD: Leer todos los usuarios
function obtenerUsuarios(req, res) {
    const pagina = req.params.pagina || 1;
    const limite = req.params.limite || 10;
    const offset = (pagina - 1) * limite;

    connection.query(`SELECT * FROM usuarios LIMIT ${limite} OFFSET ${offset}`, (error, results) => {
        if (error) {
            console.error('Error al obtener usuarios: ', error);
            res.status(500).json({ error: 'Error al obtener usuarios' });
        } else {
            res.status(200).json(results);
        }
    });
}

function totalUsuarios(req, res) {
    connection.query('SELECT COUNT(*) AS total FROM usuarios', (err, results) => {
        if(err) {
            res.status(500).json({mensaje: 'Error al obtener usuarios'});
        } else {
            res.status(200).json(results);
        }
    })
}

// Operación CRUD: Leer un usuario por su ID
function obtenerUsuarioPorId(req, res) {
    const idUsuario = req.params.id;

    connection.query('SELECT * FROM usuarios WHERE id = ?', [idUsuario], (error, results) => {
        if (error) {
            console.error('Error al obtener usuario: ', error);
            res.status(500).json({ error: 'Error al obtener usuario' });
        } else {
            if (results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).json({ mensaje: 'Usuario no encontrado' });
            }
        }
    });
}

// Obtener usuario por nombre de usuario
function obtenerUsuarioPorUsername(req, res) {
    const username = req.params.username;

    connection.query('SELECT id, nombre_U, contraseña, rol_id FROM usuarios WHERE nombre_U = ?', username, (error, result) => {
        if(error) {
            console.error('Error al obtener usuario');
            res.status(500).json({error: 'Error al obtener usuario'});
        } else {
            if(result.length > 0) {
                res.status(200).json(result[0])
            } else {
                res.status(404).json({message: 'Usuario no encontrado'});
            }
        }
    });
}

// buscar usuarios por nombre, apellido_P o apellido_M
function buscarUsuarios(req, res) {
    const buscar = req.params.buscar;
    const pagina = req.params.pagina || 1;
    const limite = req.params.limite || 10;
    const offset = (pagina - 1) * limite;

    connection.query(`
        SELECT * FROM usuarios WHERE CONCAT(nombres, ' ', apellido_P, ' ', apellido_M) 
        LIKE '%${buscar}%' LIMIT ${limite} OFFSET ${offset}`,
    (error, result) => {
        if(error) {
            console.error('Error al buscar el usuario');
            response.status(500).json({error: 'Error al buscar el usuario'});
        } else {
            if(result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(404).json({message: 'Usuario no existente'});
            }
        }
    })
}

// Buscar usuarios por username
function buscarUsername(req, res) {
    const username = req.params.username;
    
    connection.query(`select nombres, apellido_P, apellido_M from usuarios where nombre_U = '${username}'`, (error, result) => {
        if(error) {
            console.error('Error al buscar el usuario');
            response.status(500).json({error: 'Error al buscar el usuario'});
        } else {
            if(result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(404).json({message: 'Usuario no existente'});
            }
        }
    })
}

// Operación CRUD: Actualizar un usuario por su ID
function actualizarUsuario(req, res) {
    const idUsuario = req.params.id;
    const { nombres, apellido_P, apellido_M, nombre_U, contraseña, rol_id } = req.body;

    const usuarioActualizado = {
        nombres,
        apellido_P,
        apellido_M,
        nombre_U,
        contraseña,
        rol_id
    };

    connection.query('UPDATE usuarios SET ? WHERE id = ?', [usuarioActualizado, idUsuario], (error, result) => {
        if (error) {
            console.error('Error al actualizar usuario: ', error);
            res.status(500).json({ error: 'Error al actualizar usuario' });
        } else {
            res.status(200).json({ mensaje: 'Usuario actualizado correctamente' });
        }
    });
}

// Operación CRUD: Eliminar un usuario por su ID
function eliminarUsuario(req, res) {
    const idUsuario = req.params.id;

    connection.query('DELETE FROM usuarios WHERE id = ?', [idUsuario], (error, result) => {
        if (error) {
            console.error('Error al eliminar usuario: ', error);
            res.status(500).json({ error: 'Error al eliminar usuario' });
        } else {
            res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
        }
    });
}

module.exports = {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    obtenerUsuarioPorUsername,
    buscarUsuarios,
    buscarUsername,
    actualizarUsuario,
    eliminarUsuario,
    totalUsuarios,
};
