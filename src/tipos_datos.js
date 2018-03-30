let tablasDeJuego = {
    "2 parejas":
        {
            "dificultad": "0",
            "columnas": "2",
            "filas": "2",
            "anchoCasilla": "300px",
            "altoCasilla": "300px",
            "fuente": "100px"
        },
    "3 parejas":
        {
            "dificultad": "1",
            "columnas": "3",
            "filas": "2",
            "anchoCasilla": "300px",
            "altoCasilla": "300px",
            "fuente": "100px"
        },
    "8 parejas":
        {
            "dificultad": "2",
            "columnas": "4",
            "filas": "4",
            "anchoCasilla": "150px",
            "altoCasilla": "150px",
            "fuente": "40px"
        },
    "10 parejas":
        {
            "dificultad": "3",
            "columnas": "5",
            "filas": "4",
            "anchoCasilla": "150px",
            "altoCasilla": "150px",
            "fuente": "40px"
        },
    "12 parejas":
        {
            "dificultad": "4",
            "columnas": "6",
            "filas": "4",
            "anchoCasilla": "150px",
            "altoCasilla": "150px",
            "fuente": "38px"
        },
    "14 parejas":
        {
            "dificultad": "5",
            "columnas": "7",
            "filas": "4",
            "altoTabla": "480px",
            "anchoCasilla": "120px",
            "altoCasilla": "120px",
            "fuente": "30px"
        },
    "16 parejas":
        {
            "dificultad": "6",
            "columnas": "8",
            "filas": "4",
            "altoTabla": "328px",
            "anchoCasilla": "82px",
            "altoCasilla": "82px",
            "fuente": "20px"
        },
    "20 parejas":
        {
            "dificultad": "7",
            "columnas": "8",
            "filas": "5",
            "anchoCasilla": "117px",
            "altoCasilla": "117px",
            "fuente": "28px"
        }
}

