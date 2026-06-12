
// =====================================
// directores.js
// =====================================

const URL_DIRECTORES = BASE_URL + "/directores";

/*
=========================================
CARGAR TODOS LOS DIRECTORES
=========================================
*/

async function cargarDirectores() {

    try {

        const response = await fetch(URL_DIRECTORES);

        if (!response.ok) {

            throw new Error("Error obteniendo directores");

        }

        const lista = await response.json();

        const tbody = document.querySelector("#tablaDirectores tbody");

        tbody.innerHTML = "";

        lista.forEach(director => {

            tbody.innerHTML += `

                <tr>

                    <td>${director.id}</td>

                    <td>${director.nombre}</td>

                    <td>${director.cedula}</td>

                    <td>${director.correo}</td>

                    <td>${director.facultad ? director.facultad.nombre : ""}</td>

                    <td>

                        <button onclick="eliminarDirector(${director.id})">

                            Eliminar

                        </button>

                    </td>

                </tr>

            `;

        });

    }

    catch(error){

        console.log(error);

        alert("Error cargando directores.");

    }

}

/*
=========================================
CREAR DIRECTOR
=========================================
*/

async function crearDirector(){

    const nombre = document.getElementById("drNombre").value;

    const cedula = document.getElementById("drCedula").value;

    const correo = document.getElementById("drCorreo").value;

    const facultad = document.getElementById("drFacultad").value;

    if(

        nombre.trim()==="" ||

        cedula.trim()==="" ||

        correo.trim()==="" ||

        facultad===""

    ){

        alert("Complete todos los campos.");

        return;

    }

    const body = {

        nombre: nombre,

        cedula: cedula,

        correo: correo,

        facultad:{

            id:Number(facultad)

        }

    };

    const response = await fetch(

        URL_DIRECTORES,

        {

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(body)

        }

    );

    if(response.ok){

        alert("Director creado correctamente.");

        document.getElementById("drNombre").value="";

        document.getElementById("drCedula").value="";

        document.getElementById("drCorreo").value="";

        document.getElementById("drFacultad").value="";

        cargarDirectores();

    }

    else{

        alert("No fue posible crear el director.");

    }

}

/*
=========================================
ELIMINAR DIRECTOR
=========================================
*/

async function eliminarDirector(id){

    const confirmar = confirm(

        "¿Desea eliminar este director?"

    );

    if(!confirmar){

        return;

    }

    const response = await fetch(

        URL_DIRECTORES+"/"+id,

        {

            method:"DELETE"

        }

    );

    if(response.ok){

        cargarDirectores();

    }

    else{

        alert("No fue posible eliminar.");

    }

}

/*
=========================================
INICIO
=========================================
*/

window.addEventListener(

    "load",

    function(){

        if(

            document.getElementById(

                "tablaDirectores"

            )

        ){

            cargarDirectores();

        }

    }

);
