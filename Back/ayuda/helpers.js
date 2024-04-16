const AdmZip = require('adm-zip');
const fs = require('fs'); // modificacion de archivos del sistema

// leer contenido de carpeta comprimida

// solucionar errores
async function leerArchivosZip(rutaOrigen, rutaDestino) {
    let contenidoCurso = [];

    const existe = verificarArchivos(rutaOrigen);
    if(existe) {
        try {
            const permisos  = cambiarPermisos(rutaOrigen);

            if(permisos) {
                const zip = new AdmZip(rutaOrigen);
                const zipContenido = zip.getEntries();
        
                zipContenido.forEach(entry => {
                    if(!entry.isDirectory) {
                        const datos = {
                            ruta: `${rutaDestino}/${entry.entryName}`,
                            nombre: entry.name,
                            carpetaOrigen: entry.entryName.split('/').shift(),
                        }
                        contenidoCurso.push(datos);
                    }
                });
            }
            return contenidoCurso;
        } catch(error) {
            console.error('Error al leer archivos:', error);
            return null;
        }
    }

}

// verificar si existe la carpeta
async function almacenarArchivos(nombreArchivo, rutaOrigen, rutaDestino) {
    let rehubicar = [];
    const extension = nombreArchivo.split('.').pop();
    const rutaArchivoOrigen = `${rutaOrigen}/${nombreArchivo}`;
    const rutaExistente = await crearVerificarCarpetas(rutaDestino);
    
    if(rutaExistente) {
        extension === 'zip' || extension === 'rar' || extension === '7z' ? 
            rehubicar = await descomprimir(rutaArchivoOrigen, rutaDestino, nombreArchivo) :
            rehubicar = await renombrarRehubicar(rutaArchivoOrigen, rutaDestino, 5);

        eliminar = await eliminarArchivos(rutaArchivoOrigen);
    }

    if(rutaExistente && rehubicar[0]) {
        return rehubicar;
    } else {
        return [false];
    }
}

// verificar y crea carpetas que se especifiquen
async function crearVerificarCarpetas(rutaCarpeta) {
    let carpetaExistente = fs.existsSync(rutaCarpeta);
    let count = 0;

    // existe?
    while((!carpetaExistente && count < 5)) {
        fs.mkdirSync(rutaCarpeta, { recursive: true });
        count++;
        await new Promise(resolve => setTimeout(resolve, 1000));
        carpetaExistente = fs.existsSync(rutaCarpeta);
    }

    return count < 5 ? true : false;
}

async function verificarArchivos(rutaArchivo) {
    return await fs.existsSync(rutaArchivo);
}

// descomprimir archivos
async function descomprimir(rutaOrigen, rutaDestino, nombreArchivo) {
    let count = 0;
    let retorno;
    const existe = await verificarArchivos(rutaOrigen);
    while(count < 5) {
        if(existe) {
            try {
                const zip = new AdmZip(rutaOrigen);
                zip.extractAllTo(rutaDestino, true);
                count = 5;
                retorno = true
            } catch(error) {
                count++;
                await new Promise(resolve => setTimeout(resolve, 1000));
                console.log('error al descomprimir', error);
            }
        }
    }

    if(retorno === undefined) retorno = false;

    return [retorno];
}

// renombra o rehubica archivos
async function renombrarRehubicar(rutaOrigen, rutaDestino, intentosRestantes) {
    if(intentosRestantes <= 0) return [false];

    try {
        const nombreArchivo = rutaOrigen.split('/').pop();
        if(cambiarPermisos(rutaDestino)) {
            fs.readFile(rutaOrigen, (err, data) => { 
                if(!err) {
                    fs.writeFile(`${rutaDestino}/${nombreArchivo}`, data, (err) => { 
                        if(err) {
                            console.error('Error al copiar el archivo', err);
                            return [false]; 
                        }
                    });
                } else {
                    return [false];
                }
            });
        }

        return [true, `${rutaDestino}/${nombreArchivo}`];
    } catch(error) {
        await renombrarRehubicar(rutaOrigen, rutaDestino, intentosRestantes -1);
    }
}

// cambiar permisos
function cambiarPermisos(rutaArchivo) {
    fs.chmod(rutaArchivo, 0o777, err => {
        if(err) {
            console.log('permisos no cambiados', err);
            return false;
        }
    });
    return true;
}

// renombrar carpeta 
async function renombrarCarpeta(nombreArchivo, nuevoNombre) {
    await fs.rename(nombreArchivo, nuevoNombre, (err) => {})
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

function ultimoELemento(arreglo) {
    if(arreglo.length > 1) arreglo.shift();
    return arreglo[0];
}

async function renombreCarpeta(arreglo, carpetaOrigen, nuevoNombre) {
    const promesa = await Promise.all(
        arreglo.map(async datos => {
            const carpetaOriginal = `${carpetaOrigen}/${datos.carpetaOrigen}`;
            const carpetaRenombrada = `${carpetaOrigen}/${nuevoNombre}`;
            const ruta = await sustituir(carpetaRenombrada, / /g, '_');
            const verificar = await verificarArchivos(carpetaOriginal);
            if(verificar) await renombrarCarpeta(carpetaOriginal, ruta);
            return ruta;
        })
    );
    return promesa;
}

function sustituir(texto, cambiar, por) {
    return texto.replace(cambiar, por);
}

module.exports = {
    leerArchivosZip,
    descomprimir,
    almacenarArchivos,
    renombrarCarpeta,
    eliminarArchivos,
    crearVerificarCarpetas,
    verificarArchivos,
    ultimoELemento,
    renombreCarpeta,
    sustituir,
}