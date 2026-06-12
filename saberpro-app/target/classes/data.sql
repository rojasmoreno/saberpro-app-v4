-- ===== FACULTADES =====
INSERT INTO facultades (id, nombre) VALUES (1, 'Ingeniería de Sistemas');
INSERT INTO facultades (id, nombre) VALUES (2, 'Ingeniería Industrial');
INSERT INTO facultades (id, nombre) VALUES (3, 'Ciencias Económicas');

-- ===== USUARIOS (login por rol) =====
INSERT INTO usuarios (id, username, password, nombre_completo, rol) VALUES (1, 'admin', 'admin123', 'Administrador General', 'ADMINISTRADOR');
INSERT INTO usuarios (id, username, password, nombre_completo, rol) VALUES (2, 'coordinador', 'coord123', 'Coordinador Academico', 'COORDINADOR');
INSERT INTO usuarios (id, username, password, nombre_completo, rol) VALUES (3, 'docente1', 'doc123', 'Docente Sistemas', 'DOCENTE');
INSERT INTO usuarios (id, username, password, nombre_completo, rol) VALUES (4, 'estudiante1', 'est123', 'Estudiante Barbosa', 'ESTUDIANTE');

-- ===== DIRECTORES =====
INSERT INTO directores (id, nombre, cedula, correo, facultad_id) VALUES (1, 'Carlos Ramirez', '1098765432', 'carlos.ramirez@universidad.edu.co', 1);
INSERT INTO directores (id, nombre, cedula, correo, facultad_id) VALUES (2, 'Laura Gomez', '1087654321', 'laura.gomez@universidad.edu.co', 2);

-- ===== DOCENTES =====
INSERT INTO docentes (id, nombre, cedula, correo, facultad_id) VALUES (1, 'Andres Torres', '13234567', 'andres.torres@universidad.edu.co', 1);
INSERT INTO docentes (id, nombre, cedula, correo, facultad_id) VALUES (2, 'Marcela Diaz', '13345678', 'marcela.diaz@universidad.edu.co', 1);
INSERT INTO docentes (id, nombre, cedula, correo, facultad_id) VALUES (3, 'Jorge Pena', '13456789', 'jorge.pena@universidad.edu.co', 2);

