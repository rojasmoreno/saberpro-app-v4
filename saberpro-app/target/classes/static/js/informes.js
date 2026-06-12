// ===============================
// informes.js
// Usado por: coordinador.html, docente.html
// Endpoints: /api/informes/...
// ===============================

// ---- Informe General (Coordinador / Docente - Slide 7) ----
async function cargarInformeGeneral() {

    try {

        const res   = await fetch(BASE_URL + "/informes/general");
        const lista = await res.json();

        // compatible con coordinador.html (tablaInformeGeneral)
        // y docente.html (tablaAlumnosDocente) via cargarAlumnosTotal
        const tablaId = document.getElementById("tablaInformeGeneral")
            ? "tablaInformeGeneral"
            : "tablaAlumnosDocente";

        const tbody = document
            .getElementById(tablaId)
            .querySelector("tbody");

        tbody.innerHTML = "";

        lista.forEach(function (e) {

            const fila = document.createElement("tr");

            fila.innerHTML =
                "<td>" + e.id + "</td>" +
                "<td>" + (e.numeroDocumento || "-") + "</td>" +
                "<td>" + (e.nombreCompleto  || "-") + "</td>" +
                "<td>" + (e.facultad        || "-") + "</td>" +
                "<td>" + (e.puntaje         != null ? e.puntaje : "-") + "</td>" +
                "<td>" + (e.nivelSaberPro   || "-") + "</td>" +
                "<td>" + (e.aprobado ? "✅" : "❌") + "</td>";

            tbody.appendChild(fila);

        });

    } catch (ex) {
        console.error(ex);
        alert("Error al cargar informe general.");
    }
}

// ---- Alumnos Total (Docente - Historia de Usuario) ----
async function cargarAlumnosTotal() {

    try {

        const res   = await fetch(BASE_URL + "/informes/alumnos/total");
        const lista = await res.json();

        const tbody = document
            .getElementById("tablaAlumnosDocente")
            .querySelector("tbody");

        tbody.innerHTML = "";

        lista.forEach(function (e) {

            const fila = document.createElement("tr");

            fila.innerHTML =
                "<td>" + e.id + "</td>" +
                "<td>" + (e.numeroDocumento || "-") + "</td>" +
                "<td>" + (e.primerNombre + " " + e.primerApellido) + "</td>" +
                "<td>" + (e.facultad ? e.facultad.nombre : "-") + "</td>" +
                "<td>" + (e.aprobado ? "✅" : "❌") + "</td>";

            tbody.appendChild(fila);

        });

    } catch (ex) {
        console.error(ex);
    }
}

// ---- Alumnos Único / Solo Aprobados (Docente - Historia de Usuario) ----
async function cargarAlumnosUnico() {

    try {

        const res   = await fetch(BASE_URL + "/informes/alumnos/unico");
        const lista = await res.json();

        const tbody = document
            .getElementById("tablaAlumnosDocente")
            .querySelector("tbody");

        tbody.innerHTML = "";

        lista.forEach(function (e) {

            const fila = document.createElement("tr");

            fila.innerHTML =
                "<td>" + e.id + "</td>" +
                "<td>" + (e.numeroDocumento || "-") + "</td>" +
                "<td>" + (e.primerNombre + " " + e.primerApellido) + "</td>" +
                "<td>" + (e.facultad ? e.facultad.nombre : "-") + "</td>" +
                "<td>✅</td>";

            tbody.appendChild(fila);

        });

    } catch (ex) {
        console.error(ex);
    }
}

