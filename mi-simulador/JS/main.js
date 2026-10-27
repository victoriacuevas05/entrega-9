// classes

class Pelicula {

    constructor(titulo, genero, vista, reseña, stock) {
        this.titulo = titulo;
        this.genero = genero;
        this.vista = vista;
        this.reseña = reseña;
        this.stock = stock;
    }


    marcarComoVista() {
        this.vista = !this.vista;
    }

    guardarResena(reseña) {
        this.reseña = reseña;
    }

}

// arrays

const actores = JSON.parse(localStorage.getItem("actores")) || [];


const peliculasIniciales = [
    new Pelicula("obsesión", "Terror", false, "", 6),
    new Pelicula("son como niños", "Comedia", false, "", 0),
    new Pelicula("maze runner", "Ciencia ficción", false, "", 3),
    new Pelicula("e.t.", "Ciencia ficción", false, "", 0),
    new Pelicula("toy story", "Animación", false, "", 1),
    new Pelicula("Bajo la misma estrella", "Drama", false, "", 3),
    new Pelicula("Siempre el mismo día", "Romance", false, "", 5),
    new Pelicula("Hachiko", "Drama", false, "", 0),
    new Pelicula("Titanic", "Romance", false, "", 4),
    new Pelicula("La vida es bella", "Drama", false, "", 6)
];
let peliculas = [...peliculasIniciales];
// guardadas local

const guardadas = localStorage.getItem("peliculas");

if (guardadas !== null) {
    peliculas = JSON.parse(guardadas).map(
        peli => new Pelicula(
            peli.titulo,
            peli.genero,
            peli.vista,
            peli.reseña,
            peli.stock
        )
    );
}

// todos los get element by id

const formulario = document.getElementById("formulario-pelicula");
const inputTitulo = document.getElementById("titulo");
const inputGenero = document.getElementById("genero");
const contenedor = document.getElementById("contenedorpeliculas");
const mensaje = document.getElementById("mensaje");
const selectAnimo = document.getElementById("estado-animo");
const botonRecomendar = document.getElementById("boton-recomendar");
const resultadoRecomendacion = document.getElementById("resultado-recomendacion");
const inputBuscar = document.getElementById("buscar-pelicula");
const botonBuscar = document.getElementById("boton-buscar");
const resultadoBusqueda = document.getElementById("resultado-busqueda")
const botonStock = document.getElementById("boton-stock");
const resultadoStock = document.getElementById("resultado-stock");
const inputActor = document.getElementById("actor-favorito");
const botonActor = document.getElementById("boton-actor");
const listaActores = document.getElementById("lista-actores");
const botonVaciar = document.getElementById("boton-vaciar");
const mensajeVaciar = document.getElementById("mensaje-vaciar");
const botonRecuperar = document.getElementById("boton-recuperar");
const formularioUsuario = document.getElementById("formulario-usuario");
const inputNombre = document.getElementById("nombre-usuario");
const inputAño = document.getElementById("año-nacimiento");
const mensajeBienvenida = document.getElementById("mensaje-bienvenida");
const filtroGenero = document.getElementById("filtro-genero");

const botonCargar = document.getElementById("boton-cargar");
const estadoCarga = document.getElementById("estado-carga");
// localstorage pelis

function guardarPeliculas() {
    localStorage.setItem("peliculas", JSON.stringify(peliculas));
}


// function recuperar

function vaciarDiario() {

    const confirmar = confirm("¿Estás seguro de que querés vaciar tu diario?");

    if (confirmar) {
        peliculas.length = 0;

        guardarPeliculas();
        renderizarPeliculas();

        mensajeVaciar.textContent = "Tu diario fue vaciado correctamente.";
    }
}

botonVaciar.addEventListener("click", vaciarDiario);


// recuperar diario

function recuperarDiario() {

    const confirmar = confirm("¿Querés recuperar las películas originales?");

    if (confirmar) {
        peliculas = peliculasIniciales.map(
            peli => new Pelicula(
                peli.titulo,
                peli.genero,
                peli.vista,
                peli.reseña,
                peli.stock
            )
        );

        guardarPeliculas();
        renderizarPeliculas();

        mensajeVaciar.textContent = "¡Diario recuperado correctamente!";
    }
}

botonRecuperar.addEventListener("click", recuperarDiario);


// Función para mostrar las películas 


