//Estructura que mantiene las palabras del juego
let bd = new Array(4);
bd[0] = ['PROTECCIÓN DE DATOS', 'CIBERSEGURIDAD', 'FRAUDE INFORMÁTICO', 'DELITOS INFORMÁTICOS', 'PRIVACIDAD'];
bd[1] = ['DERECHO AL OLVIDO', 'FIRMA ELECTRÓNICA', 'LEY DE COMERCIO ELECTRÓNICO', 'PROPIEDAD INTELECTUAL', 'PATENTE DE SOFTWARE'];
bd[2] = ['LEY ORGÁNICA DE COMUNICACIÓN', 'DERECHO INFORMÁTICO', 'NORMATIVA DE ACCESO A LA INFORMACIÓN', 'TRANSPARENCIA', 'GOBIERNO ELECTRÓNICO'];
bd[3] = ['HABEAS DATA', 'REGULACIÓN DE PLATAFORMAS DIGITALES', 'RESPONSABILIDAD DE LOS PROVEEDORES', 'CONTRATOS ELECTRÓNICOS', 'SANCIONES POR CIBERCRÍMENES'];
//categorías
let categorias = ['CONCEPTOS GENERALES (lvl1)', 'HERRAMIENTAS LEGALES (lvl2)', 'NORMATIVAS (lvl3)', 'REGULACIONES Y SANCIONES (lvl4)']
//cantidad de palabras con las que se jugará cada categoría
const cantidadPalabras = 5;
//este arreglo guardará las 5 palabras en cada categoría
let palabras = [];
//este arreglo guardará las palabras desordenadas
let desordenadas = [];
//mantiene el nivel actual
let pos = 0;

//tomo una categoría y selecciono 5 palabras random para jugar
function agregarPalabras(categoria) {
    for (i = 0; i < cantidadPalabras; i++) {
        let x = Math.floor(Math.random() * categoria.length);
        palabras.push(categoria[x].trim()); // Elimina espacios innecesarios
        categoria.splice(x, 1);
    }
}
agregarPalabras(bd[pos]);

//Función para desordenar las palabras - quedan guardadas en :desordenadas
// Función para desordenar las letras de las palabras manteniendo los espacios
// Función para desordenar las letras dentro de cada palabra, manteniendo los espacios
function desordenarPalabras() {
    for (var i = 0; i < palabras.length; i++) {
        // Convertimos la palabra en un arreglo de caracteres
        let palabra = palabras[i];
        
        // Convertimos la palabra en un arreglo de palabras separadas por espacios
        let partes = palabra.split(' ');

        // Arreglo para almacenar las palabras desordenadas
        let partesDesordenadas = [];

        // Desordenamos cada palabra individualmente
        for (let j = 0; j < partes.length; j++) {
            let palabraPart = partes[j].split('');
            // Desordenamos las letras
            let palabraDesordenada = palabraPart.sort(() => Math.random() - 0.5).join('');
            partesDesordenadas.push(palabraDesordenada);
        }

        // Unimos las palabras desordenadas con espacios
        let palabraDesordenada = partesDesordenadas.join(' ');

        // Controlamos que la palabra desordenada no sea igual a la original
        if (palabraDesordenada === palabras[i]) {
            i--; // Reintenta desordenar si la palabra es igual a la original
        } else {
            // Guardamos la palabra desordenada en el arreglo de palabras desordenadas
            desordenadas.push(palabraDesordenada.trim()); // Elimina espacios innecesarios
        }
    }
}


//Función para agregar las palabras y el input
function agregarPalabra() {
    //agregamos título
    let h2 = document.createElement("h2");
    h2.textContent = categorias[pos];
    document.querySelector("#contenedor").appendChild(h2);
    for (var i = 0; i < desordenadas.length; i++) {
        let div = document.createElement("div");
        div.className = "fila";
        let palabra = document.createElement("div")
        palabra.textContent = desordenadas[i];
        palabra.className = "palabra";
        div.appendChild(palabra);
        let input = document.createElement("input");
        input.id = i;
        //al input le agrego el evento onkeyup para detectar cuando se presionó una tecla
        //y llamo a la función corregir
        input.setAttribute("onkeyup", "corregir(" + i + ")");
        div.appendChild(input);
        document.querySelector("#contenedor").appendChild(div);
    }
}

desordenarPalabras();
agregarPalabra();
efectoNivel();

//Función para corregir las respuestas del jugador
function corregir(i) {
    p = document.getElementById(i).value.trim(); // Elimina espacios innecesarios del input
    if (p == "") {
        return;
    }
    if (p == palabras[i]) {
        document.getElementById(i).className = "correcta";
        controlarFin();
    } else {
        document.getElementById(i).className = "";
    }
}

let btnCreado = false;
function controlarFin() {
    let total = document.getElementsByClassName("correcta").length;
    if (total == cantidadPalabras && btnCreado == false) {
        let button = document.createElement("button");
        button.textContent = "Siguiente";
        button.setAttribute("onclick", "siguiente()");
        document.querySelector("#contenedor").appendChild(button);
        btnCreado = true;

        //desbloqueamos el nivel
        let niveles = document.getElementsByClassName("nivel");
        niveles[pos].classList = "nivel completado";
    }
}

function siguiente() {
    palabras.length = 0;
    desordenadas.length = 0;
    document.querySelector("#contenedor").textContent = "";
    pos++;
    //controlo si terminó el juego
    if (pos < bd.length) {
        btnCreado = false;
        agregarPalabras(bd[pos]);
        desordenarPalabras();
        efectoNivel();
        agregarPalabra();
    } else {
        let h2 = document.createElement("h2");
        h2.textContent = "JUEGO FINALIZADO!! MUY BIEN!!";
        document.querySelector("#contenedor").appendChild(h2);
    }

}

//agrego el borde con efecto al nivel actual
function efectoNivel() {
    let niveles = document.getElementsByClassName("nivel");
    niveles[pos].style.boxShadow = "0px 0px 7px 5px green";
}
