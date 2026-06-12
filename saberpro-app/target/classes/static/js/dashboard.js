// ===============================
// dashboard.js
// Usado por: admin.html, coordinador.html
// Endpoint: GET /api/informes/dashboard
// ===============================

async function cargarDashboard() {

    try {

        const response = await fetch(BASE_URL + "/informes/dashboard");

        if (!response.ok) {
            alert("Error al cargar el dashboard.");
            return;
        }

        const data = await response.json();

        // ---- Admin: muestra en <pre id="dashboardResultado"> ----
        const preAdmin = document.getElementById("dashboardResultado");
        if (preAdmin) {
            preAdmin.innerHTML =
                "Total Estudiantes   : " + data.totalEstudiantes + "\n" +
                "Aprobados           : " + data.totalAprobados + "\n" +
                "Pendientes          : " + data.totalPendientes + "\n" +
                "Pagos Cargados      : " + data.totalPagosCargados + "\n" +
                "Resultados Cargados : " + data.totalResultadosCargados + "\n" +
                "Promedio Puntaje    : " + data.promedioPuntaje.toFixed(2) + "\n\n" +
                "---- Estudiantes por Facultad ----\n" +
                JSON.stringify(data.estudiantesPorFacultad, null, 2) + "\n\n" +
                "---- Estudiantes por Nivel Saber Pro ----\n" +
                JSON.stringify(data.estudiantesPorNivel, null, 2);
        }

        // ---- Coordinador: muestra en cards con IDs específicos ----
        const elTotal      = document.getElementById("dashTotalEstudiantes");
        const elAprobados  = document.getElementById("dashAprobados");
        const elPendientes = document.getElementById("dashPendientes");
        const elPromedio   = document.getElementById("dashPromedio");

        if (elTotal)      elTotal.textContent      = data.totalEstudiantes;
        if (elAprobados)  elAprobados.textContent   = data.totalAprobados;
        if (elPendientes) elPendientes.textContent  = data.totalPendientes;
        if (elPromedio)   elPromedio.textContent    = data.promedioPuntaje.toFixed(2);

    } catch (e) {
        console.error(e);
        alert("Error de conexión al cargar el dashboard.");
    }
}

// Carga automática al entrar a la sección dashboard
// (se llama manualmente con el botón "Actualizar")