function renderizarPeliculas() {

    contenedor.innerHTML = "";

    const generoSeleccionado = filtroGenero.value;

    const peliculasFiltradas = peliculas.filter(pelicula =>
        generoSeleccionado === "Todos" ||
        pelicula.genero === generoSeleccionado
    );

    peliculasFiltradas.forEach((pelicula, indice) => {

        const { titulo, genero, vista } = pelicula;

        contenedor.innerHTML += `
            <article class="tarjeta-pelicula">

                <h3>${titulo}</h3>

                <p>Género: ${genero}</p>

                <p>Estado: ${vista ? "Vista" : "No vista"}</p>

                <textarea
                    class="input-resena"
                    placeholder="Escribí tu reseña..."
                ></textarea>

<button id="vista-${indice}">
    ${vista ? "Marcar como no vista" : "Marcar como vista"}
</button>

<button id="resena-${indice}">
    Guardar reseña
</button>

<button id="eliminar-${indice}">
    Eliminar
</button>

    
            </article>
        `;


        // Mostrar las reseñas guardadas


        const tarjetas = contenedor.querySelectorAll(".tarjeta-pelicula");
        const ultimaTarjeta = tarjetas[tarjetas.length - 1];

        ultimaTarjeta.querySelector(".input-resena").value = pelicula.reseña || "";

    });

    peliculasFiltradas.forEach((pelicula, indice) => {

        const botonVista = document.getElementById("vista-" + indice);
        const botonResena = document.getElementById("resena-" + indice);
        const botonEliminar = document.getElementById("eliminar-" + indice);

        botonVista.addEventListener("click", function () {
            pelicula.marcarComoVista();

            guardarPeliculas();
            renderizarPeliculas();
        });

        botonResena.addEventListener("click", function () {
            const tarjetas = contenedor.querySelectorAll(".tarjeta-pelicula");
            const inputResena = tarjetas[indice].querySelector(".input-resena");

            pelicula.guardarResena(inputResena.value.trim());

            guardarPeliculas();
            renderizarPeliculas();
        });

        botonEliminar.addEventListener("click", function () {
            peliculas = peliculas.filter(peli => peli !== pelicula);

            guardarPeliculas();
            renderizarPeliculas();
        });

    });
}
filtroGenero.addEventListener("change", renderizarPeliculas);
//  formulario para agrgar

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const titulo = inputTitulo.value.trim();
    const genero = inputGenero.value.trim();



    if (titulo.length < 2) {
        mensaje.textContent = "Ingresá un título válido de al menos 2 caracteres.";
        return;
    }

    if (genero === "") {
        mensaje.textContent = "Seleccioná un género.";
        return;
    }

    const peliculaExistente = peliculas.find(
        pelicula => pelicula.titulo.toLowerCase() === titulo.toLowerCase()
    );

    if (peliculaExistente) {
        mensaje.textContent = "Esta película ya está en tu diario.";
        return;
    }


    const nuevaPelicula = new Pelicula(
        titulo,
        genero,
        false,
        "",
        0
    );

    peliculas.push(nuevaPelicula);

    guardarPeliculas();

    renderizarPeliculas();

    mensaje.textContent = "¡Película agregada a tu diario!";

    formulario.reset();

});



// function para buscarrrrr
function consultar() {

    const buscar = inputBuscar.value.trim();

    if (buscar === "") {
        resultadoBusqueda.textContent = "Ingresá una película.";
        return;
    }

    const buscaTUPELI = peliculas.find(
        peli => peli.titulo.toLowerCase() === buscar.toLowerCase()
    );

    if (buscaTUPELI) {

        resultadoBusqueda.innerHTML = `
            <h3>${buscaTUPELI.titulo}</h3>
            <p>Género: ${buscaTUPELI.genero}</p>
            <p>Stock disponible: ${buscaTUPELI.stock}</p>
            <p>Estado: ${buscaTUPELI.vista ? "Vista" : "No vista"}</p>
            <p>Reseña: ${buscaTUPELI.reseña || "Todavía no tiene reseña"}</p>
        `;

    } else {

        resultadoBusqueda.textContent =
            "No encontramos esa película. Revisá el nombre e intentá de nuevo.";
    }
}
botonBuscar.addEventListener("click", consultar);

// function para sacar stock total

function total() {

    const stockTotal = peliculas.reduce(
        (total, peli) => total + peli.stock,
        0
    );

    resultadoStock.textContent = "Stock total: " + stockTotal;
}

botonStock.addEventListener("click", total);

// function para recomendar por animo 

