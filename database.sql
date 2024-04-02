/*CREAR Y USAR LA BASE DE DATOS*/
CREATE DATABASE db_escuela_ide;
USE db_escuela_ide;

/*CREAR LAS TABLAS*/
#CURSOS
CREATE TABLE cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_C VARCHAR(255) NOT NULL,
    duracion INT,
    descripcion TEXT
);

#ROLES
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL
);

#USUARIOS
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(255) NOT NULL,
    apellido_P VARCHAR(255) NOT NULL,
    apellido_M VARCHAR(255) NOT NULL,
    nombre_U VARCHAR(255) NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    rol_id INT,
    FOREIGN KEY (rol_id) REFERENCES roles(id)
);

#LECCIONES
CREATE TABLE lecciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    contenido_txt TEXT,
    contenido_vlc BLOB,
    curso_id INT,
    FOREIGN KEY (curso_id) REFERENCES cursos(id)
);

#PROGESO DE LOS USUARIOS
CREATE TABLE progreso_usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    curso_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (curso_id) REFERENCES cursos(id)
);

#INSERTAR DATOS NECESARIOS PARA QUE FUNCIONE EL PROGRAMA
INSERT INTO roles (nombre) VALUE ('Administrador'), ('Docente'), ('Alumno');
INSERT INTO usuarios (nombres, apellido_P, apellido_M, nombre_U, contraseña, rol_id)
VALUE ('usuario', 'apellido_p', 'apellido_m', 'usuario', 123, 1);