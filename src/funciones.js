$(function () {
    // Declaración de variables globales
    let arrayPartidas = [];
    let g_tipoJuegoActivo, g_tipoTablaActiva, g_timerFinPartida;
    let g_contenido1 = '', g_contenido2 = '', g_comparacion1 = '', g_comparacion2 = '';
    let g_totalClicks = 0, g_aciertosTotales = 0, g_aciertosNecesarios = 0;
    let g_enPausaVista = 0, g_intentosPartida = 0, g_finDePartida = 0;
    const TIEMPO_VISUALIZACION = 1000, ROTACION_FIN_PARTIDA = 3;

    /*
    Esta función crea la tabla html para las filas y columnas indicadas, 
    identificando cada elemento consecutivamente del 1 hasta el número de celdas
    La identificacion con data-idrow y data-id nos permite encontrar el elemento 
    en el DOM con jQuery fácilmente
    */
    function crearTablaHTML(tabla, cssJuego) {
        const filas = tabla.filas;
        const columnas = tabla.columnas;
        const anchoCelda = tabla.anchoCasilla;
        const altoCelda = tabla.altoCasilla;
        const altoTabla = tabla.altoTabla;
        const fuente = tabla.fuente;
        const cssCeldas = cssJuego + '_celdas';
        let contador = 0, elto;

        elto = $('#divTabla');
        elto.append(`<table id="tablaMemory" class=${cssJuego}
                        style="height: ${altoTabla}"></table>`);

        for (let i = 1; i <= filas; i++) {
            elto.find('table').append(`<tr data-idrow=${i}></tr>`);
            for (let a = 1; a <= columnas; a++) {
                elto.find('tr')
                    .filter(`[data-idrow='${i}']`)
                    .append(`<td
                                class='celdaJuego sinpareja ${cssCeldas}'
                                style= 'width: ${anchoCelda};
                                        height:${altoCelda};
                                        font-size: ${fuente};'
                                data-id=${contador}>
                            </td>`);
                contador++;
            }
        }
    }

    /*
    Genera el array con los datos necesarios para la tabla en concreto tomándolos del objeto 'tipos' según el tipo de juego seleccionado
    Y a cada celda se le dan una serie de valores (val, orden, tipo) para asignarle las propiedades necesarias para su comparación, o para determinar qué tipo
    de acción se hará sobre la celda cuando se pulsa, como añadir un texto, o cambiarle el color, mostrar una imagen, etc.
    Como el array generado con rellenarArrayIncial ya colocó los datos aleatoriamente, basta con ir entrando en cada celda por su identificador data-id de forma
    secuencial y a cada celda del DOM asignarle una variable (o data) según el array original para las comparaciones y funcionalidades posteriores en la función controlClick
    */
    function generarDatos(tabla, juego) {
        const totalCeldas = tabla.filas * tabla.columnas;
        const totalParejas = totalCeldas / 2;
        let nuevoArray = [], arrayInicial = [], numero, elto, eltoNuevoArray;

        arrayInicial = rellenarArrayInicial(totalParejas, juego);

        for (let i = totalCeldas - 1, indice = 0; i >= 0; i-- , indice++) {
            numero = numeroAleatorio(0, i);

            nuevoArray.push(arrayInicial[numero]);
            arrayInicial.splice(numero, 1);

            eltoNuevoArray = nuevoArray[indice];

            elto = $('.celdaJuego').filter(`[data-id='${indice}']`);
            elto.data('val', eltoNuevoArray.val);
            elto.data('orden', eltoNuevoArray.orden);
            elto.data('tipo', eltoNuevoArray.tipo);
            elto.data('color_texto', eltoNuevoArray.color_texto);
        }
    }

    /*
    Devuelve un entero entre min y max
    */
    function numeroAleatorio(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    /*
    Devuelve un entero par entre min y max. Dado que la lista de parejas está indexada desde el 0, y su pareja es el indice 1, después el indice 2
    con pareja indice 3, etc, solo necesitamos el indice del número par y sumar 1 a ese número para recoger los dos elementos de la pareja
    */
    function numeroAleatorioPar(min, max) {
        return Math.round((Math.random() * ((max - min) + min)) / 2) * 2;
    }

    /*
    Los arrays en su definición contienen todos los elementos posibles para las tablas admitidas (2x2, 2x4, 4x4, etc.)
    A la siguiente funcion se le pasan el número de parejas y el tipo o nombre del juego,
    y se hace una copia del array original (completo), el cual puede tener 80 parejas distintas preparadas,
       pero de este array se van a sacar tantas parejas como se necesiten para el juego activo, digamos 8 parejas en un array de 4x4
       Se toman 8 elementos al azar del array original con las 40 parejas en total, por ejemplo, de forma aleatoria (esto nos garantiza paneles diferentes cada vez),
       tomando un número par para el índice, y luego se toma su número siguiente que en el array original siempre están consecutivos.
       Luego de la copia del array original se eliminan los dos elementos sacados para que tras generar el siguiente número aleatorio
       no haya posibilidad de volver a coger los mismos valores
   */
    function rellenarArrayInicial(parejas, tipoJuego) {
        /* Copiar el array con slice, ya que si no se crea una referencia y se cambiaría el array original */
        let arrayAux = [];
        let arrayCopia = g_tipos[tipoJuego].valor.slice();

        for (let i = 0; i < parejas; i++) {
            let numero = numeroAleatorioPar(0, (arrayCopia.length) - 2);

            arrayAux.push(arrayCopia[numero])
            arrayAux.push(arrayCopia[numero + 1]);
            arrayCopia.splice(numero + 1, 1);
            arrayCopia.splice(numero, 1);
        }
        return arrayAux;
    }

    /* //
    Cada pulsación sobre una celda dispara la funcion controlClick
    Tras dos clicks se hace una comparación
    Si son pareja se continua
    Si no lo son se activa un timeout para que el usuario vea la pareja erronea y su ubicación
    g_enPausaVista se activa para saber que la función callback del timeout aún no terminó
    Si durante la pausa se pulsa otra celda, el timeout se detiene, el callback no se ejecuta,
    y se limpia el contenido para proceder con una nueva celda normalmente, sin que el usuario
    tenga porque esperar el timeout completo para poder pulsar otra celda
    */
    function controlClick() {
        let tipo1 = tipo2 = '';

        /* g_enPausaVista estará a 1 mientras se visualiza la pareja no acertada
        y permite que el usuario pulse otra casilla para no tener que esperar el timeout completo
        */
        if (g_enPausaVista) {
            $('.sinpareja')
                .text('')
                .css('background-color', '')
                .removeClass('celda_activa')
            g_enPausaVista = 0;
            clearTimeout(timer);
        }

        if ($(this).hasClass('celda_activa') === false) {
            // Añadimos la clase activa y la de playing para la 
            // animación de escalado de celda pulsada
            $(this).addClass('celda_activa playing');

            // Cuando termine la animacion de escalado, 
            // quitamos la clase playing para que vuelva a su tamaño
            // y notemos la pulsación, sobre todo cuando se pulsa la misma celda
            // activa pero no acertada porque se quiere ir deprisa
            $(this).on('transitionend', eliminarTransicion);

            g_totalClicks++;

            if (g_totalClicks == 1) {
                g_contenido1 = $(this).data('val');
                g_comparacion1 = $(this).data('orden');
                tipo1 = $(this).data('tipo');

                switch (tipo1) {
                    case 'texto':
                        $(this).text(g_contenido1);
                        break;
                    case 'texto_color':
                        $(this).text(g_contenido1);
                        colorTexto = $(this).data('color_texto');
                        $(this).css('color', colorTexto);
                        break;
                    case 'color':
                        $(this).css('background-color', g_contenido1);
                        break;
                    case 'imagen':
                        $(this).append(`<img width='75%' height='95%' src='src/images/${g_contenido1}'>`);
                        break;
                    default:
                        break;
                }
            }

            if (g_totalClicks == 2) {
                g_contenido2 = $(this).data('val');
                g_comparacion2 = $(this).data('orden');
                tipo2 = $(this).data('tipo');

                switch (tipo2) {
                    case 'texto':
                        $(this).text(g_contenido2);
                        break;
                    case 'texto_color':
                        $(this).text(g_contenido2);
                        colorTexto = $(this).data('color_texto');
                        $(this).css('color', colorTexto);
                        break;
                    case 'color':
                        $(this).css('background-color', g_contenido2);
                        break;
                    case 'imagen':
                        $(this).append(`<img width='75%' height='95%' src='src/images/${g_contenido2}'>`);
                        break;
                    default:
                        break;
                }
                if (g_comparacion1 == g_comparacion2) {
                    $('.celda_activa')
                        .removeClass('sinpareja celda_activa')
                        .addClass('emparejada');

                    // No es necesario seguir escuchando en lo que tiene pareja
                    $('td.emparejada').off();

                    g_aciertosTotales++;

                    if (g_aciertosTotales == g_aciertosNecesarios) {
                        g_finDePartida = 1;

                        pararTiempo();

                        tiempoFinal = $("#Minutos").text() +
                            $("#Segundos").text() +
                            $("#Centesimas").text();

                        animacionFinDePartida(ROTACION_FIN_PARTIDA);

                        // Guardar datos de la partida
                        var partida = new Partida();
                        partida.setNombreJuego(g_tipoJuegoActivo);
                        partida.setNombreTabla(g_tipoTablaActiva);
                        partida.setIntentos(g_intentosPartida + 1);
                        partida.setTiempo(tiempoFinal);

                        arrayPartidas.push(partida);

                        // Escribimos el mejor nº de intentos y tiempo para el juego jugado
                        establecerMejorIntento(g_tipoJuegoActivo, g_tipoTablaActiva);
                        establecerMejorTiempo(g_tipoJuegoActivo, g_tipoTablaActiva);
                    }
                }
                else {
                    g_enPausaVista = 1;
                    timer = setTimeout(() => {
                        $('.sinpareja')
                            .text('')
                            .css('background-color', '')
                            .removeClass('celda_activa')
                        g_enPausaVista = 0;
                    }, TIEMPO_VISUALIZACION);
                }
                g_totalClicks = 0;
                g_contenido1 = g_contenido2 = g_comparacion1 = g_comparacion2 = '';
                g_intentosPartida++;
                $('.intentos').text(g_intentosPartida);
            }
        }
    }


    function eliminarTransicion(e) {
        if (e.originalEvent.propertyName !== 'transform') return;
        $(this).removeClass('playing');
    }


    function comenzarJuego(params) {
        let tablaActiva = '', tablaSeleccionada = '', tipoJuegoActivo = '', cssJuegoActivo = '';
        g_contenido1 = g_contenido2 = g_comparacion1 = g_comparacion2 = '';
        g_totalClicks = g_enPausaVista = g_aciertosTotales = g_intentosPartida = 0;

        // Si se recibe un 1, activar el crono, si no, poner el tiempo a 00:00:00
        params.data.tiempo ? inicioTiempo() : reinicioTiempo();

        // Paramos el evento de fin de partida
        if (g_finDePartida) {
            clearTimeout(g_timerFinPartida);
            g_finDePartida = 0;
        }

        $('.intentos').text('0');
        $("#tablaMemory").remove();

        tipoJuegoActivo = params.data.juego || g_tipoJuegoActivo;
        cssJuegoActivo = params.data.clase || g_tipos[tipoJuegoActivo].clase || 'clase_general';

        tablaActiva = params.data.tabla || g_tipoTablaActiva;
        tablaSeleccionada = g_tablasDeJuego[tablaActiva];

        g_aciertosNecesarios = (tablaSeleccionada.filas * tablaSeleccionada.columnas) / 2;
        establecerMejorIntento(tipoJuegoActivo, tablaActiva);
        establecerMejorTiempo(tipoJuegoActivo, tablaActiva);

        crearTablaHTML(tablaSeleccionada, cssJuegoActivo);
        generarDatos(tablaSeleccionada, tipoJuegoActivo);

        // Solo escuchar en las celdas sin pareja
        $('td.sinpareja').click(controlClick);
    }

    function registrarJuegosDisponibles() {
        let arrayJuegos = [], cadena = '';

        for (const key in g_tipos) {
            elto = g_tipos[key];
            arrayJuegos[elto.indice] = key;

            // Cargar imagenes antes de jugar para tener fluidez
            cadena = "src/images/fondos_tablas/" + elto.fondo;
            var objetoImagen = new Image();
            objetoImagen.src = cadena;

            if (elto.imagenes === true) {
                elto.valor.forEach(element => {
                    if (element.tipo == "imagen") {
                        // Cargar imagenes antes de jugar para tener fluidez
                        var objetoImagen = new Image();
                        cadena = "src/images/" + element.val;
                        objetoImagen.src = cadena;
                    }
                });
            }
        }

        arrayJuegos.forEach((element, index) => {
            $('#listadejuegos').append(`<li class='active'>
                                <a href='#'>
                                <span>${element}</span>
                                </a>
                                <ul id="${index}">
                                </ul>
                                </li>`);
            g_tipos[element].formatos_disponibles.forEach((element2, index2) => {
                $(`#${index}`).append(`<li class='last'
                                    data-juego='${element}'
                                    data-tabla='${element2}'>
                                    <a href='#'>
                                    <span>
                                    ${element2}</span>
                                    </a>
                                    </li>`);
            });
        });

        // Establecemos escucha en cada entrada de menú con cada tipo de tabla
        $('li .last').click(setInicioJuego);
    }

    function setInicioJuego() {
        g_tipoJuegoActivo = $(this).data('juego');
        g_tipoTablaActiva = $(this).data('tabla');

        comenzarJuego({
            data: {
                juego: `${g_tipoJuegoActivo}`,
                tabla: `${g_tipoTablaActiva}`
            }
        });
    }

    // Ponemos grados=3 para mostrar el uso de valores por defecto.
    // el valor 3 se tomaría en caso de que la función fuese invocada sin parámetros
    function animacionFinDePartida(grados=3) {
        if (g_finDePartida) {
            g_timerFinPartida = setTimeout(() => {
                $('.celdaJuego').css('transform', `rotate(${grados}deg) `);
                animacionFinDePartida(grados * (-1));
            }, 500);
        }
    }

    function establecerMejorIntento(tipoJuego, tipoTabla) {
        let record = 99999, resultado, juego, tabla;

        arrayPartidas.forEach(element => {
            juego = element.getNombreJuego()
            tabla = element.getNombreTabla();

            if (juego == tipoJuego && tabla == tipoTabla) {
                intentos = element.getIntentos();
                intentos <= record ? record = intentos : 1;
            }
        });

        record == 99999 ? resultado = 0 : resultado = record;

        $('.mejor').text(resultado);
    }

    function establecerMejorTiempo(tipoJuego, tipoTabla) {
        let record = 9999999999, record_texto = "00:00:00", resultado, juego, tabla;

        arrayPartidas.forEach(element => {
            juego = element.getNombreJuego()
            tabla = element.getNombreTabla();
            tiempo = element.getTiempo();

            if (juego == tipoJuego && tabla == tipoTabla && tiempo != "00:00:00") {
                tiempo_texto = element.getTiempo();
                tiempo = tiempo_texto;

                arrayCadenas = tiempo.split(":");

                mins = parseInt(arrayCadenas[0] * 60 * 100);
                segs = parseInt(arrayCadenas[1] * 100);
                cents = parseInt(arrayCadenas[2]);

                tiempo = mins + segs + cents;

                if (tiempo <= record) {
                    record = tiempo;
                    record_texto = tiempo_texto;
                }
            }
        });

        record == 9999999999 ? resultado = "00:00:00" : resultado = record_texto;

        $('.mejor_tiempo').text(resultado);
    }

    function main() {
        // Rellenar la lista de juegos disponibles a la izquierda de la página
        registrarJuegosDisponibles();

        g_tipoJuegoActivo = 'La Liga';
        g_tipoTablaActiva = '3 parejas';

        // Escuchar en los botones de Inicio con y sin tiempo
        $('#inicio').click({ tiempo: 1 }, comenzarJuego);
        $('#reinicio').click({ tiempo: 0 }, comenzarJuego);
        // $('#op_sonido').click(prueba);

        // Mostrar un juego inicialmente al cargar la página
        comenzarJuego({ data: { juego: `${g_tipoJuegoActivo}`, tabla: `${g_tipoTablaActiva}` } });
    }

    /* Hay que cargar los datos json y solo después ejecutar la funcion main 
    estando seguros entonces de que los datos fueron cargados */
    $.when(
        $.ajax({
            url: "src/tablas_de_juego.json",
            success: function (response) {
                g_tablasDeJuego = response;
            },
            error: function (response) {
            }
        }),
        $.ajax({
            url: "src/tipos_de_juegos.json",
            success: function (response) {
                g_tipos = response;
            },
            error: function (response) {
            }
        })
    ).done(main);
});
