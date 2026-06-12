// =============================
// facultades.js
// =============================

const URL_FACULTADES = BASE_URL + "/facultades";

/*
====================================
LISTAR FACULTADES
====================================
*/

async function cargarFacultades() {

    try {

        const response = await fetch(URL_FACULTADES);

        const lista = await response.json();

        const tbody = document.querySelector("#tablaFacultades tbody");

        tbody.innerHTML = "";

        lista.forEach(facultad => {

            tbody.innerHTML += `

                <tr>

                    <td>${facultad.id}</td>

                    <td>${facultad.nombre}</td>

                    <td>

<button class="btn-secundario" style="margin-right:4px" onclick="seleccionarFacultad(${facultad.id}, '${facultad.nombre}')">

<span>✏️ Editar</span>

                        </button>

<button class="btn-accion" onclick="eliminarFacultad(${facultad.id})">

                            Eliminar

                        </button>

                    </td>

                </tr>

            `;

        });

        cargarFacultadesSelect(lista);

    }

    catch (e) {

        console.log(e);

        alert("Error cargando facultades.");

    }

}

/*
====================================
CREAR
====================================
*/

async function crearFacultad() {

    const nombre = document.getElementById("fNombre").value;

    if (nombre.trim() === "") {

        alert("Ingrese el nombre.");

        return;

    }

    const response = await fetch(URL_FACULTADES, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            nombre: nombre

        })

    });

    if (response.ok) {

        document.getElementById("fNombre").value = "";

        cargarFacultades();

    }

    else {

        alert("No fue posible crear.");

    }

}

/*
====================================
SELECCIONAR
====================================
*/

function seleccionarFacultad(id, nombre) {
    const card = document.getElementById("cardEditarFacultad");
    if(card) card.style.display = "block";

    document.getElementById("fIdEditar").value = id;

    document.getElementById("fNombreEditar").value = nombre;

}

/*
====================================
EDITAR
====================================
*/

async function editarFacultad() {

    const id = document.getElementById("fIdEditar").value;

    const nombre = document.getElementById("fNombreEditar").value;

    if (id === "") {

        alert("Seleccione una facultad.");

        return;

    }

    const response = await fetch(

        URL_FACULTADES + "/" + id,

        {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                nombre: nombre

            })

        }

    );

    if (response.ok) {

        document.getElementById("fIdEditar").value = "";

        document.getElementById("fNombreEditar").value = "";

        cargarFacultades();

    }

    else {

        alert("No fue posible actualizar.");

    }

}

/*
====================================
ELIMINAR
====================================
*/

async function eliminarFacultad(id) {

    if (!confirm("¿Desea eliminar esta facultad?")) {

        return;

    }

    const response = await fetch(

        URL_FACULTADES + "/" + id,

        {

            method: "DELETE"

        }

    );

    if (response.ok) {

        cargarFacultades();

    }

    else {

        alert("No fue posible eliminar.");

    }

}

/*
====================================
CARGAR SELECTS
====================================
*/

function cargarFacultadesSelect(lista) {

    const selects = [

        "dFacultad",

        "drFacultad",

        "eFacultad",

        "doFacultadSelect"

    ];

    selects.forEach(id => {

        const select = document.getElementById(id);

        if (!select) {

            return;

        }

        select.innerHTML =

            "<option value=''>Seleccione Facultad</option>";

        lista.forEach(f => {

            select.innerHTML +=

                `<option value="${f.id}">${f.nombre}</option>`;

        });

    });

}

/*
====================================
INICIO
====================================
*/

window.addEventListener(

    "load",

    function () {

        if (document.getElementById("tablaFacultades")) {

            cargarFacultades();

        }

    }

);