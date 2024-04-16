const express = require('express');
const cors = require('cors');

const connection = require('./conexionSQL');

const usuariosRouter = require('./rutas/usuariosRouter');
const cursosRouter = require('./rutas/cursosRouter');
const leccionesRouter = require('./rutas/leccionesRouter');
const rolesRouter = require('./rutas/rolesRouter');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());
app.use(cors());

// servir archivos estaticos
app.use('/public', express.static('./public'));

// Rutas
app.use('/api/usuarios', usuariosRouter);
app.use('/api/cursos', cursosRouter);
app.use('/api/lecciones', leccionesRouter);
app.use('/api/roles', rolesRouter);

// Escuchar en el puerto
app.listen(PORT, '0.0.0.0',() => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
