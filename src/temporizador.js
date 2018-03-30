var centesimas = 0;
var segundos = 0;
var minutos = 0;
var control;

function inicioTiempo () {
    clearInterval(control);
	centesimas = 0;
	segundos = 0;
    minutos = 0;
    
    $("#Centesimas").text(":00");
    $("#Segundos").text(":00");
    $("#Minutos").text("00");

    control = setInterval(cronometro,10);
}
function pararTiempo () {
    clearInterval(control);
}
function reinicioTiempo () {
	clearInterval(control);
	centesimas = 0;
	segundos = 0;
    minutos = 0;
    
    $("#Centesimas").text(":00");
    $("#Segundos").text(":00");
    $("#Minutos").text("00");
}
function cronometro () {
	if (centesimas < 99) {
		centesimas++;
		if (centesimas < 10) { centesimas = "0"+centesimas }
		$("#Centesimas").text(":"+centesimas);
	}
	if (centesimas == 99) {
		centesimas = -1;
	}
	if (centesimas == 0) {
		segundos ++;
		if (segundos < 10) { segundos = "0"+segundos }
		$("#Segundos").text(":"+segundos);
	}
	if (segundos == 59) {
		segundos = -1;
	}
	if ( (centesimas == 0)&&(segundos == 0) ) {
		minutos++;
		if (minutos < 10) { minutos = "0"+minutos }
		$("#Minutos").text(minutos);
	}
}