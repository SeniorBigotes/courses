const multer = require('multer');
const { v4: uuidv4 } = require('uuid'); // genera nombre de archivo unico

const storage = multer.diskStorage({
    filename: (req, file, callback) => { // nombre del archivo
        const extension = file.originalname.split('.').pop(); // obtener la extension del archivo
        const nombreArchivo = generarNombre(); // generar nombre unico

        extension === 'zip' ?
            cursos.push(`${nombreArchivo}.${extension}`) :
            miniaturas.push(`${nombreArchivo}.${extension}`);
        
        callback(null, `${nombreArchivo}.${extension}`);
    },
    destination: (req, file, callback) => callback(null, './public/upload'), // donde se va a almacenar
});

function generarNombre() { 
    return `${uuidv4()}`;
}

let miniaturas = [];
let cursos = [];

module.exports = {
    storage,
    generarNombre,
    miniaturas,
    cursos,
}