-- ===== ESTUDIANTES (basados en INFORME_SABER_PRO_2026_Parcial.xlsx) =====
INSERT INTO estudiantes (id, tipo_documento, numero_documento, primer_apellido, segundo_apellido, primer_nombre, segundo_nombre, correo, telefono, numero_registro, facultad_id, pago_cargado, aprobado) VALUES
(1, 'CC', '1001000001', 'BARBOSA', '', 'Estudiante', '1', 'barbosa1@universidad.edu.co', '3000000001', 'EK20183007722', 1, true, true);
INSERT INTO estudiantes (id, tipo_documento, numero_documento, primer_apellido, segundo_apellido, primer_nombre, segundo_nombre, correo, telefono, numero_registro, facultad_id, pago_cargado, aprobado) VALUES
(2, 'CC', '1001000002', 'QUINTERO', '', 'Estudiante', '2', 'quintero2@universidad.edu.co', '3000000002', 'EK20183140703', 1, true, true);
INSERT INTO estudiantes (id, tipo_documento, numero_documento, primer_apellido, segundo_apellido, primer_nombre, segundo_nombre, correo, telefono, numero_registro, facultad_id, pago_cargado, aprobado) VALUES
(3, 'CC', '1001000003', 'PARRA', '', 'Estudiante', '3', 'parra3@universidad.edu.co', '3000000003', 'EK20183040545', 1, true, false);
INSERT INTO estudiantes (id, tipo_documento, numero_documento, primer_apellido, segundo_apellido, primer_nombre, segundo_nombre, correo, telefono, numero_registro, facultad_id, pago_cargado, aprobado) VALUES
(4, 'CC', '1001000004', 'ANAYA', '', 'Estudiante', '4', 'anaya4@universidad.edu.co', '3000000004', 'EK20183025381', 1, true, true);
INSERT INTO estudiantes (id, tipo_documento, numero_documento, primer_apellido, segundo_apellido, primer_nombre, segundo_nombre, correo, telefono, numero_registro, facultad_id, pago_cargado, aprobado) VALUES
(5, 'CC', '1001000005', 'FLOR', '', 'Estudiante', '5', 'flor5@universidad.edu.co', '3000000005', 'EK20183025335', 2, true, true);
INSERT INTO estudiantes (id, tipo_documento, numero_documento, primer_apellido, segundo_apellido, primer_nombre, segundo_nombre, correo, telefono, numero_registro, facultad_id, pago_cargado, aprobado) VALUES
(6, 'CC', '1001000006', 'GARCIA', '', 'Estudiante', '6', 'garcia6@universidad.edu.co', '3000000006', 'EK20183122648', 2, true, false);
INSERT INTO estudiantes (id, tipo_documento, numero_documento, primer_apellido, segundo_apellido, primer_nombre, segundo_nombre, correo, telefono, numero_registro, facultad_id, pago_cargado, aprobado) VALUES
(7, 'CC', '1001000007', 'MANOSALVA', '', 'Estudiante', '7', 'manosalva7@universidad.edu.co', '3000000007', 'EK20183064605', 2, false, false);
INSERT INTO estudiantes (id, tipo_documento, numero_documento, primer_apellido, segundo_apellido, primer_nombre, segundo_nombre, correo, telefono, numero_registro, facultad_id, pago_cargado, aprobado) VALUES
(8, 'CC', '1001000008', 'MENDOZA', '', 'Estudiante', '8', 'mendoza8@universidad.edu.co', '3000000008', 'EK20183187351', 3, true, true);
INSERT INTO estudiantes (id, tipo_documento, numero_documento, primer_apellido, segundo_apellido, primer_nombre, segundo_nombre, correo, telefono, numero_registro, facultad_id, pago_cargado, aprobado) VALUES
(9, 'CC', '1001000009', 'BELTRAN', '', 'Estudiante', '9', 'beltran9@universidad.edu.co', '3000000009', 'EK20183233820', 3, true, false);
INSERT INTO estudiantes (id, tipo_documento, numero_documento, primer_apellido, segundo_apellido, primer_nombre, segundo_nombre, correo, telefono, numero_registro, facultad_id, pago_cargado, aprobado) VALUES
(10, 'CC', '1001000010', 'SANTAMARIA', '', 'Estudiante', '10', 'santamaria10@universidad.edu.co', '3000000010', 'EK20183030016', 3, false, false);

-- ===== RESULTADOS SABER PRO (basados en el Excel) =====
INSERT INTO resultados_saber_pro (id, estudiante_id, puntaje, nivel_saber_pro, comunicacion_escrita, comunicacion_escrita_nivel, razonamiento_cuantitativo, razonamiento_cuantitativo_nivel, lectura_critica, lectura_critica_nivel, competencias_ciudadanas, competencias_ciudadanas_nivel, ingles, ingles_nivel, formulacion_proyectos, formulacion_proyectos_nivel, pensamiento_cientifico, pensamiento_cientifico_nivel, diseno_software, diseno_software_nivel, nivel_ingles) VALUES
(1, 1, 200, 'Nivel 4', 128, 'Nivel 2', 182, 'Nivel 3', 202, 'Nivel 4', 206, 'Nivel 4', 183, 'Nivel 3', 185, 'Nivel 3', 160, 'Nivel 3', 197, 'Nivel 4', 'B1');

INSERT INTO resultados_saber_pro (id, estudiante_id, puntaje, nivel_saber_pro, comunicacion_escrita, comunicacion_escrita_nivel, razonamiento_cuantitativo, razonamiento_cuantitativo_nivel, lectura_critica, lectura_critica_nivel, competencias_ciudadanas, competencias_ciudadanas_nivel, ingles, ingles_nivel, formulacion_proyectos, formulacion_proyectos_nivel, pensamiento_cientifico, pensamiento_cientifico_nivel, diseno_software, diseno_software_nivel, nivel_ingles) VALUES
(2, 2, 165, 'Nivel 3', 125, 'Nivel 1', 151, 'Nivel 2', 179, 'Nivel 3', 163, 'Nivel 3', 205, 'Nivel 4', 182, 'Nivel 3', 144, 'Nivel 2', 136, 'Nivel 2', 'B2');

