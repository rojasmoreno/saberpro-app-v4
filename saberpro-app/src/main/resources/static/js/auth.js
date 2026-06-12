// ===============================
// auth.js
// ===============================

const BASE_URL = "http://localhost:8083/api";

/*
    LOGIN
*/

async function login() {

    const username = document.getElementById("usuario").value;

    const password = document.getElementById("password").value;

    try {

        const response = await fetch(BASE_URL + "/auth/login", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                username: username,

                password: password

            })

        });

        if (!response.ok) {

            document.getElementById("mensajeError").innerHTML =
                "Usuario o contraseña incorrectos.";

            return;

        }

        const usuario = await response.json();

        localStorage.setItem(

            "usuario",

            JSON.stringify(usuario)

        );

        switch (usuario.rol) {

            case "ADMINISTRADOR":

                window.location.href = "admin.html";

                break;

            case "COORDINADOR":

                window.location.href = "coordinador.html";

                break;

            case "DOCENTE":

                window.location.href = "docente.html";

                break;

            case "ESTUDIANTE":

                window.location.href = "estudiante.html";

                break;

            default:

                alert("Rol no válido");

        }

    }

    catch (e) {

        console.log(e);

        document.getElementById("mensajeError").innerHTML =
            "Error conectando con el servidor.";

    }

}

/*
    OBTENER USUARIO LOGUEADO
*/

function obtenerUsuario() {

    return JSON.parse(

        localStorage.getItem("usuario")

    );

}

/*
    VALIDAR SESION
*/

function validarSesion() {

    const usuario = obtenerUsuario();

    if (usuario == null) {

        window.location.href = "login.html";

    }

}

/*
    CERRAR SESION
*/

function cerrarSesion() {

    localStorage.removeItem("usuario");

    window.location.href = "login.html";

}

/*
    AL CARGAR LA PAGINA
*/

window.onload = function () {

    if (

        window.location.pathname.includes("login")

    ) {

        return;

    }

    validarSesion();

};