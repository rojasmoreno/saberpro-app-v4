// =====================================
// docentes.js
// =====================================

const URL_DOCENTES = BASE_URL + "/docentes";

async function cargarDocentes() {
    try {
        const response = await fetch(URL_DOCENTES);
        if (!response.ok) throw new Error("Error obteniendo docentes");
        const lista = await response.json();
        const tbody = document.querySelector("#tablaDocentes tbody");
        if (!tbody) return;
        tbody.innerHTML = "";
        lista.forEach(docente => {
            tbody.innerHTML += `
                <tr>
                    <td>${docente.id}</td>
                    <td>${docente.nombre}</td>
                    <td>${docente.cedula}</td>
                    <td>${docente.correo}</td>
                    <td>${docente.facultad ? docente.facultad.nombre : ""}</td>
                    <td><button class="btn-accion" onclick="eliminarDocente(${docente.id})">Eliminar</button></td>
                </tr>`;
        });
    } catch(error) { console.log(error); }
}

async function crearDocente(){
    const nombre  = document.getElementById("dNombre").value;
    const cedula  = document.getElementById("dCedula").value;
    const correo  = document.getElementById("dCorreo").value;
    const facultad = document.getElementById("dFacultad").value;

    if(nombre.trim()==="" || cedula.trim()==="" || correo.trim()==="" || facultad===""){
        alert("Complete todos los campos."); return;
    }

    const response = await fetch(URL_DOCENTES, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ nombre, cedula, correo, facultad:{ id: Number(facultad) } })
    });

    if(response.ok){
        alert("Docente creado correctamente.");
        document.getElementById("dNombre").value="";
        document.getElementById("dCedula").value="";
        document.getElementById("dCorreo").value="";
        document.getElementById("dFacultad").value="";
        cargarDocentes();
    } else { alert("No fue posible crear el docente."); }
}

async function eliminarDocente(id){
    if(!confirm("¿Desea eliminar este docente?")) return;
    const response = await fetch(URL_DOCENTES+"/"+id, { method:"DELETE" });
    if(response.ok){ cargarDocentes(); }
    else { alert("No fue posible eliminar."); }
}

async function buscarDocentePorCedula(){
    const cedula = document.getElementById("buscarCedula").value;
    if(cedula.trim()===""){ alert("Ingrese una cédula."); return; }

    try {
        const response = await fetch(URL_DOCENTES+"/cedula/"+cedula);
        const div = document.getElementById("resultadoBusquedaDocente");

        if(response.ok){
            const d = await response.json();
            div.innerHTML = `
                <div class="cred-item" style="margin-top:12px">
                    <strong>👤 ${d.nombre}</strong>
                    <span>🪪 Cédula: ${d.cedula}</span><br>
                    <span>✉️ Correo: ${d.correo}</span><br>
                    <span>🏛 Facultad: ${d.facultad ? d.facultad.nombre : "—"}</span>
                </div>`;
        } else {
            div.innerHTML = `<p style="color:#c0392b;margin-top:10px">❌ Docente no encontrado.</p>`;
        }
    } catch(e) { console.log(e); }
}

// Buscar docentes por facultad (docente.html)
async function buscarDocentesPorFacultad(){
    const facultadId = document.getElementById("doFacultadSelect").value;
    if(!facultadId){ alert("Seleccione una facultad."); return; }
    try {
        const res = await fetch(URL_DOCENTES);
        const lista = await res.json();
        const filtrados = lista.filter(d => d.facultad && d.facultad.id == facultadId);
        const div = document.getElementById("resultadoFacultadDocentes");
        if(filtrados.length === 0){
            div.innerHTML = "<p style='color:#c0392b;margin-top:10px'>No hay docentes en esta facultad.</p>";
            return;
        }
        div.innerHTML = filtrados.map(d => `
            <div class="cred-item" style="margin-top:8px">
                <strong>👤 ${d.nombre}</strong>
                <span>🪪 Cédula: ${d.cedula} &nbsp;|&nbsp; ✉️ ${d.correo}</span>
            </div>`).join("");
    } catch(e){ console.log(e); }
}

async function buscarPorCedulaDocenteView(){
    const cedula = document.getElementById("doCedulaBuscar").value;
    if(cedula.trim()===""){ alert("Ingrese una cédula."); return; }
    try {
        const response = await fetch(URL_DOCENTES+"/cedula/"+cedula);
        const div = document.getElementById("resultadoCedulaDocente");
        if(response.ok){
            const d = await response.json();
            div.innerHTML = `
                <div class="cred-item" style="margin-top:12px">
                    <strong>👤 ${d.nombre}</strong>
                    <span>🪪 Cédula: ${d.cedula}</span><br>
                    <span>✉️ Correo: ${d.correo}</span><br>
                    <span>🏛 Facultad: ${d.facultad ? d.facultad.nombre : "—"}</span>
                </div>`;
        } else {
            div.innerHTML = `<p style="color:#c0392b;margin-top:10px">❌ Docente no encontrado.</p>`;
        }
    } catch(e){ console.log(e); }
}

window.addEventListener("load", function(){
    if(document.getElementById("tablaDocentes")){ cargarDocentes(); }
});