function recomendarPorEstadoDeAnimo() {

    const genero = selectAnimo.value;

    const recomendadas = peliculas.filter(
        pelicula => pelicula.genero === genero
    );


    const titulos = [];

    recomendadas.forEach(pelicula => {
        titulos.push(pelicula.titulo);
    });

    resultadoRecomendacion.textContent =
        recomendadas.length > 0
            ? "Te recomendamos: " + titulos.join(", ")
            : "No tenemos películas de ese género.";
}
botonRecomendar.addEventListener("click", recomendarPorEstadoDeAnimo);

// actor function

function actorFavorito() {

    const actor = inputActor.value.trim();

    if (actor === "" || !/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s.'-]+$/.test(actor)) {
        inputActor.placeholder = "Ingresá un nombre válido";
        return;
    }

    actores.push(actor);

    localStorage.setItem("actores", JSON.stringify(actores));

    renderizarActores();

    inputActor.value = "";
}
botonActor.addEventListener("click", actorFavorito);

// renderizarActores

function renderizarActores() {

    listaActores.innerHTML = "";

    actores.forEach((actor, indice) => {

        const li = document.createElement("li");

        const nombreActor = document.createElement("span");
        nombreActor.textContent = actor;

        const botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";
        botonEditar.id = "editar-actor-" + indice;

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.id = "eliminar-actor-" + indice;

        // ELIMINAR ACTOR
        botonEliminar.addEventListener("click", function () {

            actores.splice(indice, 1);

            localStorage.setItem("actores", JSON.stringify(actores));

            renderizarActores();
        });

        // EDITAR ACTOR
        botonEditar.addEventListener("click", function () {

            const inputEditar = document.createElement("input");
            inputEditar.type = "text";
            inputEditar.value = actor;

            const botonGuardar = document.createElement("button");
            botonGuardar.textContent = "Guardar";

            li.innerHTML = "";

            li.appendChild(inputEditar);
            li.appendChild(botonGuardar);

            botonGuardar.addEventListener("click", function () {

                const nuevoNombre = inputEditar.value.trim();

                if (
                    nuevoNombre === "" ||
                    !/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s.'-]+$/.test(nuevoNombre)
                ) {
                    inputEditar.placeholder = "Ingresá un nombre válido";
                    return;
                }

                actores[indice] = nuevoNombre;

                localStorage.setItem("actores", JSON.stringify(actores));

                renderizarActores();
            });
        });

        li.appendChild(nombreActor);
        li.appendChild(botonEditar);
        li.appendChild(botonEliminar);

        listaActores.appendChild(li);
    });

}

renderizarActores();


// inicio

formularioUsuario.addEventListener("submit", function (event) {

    event.preventDefault();

    const nombre = inputNombre.value.trim();
    const añoNacimiento = Number(inputAño.value);
    const edad = new Date().getFullYear() - añoNacimiento;

    if (nombre === "" || !/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/.test(nombre)) {
        mensajeBienvenida.textContent =
            "Ingresá un nombre válido, sin números ni símbolos.";
        return;
    }

    if (!Number.isInteger(añoNacimiento) ||
        añoNacimiento < 1900 ||
        añoNacimiento > new Date().getFullYear()) {

        mensajeBienvenida.textContent =
            "Ingresá un año de nacimiento válido.";
        return;
    }

    mensajeBienvenida.textContent =
        "¡Bienvenido a Film Journal, " + nombre + "!";

    localStorage.setItem("nombre", nombre);
    localStorage.setItem("añoNacimiento", añoNacimiento);

    console.log("Edad aproximada:", edad);
});
const nombreGuardado = localStorage.getItem("nombre");

if (nombreGuardado !== null) {

    mensajeBienvenida.textContent =
        "¡Bienvenido nuevamente, " + nombreGuardado + "!";
}

function cargarPeliculas() {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (Array.isArray(peliculas)) {
                resolve(peliculas);
            } else {
                reject(new Error("No se pudieron cargar las películas"));
            }

        }, 2000);

    });
}

async function mostrarDiario() {

    try {
        estadoCarga.textContent = "Cargando películas...";

        const peliculasCargadas = await cargarPeliculas();

        renderizarPeliculas();

        estadoCarga.textContent =
            peliculasCargadas.length + " películas cargadas";

    } catch (error) {

        estadoCarga.textContent =
            "No se pudo cargar el diario. Intentá nuevamente.";

        console.error(error);

    } finally {

        console.log("Proceso de carga finalizado");

    }
}
botonCargar.addEventListener("click", mostrarDiario);
// settimeout

setTimeout(() => {
    const mensaje = document.getElementById("recordatorio");

    mensaje.textContent =
        " ¡No olvides registrar las películas que viste!";
}, 3000)

renderizarPeliculas();