INSERT INTO resultados_saber_pro (id, estudiante_id, puntaje, nivel_saber_pro, comunicacion_escrita, comunicacion_escrita_nivel, razonamiento_cuantitativo, razonamiento_cuantitativo_nivel, lectura_critica, lectura_critica_nivel, competencias_ciudadanas, competencias_ciudadanas_nivel, ingles, ingles_nivel, formulacion_proyectos, formulacion_proyectos_nivel, pensamiento_cientifico, pensamiento_cientifico_nivel, diseno_software, diseno_software_nivel, nivel_ingles) VALUES
(3, 3, 164, 'Nivel 3', 159, 'Nivel 3', 172, 'Nivel 3', 182, 'Nivel 3', 142, 'Nivel 2', 165, 'Nivel 3', 167, 'Nivel 3', 132, 'Nivel 2', 148, 'Nivel 2', 'A2');

INSERT INTO resultados_saber_pro (id, estudiante_id, puntaje, nivel_saber_pro, comunicacion_escrita, comunicacion_escrita_nivel, razonamiento_cuantitativo, razonamiento_cuantitativo_nivel, lectura_critica, lectura_critica_nivel, competencias_ciudadanas, competencias_ciudadanas_nivel, ingles, ingles_nivel, formulacion_proyectos, formulacion_proyectos_nivel, pensamiento_cientifico, pensamiento_cientifico_nivel, diseno_software, diseno_software_nivel, nivel_ingles) VALUES
(4, 4, 160, 'Nivel 3', 146, 'Nivel 2', 199, 'Nivel 4', 157, 'Nivel 3', 149, 'Nivel 2', 147, 'Nivel 2', 174, 'Nivel 3', 127, 'Nivel 2', 171, 'Nivel 3', 'A2');

INSERT INTO resultados_saber_pro (id, estudiante_id, puntaje, nivel_saber_pro, comunicacion_escrita, comunicacion_escrita_nivel, razonamiento_cuantitativo, razonamiento_cuantitativo_nivel, lectura_critica, lectura_critica_nivel, competencias_ciudadanas, competencias_ciudadanas_nivel, ingles, ingles_nivel, formulacion_proyectos, formulacion_proyectos_nivel, pensamiento_cientifico, pensamiento_cientifico_nivel, diseno_software, diseno_software_nivel, nivel_ingles) VALUES
(5, 5, 160, 'Nivel 3', 198, 'Nivel 4', 153, 'Nivel 2', 147, 'Nivel 2', 157, 'Nivel 3', 146, 'Nivel 2', 168, 'Nivel 3', 114, 'Nivel 1', 160, 'Nivel 3', 'A2');

INSERT INTO resultados_saber_pro (id, estudiante_id, puntaje, nivel_saber_pro, comunicacion_escrita, comunicacion_escrita_nivel, razonamiento_cuantitativo, razonamiento_cuantitativo_nivel, lectura_critica, lectura_critica_nivel, competencias_ciudadanas, competencias_ciudadanas_nivel, ingles, ingles_nivel, formulacion_proyectos, formulacion_proyectos_nivel, pensamiento_cientifico, pensamiento_cientifico_nivel, diseno_software, diseno_software_nivel, nivel_ingles) VALUES
(6, 6, 157, 'Nivel 3', 179, 'Nivel 3', 172, 'Nivel 3', 158, 'Nivel 3', 140, 'Nivel 2', 136, 'Nivel 2', 128, 'Nivel 2', 121, 'Nivel 1', 142, 'Nivel 2', 'A1');

