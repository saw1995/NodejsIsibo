CREATE  DATABASE negocioServicio;
USE negocioServicio;

create table canal(
id VARCHAR(50) not null primary key,
nombre VARCHAR(20) not null,
estado TINYINT(1)
);

CREATE TABLE canalAcceso (
  id VARCHAR(50) NOT NULL PRIMARY KEY,
  idCanal VARCHAR(50) NOT NULL,
  acceso VARCHAR(20),
  estado TINYINT(1)
);

CREATE TABLE rubro (
  id VARCHAR(50) NOT NULL PRIMARY KEY,
  nombre VARCHAR(25),
  descripcion INT,
  imagen TEXT,
  estado TINYINT(1)
);

CREATE TABLE negocio (
  id VARCHAR(50) NOT NULL PRIMARY KEY,
  idRubro VARCHAR(50),
  nombre VARCHAR(25),
  descripcion TEXT,
  nit VARCHAR(20),
  telefono VARCHAR(10),
  celular VARCHAR(10),
  email VARCHAR(40),
  sitioweb VARCHAR(50),
  ciudad VARCHAR(15),
  zona VARCHAR(50),
  barrio VARCHAR(50),
  avenida VARCHAR(50),
  calle VARCHAR(50),
  casa VARCHAR(25),
  referencia TEXT,
  latitud VARCHAR(12),
  longitud VARCHAR(12),
  imagen TEXT,
  estado TINYINT(1)
);

CREATE TABLE licencia (
  id VARCHAR(50) NOT NULL PRIMARY KEY,
  nombre VARCHAR(25),
  descripcion INT,
  duracion INT,
  precio DECIMAL(8,2),
  estado TINYINT(1)
);

CREATE TABLE licenciaNegocio (
  id VARCHAR(50) NOT NULL PRIMARY KEY,
  idLicencia VARCHAR(50),
  idNegocio VARCHAR(50),
  fechaInicio DATE,
  horaInicio TIME,
  fechaFinal DATE,
  horaFinal TIME,
  observacionFinal TEXT,
  estado TINYINT(1)
);

CREATE TABLE rol (
  id VARCHAR(50) NOT NULL PRIMARY KEY,
  idNegocio VARCHAR(50),
  nombre VARCHAR(100),
  descripcion TEXT,
  estado TINYINT(1)
);

CREATE TABLE accesoModulo (
  id VARCHAR(50) NOT NULL PRIMARY KEY,
  idNegocio VARCHAR(50),
  nombre VARCHAR(100),
  modulo TEXT,
  estado TINYINT(1)
);

CREATE TABLE rolAcceso (
  id VARCHAR(50) NOT NULL PRIMARY KEY,
  idRol VARCHAR(50),
  idAcceso VARCHAR(100),
  estado TINYINT(1)
);

CREATE TABLE usuario (
  id VARCHAR(50) NOT NULL PRIMARY KEY,
  idNegocio VARCHAR(50),
  idRol VARCHAR(50),
  ci VARCHAR(11),
  ciExt VARCHAR(11),
  complemento VARCHAR(11),
  nombre VARCHAR(25),
  appat VARCHAR(20),
  apmat VARCHAR(20),
  fechaNacimiento DATE,
  telefono VARCHAR(10),
  celular1 VARCHAR(10),
  celular2 VARCHAR(10),
  email VARCHAR(40),
  ciudad VARCHAR(15),
  zona VARCHAR(50),
  barrio VARCHAR(50),
  avenida VARCHAR(50),
  calle VARCHAR(50),
  casa VARCHAR(25),
  referencia TEXT,
  latitud VARCHAR(12),
  longitud VARCHAR(12),
  imagen TEXT,
  usuario TEXT,
  password TEXT,
  estado TINYINT(1)
);

CREATE TABLE login (
  id VARCHAR(50) NOT NULL PRIMARY KEY,
  idUsuario VARCHAR(50),
  dispositivo TEXT,
  observacion TEXT,
  fechaInicio DATE,
  horaInicio TIME,
  fechaFinal DATE,
  horaFinal TIME,
  estado TINYINT(1)
);