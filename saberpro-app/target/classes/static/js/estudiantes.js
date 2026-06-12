// ===============================
// estudiantes.js
// Usado por: coordinador.html
// Endpoints: /api/estudiantes, /api/facultades
// ===============================

// ---- Cargar tabla de estudiantes al cargar la página ----
window.addEventListener("load", function () {
    if (document.getElementById("tablaEstudiantesCo")) {
        cargarEstudiantes();
        cargarFacultadesEnSelect("eFacultad");
    }
});

// ---- Cargar lista de estudiantes en la tabla ----
async function cargarEstudiantes() {

    try {

        const res = await fetch(BASE_URL + "/estudiantes");
        const lista = await res.json();

        const tbody = document
            .getElementById("tablaEstudiantesCo")
            .querySelector("tbody");

        tbody.innerHTML = "";

        lista.forEach(function (e) {

            const fila = document.createElement("tr");

            fila.innerHTML =
                "<td>" + e.id + "</td>" +
                "<td>" + e.numeroDocumento + "</td>" +
                "<td>" + e.primerNombre + " " + e.primerApellido + "</td>" +
                "<td>" + (e.facultad ? e.facultad.nombre : "-") + "</td>" +
                "<td>" + (e.pagoCargado ? "✅" : "❌") + "</td>" +
                "<td>" + (e.aprobado ? "✅" : "❌") + "</td>" +
                "<td>" +
                    "<button onclick=\"aprobarEstudiante(" + e.id + ")\">Aprobar</button> " +
                    "<button onclick=\"eliminarEstudiante(" + e.id + ")\">Eliminar</button>" +
                "</td>";

            tbody.appendChild(fila);

        });

    } catch (ex) {
        console.error(ex);
    }
}

// ---- Crear estudiante ----
async function crearEstudiante() {

    const body = {
        tipoDocumento  : document.getElementById("eTipoDoc").value,
        numeroDocumento: document.getElementById("eNumDoc").value,
        primerNombre   : document.getElementById("ePrimerNombre").value,
        segundoNombre  : document.getElementById("eSegundoNombre").value,
        primerApellido : document.getElementById("ePrimerApellido").value,
        segundoApellido: document.getElementById("eSegundoApellido").value,
        correo         : document.getElementById("eCorreo").value,
        telefono       : document.getElementById("eTelefono").value,
        numeroRegistro : document.getElementById("eNumRegistro").value,
        facultad       : { id: parseInt(document.getElementById("eFacultad").value) }
    };

    try {

        const res = await fetch(BASE_URL + "/estudiantes", {
            method : "POST",
            headers: { "Content-Type": "application/json" },
            body   : JSON.stringify(body)
        });

        if (res.ok) {
            alert("Estudiante registrado.");
            cargarEstudiantes();
        } else {
            alert("Error al crear estudiante.");
        }

    } catch (ex) {
        console.error(ex);
    }
}

// ---- Cargar datos en el formulario de edición ----
async function cargarEstudianteParaEditar() {

    const id = document.getElementById("editIdEst").value;
    if (!id) { alert("Ingrese un ID."); return; }

    try {

        const res = await fetch(BASE_URL + "/estudiantes/" + id);

        if (!res.ok) { alert("Estudiante no encontrado."); return; }

        const e = await res.json();

        document.getElementById("eTipoDoc").value       = e.tipoDocumento    || "";
        document.getElementById("eNumDoc").value        = e.numeroDocumento  || "";
        document.getElementById("ePrimerNombre").value  = e.primerNombre     || "";
        document.getElementById("eSegundoNombre").value = e.segundoNombre    || "";
        document.getElementById("ePrimerApellido").value = e.primerApellido  || "";
        document.getElementById("eSegundoApellido").value= e.segundoApellido || "";
        document.getElementById("eCorreo").value        = e.correo           || "";
        document.getElementById("eTelefono").value      = e.telefono         || "";
        document.getElementById("eNumRegistro").value   = e.numeroRegistro   || "";

        if (e.facultad) {
            document.getElementById("eFacultad").value = e.facultad.id;
        }

        alert("Datos cargados. Edite y presione 'Guardar Cambios'.");

    } catch (ex) {
        console.error(ex);
    }
}

// ---- Actualizar estudiante ----
async function actualizarEstudiante() {

    const id = document.getElementById("editIdEst").value;
    if (!id) { alert("Busque primero un estudiante."); return; }

    const body = {
        tipoDocumento  : document.getElementById("eTipoDoc").value,
        numeroDocumento: document.getElementById("eNumDoc").value,
        primerNombre   : document.getElementById("ePrimerNombre").value,
        segundoNombre  : document.getElementById("eSegundoNombre").value,
        primerApellido : document.getElementById("ePrimerApellido").value,
        segundoApellido: document.getElementById("eSegundoApellido").value,
        correo         : document.getElementById("eCorreo").value,
        telefono       : document.getElementById("eTelefono").value,
        numeroRegistro : document.getElementById("eNumRegistro").value,
        facultad       : { id: parseInt(document.getElementById("eFacultad").value) }
    };

    try {

        const res = await fetch(BASE_URL + "/estudiantes/" + id, {
            method : "PUT",
            headers: { "Content-Type": "application/json" },
            body   : JSON.stringify(body)
        });

        if (res.ok) {
            alert("Estudiante actualizado.");
            cargarEstudiantes();
        } else {
            alert("Error al actualizar.");
        }

    } catch (ex) {
        console.error(ex);
    }
}

// ---- Aprobar estudiante (Coordinación - Historia de Usuario) ----
async function aprobarEstudiante(id) {

    try {

        const res = await fetch(BASE_URL + "/estudiantes/" + id + "/aprobar", {
            method: "PUT"
        });

        if (res.ok) {
            alert("Estudiante aprobado para Saber Pro.");
            cargarEstudiantes();
        } else {
            alert("Error al aprobar.");
        }

    } catch (ex) {
        console.error(ex);
    }
}

// ---- Eliminar estudiante ----
async function eliminarEstudiante(id) {

    if (!confirm("¿Eliminar estudiante " + id + "?")) return;

    try {

        const res = await fetch(BASE_URL + "/estudiantes/" + id, {
            method: "DELETE"
        });

        if (res.ok) {
            alert("Estudiante eliminado.");
            cargarEstudiantes();
        }

    } catch (ex) {
        console.error(ex);
    }
}

// ---- Helper: poblar un <select> con facultades ----
async function cargarFacultadesEnSelect(selectId) {

    try {

        const res = await fetch(BASE_URL + "/facultades");
        const lista = await res.json();

        const sel = document.getElementById(selectId);
        if (!sel) return;

        // conservar opción vacía inicial si existe
        const opciones = lista.map(function (f) {
            return "<option value=\"" + f.id + "\">" + f.nombre + "</option>";
        });

        sel.innerHTML = "<option value=''>Seleccione Facultad</option>" + opciones.join("");

    } catch (ex) {
        console.error(ex);
    }
}
