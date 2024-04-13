const multer = require('multer');
const { v4: uuidv4 } = require('uuid'); // genera nombre de archivo unico
const { crearVerificarCarpetas } = require('./helpers');

const storage =  multer.diskStorage({
    filename: (req, file, callback) => { // nombre del archivo
        const extension = file.originalname.split('.').pop(); // obtener la extension del archivo
        const nombreArchivo = generarNombre(); // generar nombre unico

        extension === 'zip' || extension === 'rar' || extension === '7z' ?
            cursos.push(`${nombreArchivo}.${extension}`) :
            miniaturas.push(`${nombreArchivo}.${extension}`);
        
        callback(null, `${nombreArchivo}.${extension}`);
        primeraEjecucion.push(true);
    },
    destination: async (req, file, callback) => { // donde se va a almacenar
        const rutaPrincipal = './public/upload';
        const rutaPrincipalExistente = await crearVerificarCarpetas(rutaPrincipal);
        if(rutaPrincipalExistente) callback(null, `${rutaPrincipal}`);
    },
});

function generarNombre() { 
    return `${uuidv4()}`;
}

let primeraEjecucion = [false]
let miniaturas = [];
let cursos = [];

module.exports = {
    storage,
    generarNombre,
    miniaturas,
    cursos,
    primeraEjecucion
}