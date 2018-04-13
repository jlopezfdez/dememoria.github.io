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




