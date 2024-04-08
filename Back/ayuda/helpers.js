const AdmZip = require('adm-zip');

// descomprimir archivos
async function descomprimir(rutaArchivoZip, rutaExtraer) {
    let count = 0;
    while(count < 5) {
        try {
            const zip = new AdmZip(rutaArchivoZip);
            zip.extractAllTo(rutaExtraer, true);
            break;
        } catch(error) {
            count++;
            console.error('Error al descomprimir, reintentando...');
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

// verificar si existe la carpeta
async function verificarCarpetas(rutaCarpeta) {

    let carpetaExistente = fs.existsSync(rutaCarpeta);
    let count = 0;
    // existe?
    while(!carpetaExistente && count < 5) {
        fs.mkdirSync(rutaCarpeta, { recursive: true });
        count++;
        await new Promise(resolve => setTimeout(resolve, 1000));
        carpetaExistente = fs.existsSync(rutaCarpeta);
    }
}

module.exports = {
    descomprimir,
    verificarCarpetas,
}