// 
//     Sobre objeto "tipos":
//     - la primera propiedad tiene el nombre del juego; letras, colores, color_descripcion, etc., y su "valor" es el conjunto de datos de las celdas
//         - nombre: para darle un nombre distinto para mostrarlo en la lista de juegos disponibles
//         - "indice": para recuperar los elementos en el orden del índice y así mantener ese orden en la lista
//                   que se le muestra al usuario.
//         - "val": es el "valor" en sí de la celda; un texto, un color, una imagen, un sonido, etc.
//         - "orden": se utiliza para identificar precisamente a una celda, de modo que dos celdas con igual numero de orden serán pareja
//         (así, se pueden hacer parejas con elementos distintos, pero que son pareja, como "mosca" y "fly")
//         - "tipo": se utiliza para saber cómo rellenar la celda. Si es texto en jQuery con "text()", si es fondo con "css(background-color), etc.
// 
let tipos = {
    "Alfabeto":
        {
            "clase": "alfabeto",
            "indice": "0",
            "formatos_disponibles": ["8 parejas", "10 parejas", "20 parejas"],
            "imagenes": "0",
            "fondo": "fondo_matrix.jpg",
            "valor": [
                { "val": "A", "orden": "1", "tipo": "texto" }, { "val": "a", "orden": "1", "tipo": "texto" },
                { "val": "B", "orden": "2", "tipo": "texto" }, { "val": "b", "orden": "2", "tipo": "texto" },
                { "val": "C", "orden": "3", "tipo": "texto" }, { "val": "c", "orden": "3", "tipo": "texto" },
                { "val": "D", "orden": "4", "tipo": "texto" }, { "val": "d", "orden": "4", "tipo": "texto" },
                { "val": "E", "orden": "5", "tipo": "texto" }, { "val": "e", "orden": "5", "tipo": "texto" },
                { "val": "F", "orden": "6", "tipo": "texto" }, { "val": "f", "orden": "6", "tipo": "texto" },
                { "val": "G", "orden": "7", "tipo": "texto" }, { "val": "g", "orden": "7", "tipo": "texto" },
                { "val": "H", "orden": "8", "tipo": "texto" }, { "val": "h", "orden": "8", "tipo": "texto" },
                { "val": "I", "orden": "9", "tipo": "texto" }, { "val": "i", "orden": "9", "tipo": "texto" },
                { "val": "J", "orden": "10", "tipo": "texto" }, { "val": "j", "orden": "10", "tipo": "texto" },
                { "val": "K", "orden": "11", "tipo": "texto" }, { "val": "k", "orden": "11", "tipo": "texto" },
                { "val": "L", "orden": "12", "tipo": "texto" }, { "val": "l", "orden": "12", "tipo": "texto" },
                { "val": "M", "orden": "13", "tipo": "texto" }, { "val": "m", "orden": "13", "tipo": "texto" },
                { "val": "N", "orden": "14", "tipo": "texto" }, { "val": "n", "orden": "14", "tipo": "texto" },
                { "val": "O", "orden": "15", "tipo": "texto" }, { "val": "o", "orden": "15", "tipo": "texto" },
                { "val": "P", "orden": "16", "tipo": "texto" }, { "val": "p", "orden": "16", "tipo": "texto" },
                { "val": "Q", "orden": "17", "tipo": "texto" }, { "val": "q", "orden": "17", "tipo": "texto" },
                { "val": "R", "orden": "18", "tipo": "texto" }, { "val": "r", "orden": "18", "tipo": "texto" },
                { "val": "S", "orden": "19", "tipo": "texto" }, { "val": "s", "orden": "19", "tipo": "texto" },
                { "val": "T", "orden": "20", "tipo": "texto" }, { "val": "t", "orden": "20", "tipo": "texto" }
            ]
        },
    "Colores":
        {
            "clase": "colores",
            "indice": "1",
            "formatos_disponibles": ["8 parejas", "10 parejas"],
            "imagenes": "0",
            "fondo": "fondo_colores.jpg",
            "valor": [
                { "val": "pink", "orden": "1", "tipo": "color" }, { "val": "pink", "orden": "1", "tipo": "color" },
                { "val": "red", "orden": "2", "tipo": "color" }, { "val": "red", "orden": "2", "tipo": "color" },
                { "val": "blue", "orden": "3", "tipo": "color" }, { "val": "blue", "orden": "3", "tipo": "color" },
                { "val": "yellow", "orden": "4", "tipo": "color" }, { "val": "yellow", "orden": "4", "tipo": "color" },
                { "val": "gray", "orden": "5", "tipo": "color" }, { "val": "gray", "orden": "5", "tipo": "color" },
                { "val": "green", "orden": "6", "tipo": "color" }, { "val": "green", "orden": "6", "tipo": "color" },
                { "val": "brown", "orden": "7", "tipo": "color" }, { "val": "brown", "orden": "7", "tipo": "color" },
                { "val": "black", "orden": "8", "tipo": "color" }, { "val": "black", "orden": "8", "tipo": "color" },
                { "val": "blueviolet", "orden": "9", "tipo": "color" }, { "val": "blueviolet", "orden": "9", "tipo": "color" },
                { "val": "purple", "orden": "10", "tipo": "color" }, { "val": "purple", "orden": "10", "tipo": "color" },
                { "val": "orange", "orden": "11", "tipo": "color" }, { "val": "orange", "orden": "11", "tipo": "color" }
            ]
        },
    "Colores en Inglés":
        {
            
            "indice": "3",
            "formatos_disponibles": ["8 parejas", "10 parejas"],
            "imagenes": "0",
            "fondo": "fondo_madera.jpg",
            "valor": [
                { "val": "pink", "orden": "1", "tipo": "color" }, { "val": "pink", "orden": "1", "color_texto": "red", "tipo": "texto_color" },
                { "val": "red", "orden": "2", "tipo": "color" }, { "val": "red", "orden": "2", "color_texto": "blue", "tipo": "texto_color" },
                { "val": "blue", "orden": "3", "tipo": "color" }, { "val": "blue", "orden": "3", "color_texto": "pink", "tipo": "texto_color" },
                { "val": "yellow", "orden": "4", "tipo": "color" }, { "val": "yellow", "orden": "4", "color_texto": "violet", "tipo": "texto_color" },
                { "val": "gray", "orden": "5", "tipo": "color" }, { "val": "gray", "orden": "5", "color_texto": "purple", "tipo": "texto_color" },
                { "val": "green", "orden": "6", "tipo": "color" }, { "val": "green", "orden": "6", "color_texto": "black", "tipo": "texto_color" },
                { "val": "brown", "orden": "7", "tipo": "color" }, { "val": "brown", "orden": "7", "color_texto": "orange", "tipo": "texto_color" },
                { "val": "black", "orden": "8", "tipo": "color" }, { "val": "black", "orden": "8", "color_texto": "yellow", "tipo": "texto_color" },
                { "val": "purple", "orden": "9", "tipo": "color" }, { "val": "purple", "orden": "9", "color_texto": "gray", "tipo": "texto_color" },
                { "val": "orange", "orden": "10", "tipo": "color" }, { "val": "orange", "orden": "10", "color_texto": "green", "tipo": "texto_color" }
            ]
        },
    "La Liga":
        {
            "clase": "la_liga",
            "indice": "2",
            "formatos_disponibles": ["10 parejas", "14 parejas", "20 parejas"],
            "imagenes": "1",
            "fondo": "fondo_cesped.jpg",
            "valor": [
                { "val": "alaves.gif", "orden": "1", "tipo": "imagen" }, { "val": "alaves.gif", "orden": "1", "tipo": "imagen" },
                { "val": "atmadrid.gif", "orden": "2", "tipo": "imagen" }, { "val": "atmadrid.gif", "orden": "2", "tipo": "imagen" },
                { "val": "barcelona.gif", "orden": "3", "tipo": "imagen" }, { "val": "barcelona.gif", "orden": "3", "tipo": "imagen" },
                { "val": "betis.gif", "orden": "4", "tipo": "imagen" }, { "val": "betis.gif", "orden": "4", "tipo": "imagen" },
                { "val": "bilbao.gif", "orden": "5", "tipo": "imagen" }, { "val": "bilbao.gif", "orden": "5", "tipo": "imagen" },
                { "val": "celta.gif", "orden": "6", "tipo": "imagen" }, { "val": "celta.gif", "orden": "6", "tipo": "imagen" },
                { "val": "deportivo.gif", "orden": "7", "tipo": "imagen" }, { "val": "deportivo.gif", "orden": "7", "tipo": "imagen" },
                { "val": "eibar.gif", "orden": "8", "tipo": "imagen" }, { "val": "eibar.gif", "orden": "8", "tipo": "imagen" },
                { "val": "espanyol.gif", "orden": "9", "tipo": "imagen" }, { "val": "espanyol.gif", "orden": "9", "tipo": "imagen" },
                { "val": "getafe.gif", "orden": "10", "tipo": "imagen" }, { "val": "getafe.gif", "orden": "10", "tipo": "imagen" },
                { "val": "girona.gif", "orden": "11", "tipo": "imagen" }, { "val": "girona.gif", "orden": "11", "tipo": "imagen" },
                { "val": "laspalmas.gif", "orden": "12", "tipo": "imagen" }, { "val": "laspalmas.gif", "orden": "12", "tipo": "imagen" },
                { "val": "leganes.gif", "orden": "13", "tipo": "imagen" }, { "val": "leganes.gif", "orden": "13", "tipo": "imagen" },
                { "val": "levante.gif", "orden": "14", "tipo": "imagen" }, { "val": "levante.gif", "orden": "14", "tipo": "imagen" },
                { "val": "malaga.gif", "orden": "15", "tipo": "imagen" }, { "val": "malaga.gif", "orden": "15", "tipo": "imagen" },
                { "val": "realmadrid.gif", "orden": "16", "tipo": "imagen" }, { "val": "realmadrid.gif", "orden": "16", "tipo": "imagen" },
                { "val": "realsociedad.gif", "orden": "17", "tipo": "imagen" }, { "val": "realsociedad.gif", "orden": "17", "tipo": "imagen" },
                { "val": "sevilla.gif", "orden": "18", "tipo": "imagen" }, { "val": "sevilla.gif", "orden": "18", "tipo": "imagen" },
                { "val": "valencia.gif", "orden": "19", "tipo": "imagen" }, { "val": "valencia.gif", "orden": "19", "tipo": "imagen" },
                { "val": "villareal.gif", "orden": "20", "tipo": "imagen" }, { "val": "villareal.gif", "orden": "20", "tipo": "imagen" }
            ]
        },
    "Fotos Silvia":
        {
            "clase": "fotos_silvia",
            "indice": "4",
            "formatos_disponibles": ["8 parejas", "10 parejas", "20 parejas"],
            "imagenes": "1",
            "fondo": "fondo_flores.jpg",
            "valor": [
                { "val": "silvia1.jpg", "orden": "1", "tipo": "imagen" }, { "val": "silvia1.jpg", "orden": "1", "tipo": "imagen" },
                { "val": "silvia2.jpg", "orden": "2", "tipo": "imagen" }, { "val": "silvia2.jpg", "orden": "2", "tipo": "imagen" },
                { "val": "silvia3.jpg", "orden": "3", "tipo": "imagen" }, { "val": "silvia3.jpg", "orden": "3", "tipo": "imagen" },
                { "val": "silvia4.jpg", "orden": "4", "tipo": "imagen" }, { "val": "silvia4.jpg", "orden": "4", "tipo": "imagen" },
                { "val": "silvia5.jpg", "orden": "5", "tipo": "imagen" }, { "val": "silvia5.jpg", "orden": "5", "tipo": "imagen" },
                { "val": "silvia6.jpg", "orden": "6", "tipo": "imagen" }, { "val": "silvia6.jpg", "orden": "6", "tipo": "imagen" },
                { "val": "silvia7.jpg", "orden": "7", "tipo": "imagen" }, { "val": "silvia7.jpg", "orden": "7", "tipo": "imagen" },
                { "val": "silvia8.jpg", "orden": "8", "tipo": "imagen" }, { "val": "silvia8.jpg", "orden": "8", "tipo": "imagen" },
                { "val": "silvia9.jpg", "orden": "9", "tipo": "imagen" }, { "val": "silvia9.jpg", "orden": "9", "tipo": "imagen" },
                { "val": "silvia10.jpg", "orden": "10", "tipo": "imagen" }, { "val": "silvia10.jpg", "orden": "10", "tipo": "imagen" },
                { "val": "silvia11.jpg", "orden": "11", "tipo": "imagen" }, { "val": "silvia11.jpg", "orden": "11", "tipo": "imagen" },
                { "val": "silvia12.jpg", "orden": "12", "tipo": "imagen" }, { "val": "silvia12.jpg", "orden": "12", "tipo": "imagen" },
                { "val": "silvia13.jpg", "orden": "13", "tipo": "imagen" }, { "val": "silvia13.jpg", "orden": "13", "tipo": "imagen" },
                { "val": "silvia14.jpg", "orden": "14", "tipo": "imagen" }, { "val": "silvia14.jpg", "orden": "14", "tipo": "imagen" },
                { "val": "silvia15.jpg", "orden": "15", "tipo": "imagen" }, { "val": "silvia15.jpg", "orden": "15", "tipo": "imagen" },
                { "val": "silvia16.jpg", "orden": "16", "tipo": "imagen" }, { "val": "silvia16.jpg", "orden": "16", "tipo": "imagen" },
                { "val": "silvia17.jpg", "orden": "17", "tipo": "imagen" }, { "val": "silvia17.jpg", "orden": "17", "tipo": "imagen" },
                { "val": "silvia18.jpg", "orden": "18", "tipo": "imagen" }, { "val": "silvia18.jpg", "orden": "18", "tipo": "imagen" },
                { "val": "silvia19.jpg", "orden": "19", "tipo": "imagen" }, { "val": "silvia19.jpg", "orden": "19", "tipo": "imagen" },
                { "val": "silvia20.jpg", "orden": "20", "tipo": "imagen" }, { "val": "silvia20.jpg", "orden": "20", "tipo": "imagen" }
            ]
        }
};

