CREATE  DATABASE clienteServicio;
USE clienteServicio;

CREATE TABLE `canal` (
  `id` varchar(50),
  `nombre` varchar(20) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish2_ci;

CREATE TABLE `acceso` (
  `id` varchar(50),
  `idCanal` varchar(50),
  `acceso` varchar(20) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish2_ci;

CREATE TABLE `regAccesoCanal` (
  `id` varchar(50),
  `idCanal` varchar(50),
  `idAcceso` varchar(50),
  `token` varchar(50) DEFAULT NULL,
  `request` text DEFAULT NULL,
  `response` text DEFAULT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish2_ci;

CREATE TABLE `cliente` (
  `id` varchar(50),
  `ci` varchar(11) DEFAULT NULL,
  `ciExt` varchar(11) DEFAULT NULL,
  `complemento` varchar(11) DEFAULT NULL,
  `nombre` varchar(25) DEFAULT NULL,
  `appat` varchar(20) DEFAULT NULL,
  `apmat` varchar(20) DEFAULT NULL,
  `fechaNacimiento` date DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `celular1` varchar(10) DEFAULT NULL,
  `celular2` varchar(10) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `ciudad` varchar(15) DEFAULT NULL,
  `zona` varchar(50) DEFAULT NULL,
  `barrio` varchar(50) DEFAULT NULL,
  `avenida` varchar(50) DEFAULT NULL,
  `calle` varchar(50) DEFAULT NULL,
  `casa` varchar(25) DEFAULT NULL,
  `referencia` text DEFAULT NULL,
  `latitud` varchar(12) DEFAULT NULL,
  `longitud` varchar(12) DEFAULT NULL,
  `imagen` text DEFAULT NULL,
  `tipoCuenta` varchar(50) DEFAULT NULL,
  `usuario` text DEFAULT NULL,
  `password` text DEFAULT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish2_ci;

CREATE TABLE `login` (
  `id` varchar(50),
  `idCliente` varchar(50) DEFAULT NULL,
  `idCanal` varchar(50) DEFAULT NULL,
  `dispositivo` text DEFAULT NULL,
  `observacion` text DEFAULT NULL,
  `fechaInicio` date DEFAULT NULL,
  `horaInicio` time DEFAULT NULL,
  `fechaFinal` date DEFAULT NULL,
  `horaFinal` time DEFAULT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish2_ci;

INSERT INTO canal(id, nombre, estado) VALUES ('1669649877205', 'PARQUEO', 1);
INSERT INTO acceso(`id`, `id_canal`, `acceso`, `estado`) VALUES ('1669649877206', '1669649877205', 'AGREGAR', 1);