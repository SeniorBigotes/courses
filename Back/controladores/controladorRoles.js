const connection = require('../conexionSQL');

function obtenerRolPorID(req, resp) {

    const rolID = req.params.id;

    connection.query('SELECT nombre FROM roles where id = ?', rolID, (error, results) => {
        if(error) {
            console.error('Error al obtener el rol');
            resp.status(500).json({error: 'Error al obtener el rol'});
        } else {
            if(results.length > 0) {
                resp.status(200).json(results[0]);
            } else {
                resp.status(404).json({error: 'Rol no encontrado'});
            }
        }
    });
}

module.exports = {
    obtenerRolPorID,
}