// ---- Informe Detallado (Coordinador - Slides 8/9) ----
// preId: id del <pre> donde mostrar el resultado
async function cargarDetalle(preId) {

    const id = document.getElementById("idDetalle").value;
    if (!id) { alert("Ingrese el ID del estudiante."); return; }

    try {

        const res = await fetch(BASE_URL + "/informes/alumnos/detallado/" + id);

        if (!res.ok) {
            document.getElementById(preId).textContent =
                "Estudiante no encontrado.";
            return;
        }

        const data = await res.json();

        let texto =
            "Nombre        : " + (data.nombreCompleto || "-") + "\n" +
            "Documento     : " + (data.numeroDocumento || "-") + "\n" +
            "Correo        : " + (data.correo || "-") + "\n" +
            "Teléfono      : " + (data.telefono || "-") + "\n" +
            "N° Registro   : " + (data.numeroRegistro || "-") + "\n" +
            "Facultad      : " + (data.facultad || "-") + "\n" +
            "Pago Cargado  : " + (data.pagoCargado ? "Sí" : "No") + "\n" +
            "Aprobado      : " + (data.aprobado ? "Sí" : "No") + "\n";

        if (data.resultado) {
            const r = data.resultado;
            texto +=
                "\n---- Resultado Saber Pro ----\n" +
                "Puntaje Total            : " + (r.puntaje || "-") + "\n" +
                "Nivel Saber Pro          : " + (r.nivelSaberPro || "-") + "\n" +
                "Comunicación Escrita     : " + (r.comunicacionEscrita || "-") + " (" + (r.comunicacionEscritaNivel || "-") + ")\n" +
                "Razonamiento Cuantitativo: " + (r.razonamientoCuantitativo || "-") + " (" + (r.razonamientoCuantitativoNivel || "-") + ")\n" +
                "Lectura Crítica          : " + (r.lecturaCritica || "-") + " (" + (r.lecturaCriticaNivel || "-") + ")\n" +
                "Competencias Ciudadanas  : " + (r.competenciasCiudadanas || "-") + " (" + (r.competenciasCiudadanasNivel || "-") + ")\n" +
                "Inglés                   : " + (r.ingles || "-") + " (" + (r.inglesNivel || "-") + ") - " + (r.nivelIngles || "") + "\n" +
                "Formulación Proyectos    : " + (r.formulacionProyectos || "-") + " (" + (r.formulacionProyectosNivel || "-") + ")\n" +
                "Pensamiento Científico   : " + (r.pensamientoCientifico || "-") + " (" + (r.pensamientoCientificoNivel || "-") + ")\n" +
                "Diseño de Software       : " + (r.disenoSoftware || "-") + " (" + (r.disenoSoftwareNivel || "-") + ")\n";
        } else {
            texto += "\nResultado Saber Pro: No registrado aún.\n";
        }

        document.getElementById(preId).textContent = texto;

    } catch (ex) {
        console.error(ex);
        alert("Error al cargar el detalle.");
    }
}

// ---- Informe Beneficios (Coordinador / Docente - Slide 10) ----
// tablaId: id de la <table> donde renderizar
async function cargarBeneficios(tablaId) {

    try {

        const res   = await fetch(BASE_URL + "/informes/beneficios");
        const lista = await res.json();

        const tbody = document
            .getElementById(tablaId)
            .querySelector("tbody");

        tbody.innerHTML = "";

        if (lista.length === 0) {
            const fila = document.createElement("tr");
            fila.innerHTML = "<td colspan='6'>Sin estudiantes con beneficio activo.</td>";
            tbody.appendChild(fila);
            return;
        }

        lista.forEach(function (item) {

            const fila = document.createElement("tr");

            fila.innerHTML =
                "<td>" + item.estudianteId + "</td>" +
                "<td>" + (item.nombre    || "-") + "</td>" +
                "<td>" + (item.facultad  || "-") + "</td>" +
                "<td>" + (item.puntaje   || "-") + "</td>" +
                "<td>" + (item.nivelSaberPro || "-") + "</td>" +
                "<td>" + (item.beneficio || "-") + "</td>";

            tbody.appendChild(fila);

        });

    } catch (ex) {
        console.error(ex);
        alert("Error al cargar beneficios.");
    }
}

// ---- Buscar docentes por facultad (Docente - docente.html) ----
async function buscarDocentesPorFacultad() {

    const facultadId = document.getElementById("doFacultadSelect").value;
    if (!facultadId) { alert("Seleccione una facultad."); return; }

    try {

        const res  = await fetch(BASE_URL + "/docentes/facultad/" + facultadId);
        const lista = await res.json();

        document.getElementById("resultadoFacultadDocentes").textContent =
            JSON.stringify(lista, null, 2);

    } catch (ex) {
        console.error(ex);
    }
}

// ---- Buscar docente por cédula (vista Docente) ----
async function buscarPorCedulaDocenteView() {

    const cedula = document.getElementById("doCedulaBuscar").value;
    if (!cedula) { alert("Ingrese la cédula."); return; }

    try {

        const res = await fetch(BASE_URL + "/docentes/cedula/" + cedula);

        if (!res.ok) {
            document.getElementById("resultadoCedulaDocente").textContent =
                "Docente no encontrado.";
            return;
        }

        const d = await res.json();

        document.getElementById("resultadoCedulaDocente").textContent =
            "ID      : " + d.id + "\n" +
            "Nombre  : " + d.nombre + "\n" +
            "Cédula  : " + d.cedula + "\n" +
            "Correo  : " + d.correo + "\n" +
            "Facultad: " + (d.facultad ? d.facultad.nombre : "-");

    } catch (ex) {
        console.error(ex);
    }
}

// ---- Cargar facultades en select de docente.html ----
window.addEventListener("load", function () {

    const selFacultadDocente = document.getElementById("doFacultadSelect");
    if (selFacultadDocente) {
        cargarFacultadesSelectGenerico("doFacultadSelect");
    }

});

async function cargarFacultadesSelectGenerico(selectId) {

    try {

        const res   = await fetch(BASE_URL + "/facultades");
        const lista = await res.json();

        const sel = document.getElementById(selectId);
        if (!sel) return;

        sel.innerHTML = "<option value=''>Seleccione Facultad</option>" +
            lista.map(function (f) {
                return "<option value='" + f.id + "'>" + f.nombre + "</option>";
            }).join("");

    } catch (ex) {
        console.error(ex);
    }
}
