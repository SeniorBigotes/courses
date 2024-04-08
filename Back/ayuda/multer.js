const multer = require('multer');
const { v4: uuidv4 } = require('uuid'); // genera nombre de archivo unico
const { descomprimir } = require('./helpers');

const nombreUnico = generarNombre(); // generar nombre de archivo unico

const storage = multer.diskStorage({
    filename: (res, file, callback) => { // nombre del archivo
        console.log('multer', file)
        const extension = file.originalname.split('.').pop(); // obtener la extension del archivo
        if(extension === '.zip') {
            descomprimir('../public/files_zip');
        }
        const nombreArchivo = nombreUnico
        callback(null, `${nombreArchivo}.${extension}`);
    },
    destination: (res, file, callback) => { // donde se va a almacenar
        callback(null, './public');
    }
});

function generarNombre() {
    return `${uuidv4()}`;
}

module.exports = {
    storage,
    nombreUnico,
    generarNombre,
}