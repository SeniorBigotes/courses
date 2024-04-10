const AdmZip = require('adm-zip');
const fs = require('fs'); // modificacion de archivos del sistema

// verificar si existe la carpeta
async function almacenarArchivos(nombreArchivo, rutaOrigen, rutaDestino) {
    let extraccion, renombrar, eliminar;
    const extension = nombreArchivo.split('.').pop();
    const rutaArchivoOrigen = `${rutaOrigen}/${nombreArchivo}`;
    const rutaExistente = await crearVerificarCarpetas(rutaDestino);
    
    if(rutaExistente) {
        if(extension === 'zip' || extension === 'rar' || extension === '.7z') {
            extraccion = await descomprimir(rutaOrigen, rutaDestino, nombreArchivo);
        } else {
            renombrar = await renombrarRehubicar(rutaArchivoOrigen, rutaDestino, 5);
        }
        /*
        extension == 'zip' || extension === 'rar' || extension === '.7z' ? 
        extraccion = await descomprimir(rutaOrigen, rutaDestino) :
        renombrar = await renombrarRehubicar(rutaOrigen, rutaDestino, 5)
        */

        extraccion = true;
        renombrar = true;
        eliminar = await eliminarArchivos(rutaArchivoOrigen);
    }

    if(rutaExistente && extraccion && renombrar) {
        return true;
    } else {
        return false;
    }
}

// verificar y crea carpetas que se especifiquen
async function crearVerificarCarpetas(rutaCarpeta) {
    let carpetaExistente = fs.existsSync(rutaCarpeta);
    let count = 0;

    // existe?
    while(!carpetaExistente && count < 5) {
        fs.mkdirSync(rutaCarpeta, { recursive: true });
        count++;
        await new Promise(resolve => setTimeout(resolve, 1000));
        carpetaExistente = fs.existsSync(rutaCarpeta);
    }

    return count < 5 ? true : false;
}

// descomprimir archivos
async function descomprimir(rutaOrigen, rutaDestino, nombreArchivo) {
    const rutaArchivo = `${rutaOrigen}/${nombreArchivo}`;
    let count = 0;
    let retorno;
    while(count < 5) {
        try {
            const zip = new AdmZip(rutaArchivo);
            zip.extractAllTo(rutaDestino, true);
            count = 5;
            retorno = true
        } catch(error) {
            count++;
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    if(retorno === undefined) retorno = false;

    return retorno;
}

// renombra o rehubica archivos
async function renombrarRehubicar(rutaOrigen, rutaDestino, intentosRestantes) {
    let retorno;
    if(intentosRestantes <= 0) {
        retorno = false;
        return retorno;
    }

    try {
        const nombreArchivo = rutaOrigen.split('/').pop();
        fs.chmod(rutaDestino, 0o755, err => { if(err) console.log('permisos no cambiados', err) });
        fs.readFile(rutaOrigen, (err, data) => { 
            if(!err) fs.writeFile(`${rutaDestino}/${nombreArchivo}`, data, (err) => { if(err) console.error('Error al copiar el archivo', err) });
        });

        retorno = true;
        
        return retorno;
    } catch(error) {
        await renombrarRehubicar(rutaOrigen, rutaDestino, intentosRestantes -1);
    }
}

// eliminar archivos
async function eliminarArchivos(rutaArchivo) {
    // especificar archivos
    if(Array.isArray(rutaArchivo)) {
        for(let ruta of rutaArchivo) {
            await fs.unlink(ruta);
        }
    } else { // todos los archivos
        if(crearVerificarCarpetas(rutaArchivo)) {
            await fs.unlink(rutaArchivo, err => {});
        }
    }
}

module.exports = {
    descomprimir,
    almacenarArchivos,
    eliminarArchivos,
}