let Partida = function () {
    let sThis = this;

    this.datosPartida = {
        jugador: "",
        juego: "",
        tabla: "",
        registros: {
            intentos: "",
            tiempo: ""
        }
    };

    var getNombreJugador = function () {
        return sThis.datosPartida.jugador;
    },
        setNombreJugador = function (jugador) {
            sThis.datosPartida.jugador = jugador;
        },
        getNombreJuego = function () {
            return sThis.datosPartida.juego;
        },
        setNombreJuego = function (juego) {
            sThis.datosPartida.juego = juego;
        },
        getNombreTabla = function () {
            return sThis.datosPartida.tabla;
        },
        setNombreTabla = function (tabla) {
            sThis.datosPartida.tabla = tabla;
        },
        getIntentos = function () {
            return sThis.datosPartida.registros.intentos;
        },
        setIntentos = function (numIntentos) {
            sThis.datosPartida.registros.intentos = numIntentos;
        },
        getTiempo = function () {
            return sThis.datosPartida.registros.tiempo;
        },
        setTiempo = function (tiempo) {
            sThis.datosPartida.registros.tiempo = tiempo;
        };

    return {
        getNombreJugador: getNombreJugador,
        setNombreJugador: setNombreJugador,
        getNombreJuego: getNombreJuego,
        setNombreJuego: setNombreJuego,
        getNombreTabla: getNombreTabla,
        setNombreTabla: setNombreTabla,
        getIntentos: getIntentos,
        setIntentos: setIntentos,
        getTiempo: getTiempo,
        setTiempo: setTiempo
    }

};