INSERT INTO resultados_saber_pro (id, estudiante_id, puntaje, nivel_saber_pro, comunicacion_escrita, comunicacion_escrita_nivel, razonamiento_cuantitativo, razonamiento_cuantitativo_nivel, lectura_critica, lectura_critica_nivel, competencias_ciudadanas, competencias_ciudadanas_nivel, ingles, ingles_nivel, formulacion_proyectos, formulacion_proyectos_nivel, pensamiento_cientifico, pensamiento_cientifico_nivel, diseno_software, diseno_software_nivel, nivel_ingles) VALUES
(7, 7, 153, 'Nivel 2', 115, 'Nivel 1', 152, 'Nivel 2', 159, 'Nivel 3', 172, 'Nivel 3', 165, 'Nivel 3', 142, 'Nivel 2', 118, 'Nivel 1', 119, 'Nivel 1', 'A2');

INSERT INTO resultados_saber_pro (id, estudiante_id, puntaje, nivel_saber_pro, comunicacion_escrita, comunicacion_escrita_nivel, razonamiento_cuantitativo, razonamiento_cuantitativo_nivel, lectura_critica, lectura_critica_nivel, competencias_ciudadanas, competencias_ciudadanas_nivel, ingles, ingles_nivel, formulacion_proyectos, formulacion_proyectos_nivel, pensamiento_cientifico, pensamiento_cientifico_nivel, diseno_software, diseno_software_nivel, nivel_ingles) VALUES
(8, 8, 151, 'Nivel 2', 132, 'Nivel 2', 123, 'Nivel 1', 125, 'Nivel 1', 169, 'Nivel 3', 204, 'Nivel 4', 173, 'Nivel 3', 127, 'Nivel 2', 171, 'Nivel 3', 'B2');

INSERT INTO resultados_saber_pro (id, estudiante_id, puntaje, nivel_saber_pro, comunicacion_escrita, comunicacion_escrita_nivel, razonamiento_cuantitativo, razonamiento_cuantitativo_nivel, lectura_critica, lectura_critica_nivel, competencias_ciudadanas, competencias_ciudadanas_nivel, ingles, ingles_nivel, formulacion_proyectos, formulacion_proyectos_nivel, pensamiento_cientifico, pensamiento_cientifico_nivel, diseno_software, diseno_software_nivel, nivel_ingles) VALUES
(9, 9, 150, 'Nivel 2', 86, 'Nivel 1', 187, 'Nivel 3', 160, 'Nivel 3', 171, 'Nivel 3', 148, 'Nivel 2', 162, 'Nivel 3', 125, 'Nivel 1', 142, 'Nivel 2', 'A2');

INSERT INTO resultados_saber_pro (id, estudiante_id, puntaje, nivel_saber_pro, comunicacion_escrita, comunicacion_escrita_nivel, razonamiento_cuantitativo, razonamiento_cuantitativo_nivel, lectura_critica, lectura_critica_nivel, competencias_ciudadanas, competencias_ciudadanas_nivel, ingles, ingles_nivel, formulacion_proyectos, formulacion_proyectos_nivel, pensamiento_cientifico, pensamiento_cientifico_nivel, diseno_software, diseno_software_nivel, nivel_ingles) VALUES
(10, 10, 150, 'Nivel 2', 175, 'Nivel 3', 149, 'Nivel 2', 145, 'Nivel 2', 158, 'Nivel 3', 125, 'Nivel 1', 162, 'Nivel 3', 76, 'Nivel 1', 125, 'Nivel 1', 'A1');
-- ===== REINICIO DE SECUENCIAS (para que nuevos registros no choquen con los IDs ya insertados) =====
ALTER TABLE facultades ALTER COLUMN id RESTART WITH 100;
ALTER TABLE usuarios ALTER COLUMN id RESTART WITH 100;
ALTER TABLE directores ALTER COLUMN id RESTART WITH 100;
ALTER TABLE docentes ALTER COLUMN id RESTART WITH 100;
ALTER TABLE estudiantes ALTER COLUMN id RESTART WITH 100;
ALTER TABLE resultados_saber_pro ALTER COLUMN id RESTART WITH 100;
