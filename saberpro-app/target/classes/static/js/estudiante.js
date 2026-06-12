// ===============================
// estudiante.js
// ===============================

let estudianteActualId = null;

async function identificarEstudiante() {
    const id = document.getElementById("idEstudianteActual").value;
    if (!id) { alert("Ingrese su ID de estudiante."); return; }

    try {
        const res = await fetch(BASE_URL + "/estudiantes/" + id);
        if (!res.ok) { alert("Estudiante no encontrado."); return; }

        const e = await res.json();
        estudianteActualId = e.id;

        // Datos personales bonitos
        const div = document.getElementById("datosPersonalesResult");
        div.innerHTML = `
            <div class="cred-item">
                <strong>👤 ${e.primerNombre} ${e.segundoNombre||""} ${e.primerApellido} ${e.segundoApellido||""}</strong>
                <span>🪪 ${e.tipoDocumento}: ${e.numeroDocumento}</span><br>
                <span>🔢 Registro: ${e.numeroRegistro||"—"}</span><br>
                <span>✉️ ${e.correo||"—"}</span><br>
                <span>📞 ${e.telefono||"—"}</span><br>
                <span>🏛 ${e.facultad ? e.facultad.nombre : "—"}</span><br>
                <span>💳 Pago: ${e.pagoCargado ? "✅ Registrado" : "❌ Pendiente"}</span><br>
                <span>🎓 Aprobado: ${e.aprobado ? "✅ Sí" : "❌ No"}</span>
            </div>`;

        // Info en inicio
        if(document.getElementById("infoPrograma"))
            document.getElementById("infoPrograma").value = e.facultad ? e.facultad.nombre : "—";
        if(document.getElementById("infoRegistro"))
            document.getElementById("infoRegistro").value = e.numeroRegistro || "—";

        const estadoPago = document.getElementById("estadoPago");
        if (estadoPago) {
            estadoPago.textContent = e.pagoCargado ? "Pago Registrado ✅" : "Pendiente ❌";
            estadoPago.style.color = e.pagoCargado ? "#27ae60" : "#c0392b";
        }

        alert("✅ Identificado: " + e.primerNombre + " " + e.primerApellido);

    } catch (ex) { console.error(ex); alert("Error de conexión."); }
}

async function cargarPagoEstudiante() {
    if (!estudianteActualId) { alert("Primero identifíquese en la sección Inicio."); return; }
    try {
        const res = await fetch(BASE_URL + "/estudiantes/" + estudianteActualId + "/cargar-pago", { method: "PUT" });
        if (res.ok) {
            document.getElementById("estadoPago").textContent = "Pago Registrado ✅";
            document.getElementById("estadoPago").style.color = "#27ae60";
            alert("Pago registrado exitosamente.");
        } else { alert("Error al registrar el pago."); }
    } catch (ex) { console.error(ex); }
}

async function cargarUltimoResultado() {
    if (!estudianteActualId) {
        document.getElementById("resultadoUnicoEst").textContent = "Primero identifíquese en la sección Inicio.";
        return;
    }
    try {
        const res = await fetch(BASE_URL + "/resultados/estudiante/" + estudianteActualId);
        const pre = document.getElementById("resultadoUnicoEst");
        if (!res.ok) { pre.textContent = "No tiene resultados registrados aún."; return; }

        const r = await res.json();
        pre.innerHTML = `
            <div class="cred-item">
                <strong>📊 Puntaje Total: ${r.puntaje||"—"} — ${r.nivelSaberPro||"—"}</strong>
                <span>✍️ Comunicación Escrita: ${r.comunicacionEscrita||"—"} (${r.comunicacionEscritaNivel||"—"})</span><br>
                <span>🔢 Razonamiento Cuantitativo: ${r.razonamientoCuantitativo||"—"} (${r.razonamientoCuantitativoNivel||"—"})</span><br>
                <span>📖 Lectura Crítica: ${r.lecturaCritica||"—"} (${r.lecturaCriticaNivel||"—"})</span><br>
                <span>🤝 Competencias Ciudadanas: ${r.competenciasCiudadanas||"—"} (${r.competenciasCiudadanasNivel||"—"})</span><br>
                <span>🌐 Inglés: ${r.ingles||"—"} (${r.inglesNivel||"—"}) — ${r.nivelIngles||"—"}</span><br>
                <span>💡 Formulación Proyectos: ${r.formulacionProyectos||"—"} (${r.formulacionProyectosNivel||"—"})</span><br>
                <span>🔬 Pensamiento Científico: ${r.pensamientoCientifico||"—"} (${r.pensamientoCientificoNivel||"—"})</span><br>
                <span>💻 Diseño de Software: ${r.disenoSoftware||"—"} (${r.disenoSoftwareNivel||"—"})</span>
            </div>`;

        // Mostrar tarjeta de puntaje
        const card = document.getElementById("puntajeCard");
        if(card){
            document.getElementById("puntajeNum").textContent = r.puntaje || "—";
            document.getElementById("puntajeNivel").textContent = r.nivelSaberPro || "—";
            card.style.display = "block";
        }
    } catch (ex) { console.error(ex); }
}

async function cargarTodosResultados() {
    try {
        const res   = await fetch(BASE_URL + "/resultados");
        const lista = await res.json();
        const tbody = document.getElementById("tablaResultadosEst").querySelector("tbody");
        tbody.innerHTML = "";
        lista.forEach(function (r) {
            const nombreEst = r.estudiante ? r.estudiante.primerNombre + " " + r.estudiante.primerApellido : "-";
            const fila = document.createElement("tr");
            fila.innerHTML = "<td>" + r.id + "</td><td>" + nombreEst + "</td><td>" + (r.puntaje||"-") + "</td><td>" + (r.nivelSaberPro||"-") + "</td>";
            tbody.appendChild(fila);
        });
    } catch (ex) { console.error(ex); }
}

async function cargarBeneficiosEstudiante() {
    if (!estudianteActualId) {
        document.getElementById("beneficiosEstResult").textContent = "Primero identifíquese en la sección Inicio.";
        return;
    }
    try {
        const res   = await fetch(BASE_URL + "/informes/beneficios");
        const lista = await res.json();
        const div   = document.getElementById("beneficiosEstResult");
        const mios  = lista.filter(item => item.estudianteId === estudianteActualId);

        if (mios.length === 0) {
            div.innerHTML = `<div class="cred-item"><strong>Sin beneficios actualmente</strong><span>Requisito: alcanzar Nivel 4 en Saber Pro.</span></div>`;
        } else {
            div.innerHTML = mios.map(item => `
                <div class="cred-item">
                    <strong>🎁 ${item.beneficio}</strong>
                    <span>Puntaje: ${item.puntaje} — Nivel: ${item.nivelSaberPro}</span>
                </div>`).join("");
        }
    } catch (ex) { console.error(ex); }
}

// Se engancha al mostrarSeccion del HTML
document.addEventListener("DOMContentLoaded", function(){
    const original = window.mostrarSeccion;
    window.mostrarSeccion = function(id, btn){
        if(typeof original === "function") original(id, btn);
        if(id === "resultado")  cargarUltimoResultado();
        if(id === "todos")      cargarTodosResultados();
        if(id === "beneficios") cargarBeneficiosEstudiante();
    };
});
