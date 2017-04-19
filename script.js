
var lienzo = document.getElementById("lienzo");
var pluma = lienzo.getContext("2d");
pluma.font = "16px Verdana";
var pausa = false;
var screen_width = lienzo.width;
var screen_height = lienzo.height;
var tablero = [];
var alto = 300;
var ancho = 300;
var color1 = [5, 230, 0];
var color2 = [250, 0, 0];
var color3 = [0, 0, 250];
var color0 = [255, 255, 255];
var colores = [color0, color1, color2, color3];
var size = 2;

//funciones auxiliares de los graficos


function randcol(){
	var lis = [parseInt(Math.random()*3 + 1)*85, parseInt(Math.random()*3 + 1)*85, parseInt(Math.random()*3 + 1)*85];
	if (lis[0] == lis[1] && lis[1] == lis[2] && lis[2] == lis[0]){
		return randcol();
	}
	return lis;
}

function ynt(num){
	if (num > 0){
		return parseInt(num)
	}
	return parseInt(num) - 1
}

function prod(lis, k){
	for (var ii=0; ii<3; ii++){
		lis[ii] = parseInt(lis[ii]*k);
	}
	return lis;
}

function rgbstr(lis){
	return "rgb(" + lis[0] + "," + lis[1] + "," + lis[2] + ")";
}

function square(p, q, d, c){
	pluma.fillStyle = c;
	pluma.fillRect(p - d, q - d, 1, 2*d);
	pluma.fillRect(p - d, q + d, 2*d, 1);
	pluma.fillRect(p - d + 1, q - d, 2*d, 1);
	pluma.fillRect(p + d, q - d + 1, 1, 2*d);
}

function block(p, q, d, c){
	for (var tt=0; tt<4; tt++){
		square(p, q, d - tt, rgbstr(prod([c[0], c[1], c[2]], tt*(32 - 5*tt)/51.0)));
	}
	pluma.fillStyle = rgbstr([c[0], c[1], c[2]]);
	pluma.fillRect(p - d + 4, q - d + 4, 2*d - 7, 2*d - 7);
}

function pintar(duna){
	marx = screen_width/2 - duna.length/2*size;
	mary = screen_height/2 - duna[0].length/2*size;
	for (ii = 0; ii<duna.length; ii++){
		for (jj=0; jj<duna[0].length; jj++){
			pluma.fillStyle = rgbstr(colores[duna[ii][jj]]);
			pluma.fillRect(marx + ii*size, mary + jj*size, size, size);
		}
	}
}

//

function topple(duna){
	check = true;
	while (check){
		check = false;
		for (var ii=0; ii<duna.length; ii++){
			for (var jj=0; jj<duna[0].length; jj++){
				if (duna[ii][jj]>3){
					check = true;
					if (ii>0){
						duna[ii-1][jj] ++;
					}
					if (ii<duna.length - 1){
						duna[ii+1][jj] ++;
					}
					if (jj>0){
						duna[ii][jj-1] ++;
					}
					if (jj<duna[0].length - 1){
						duna[ii][jj+1] ++;
					}
					duna[ii][jj] = duna[ii][jj] - 4
				}
			}
		}
	}
}

function borrar(){
	tablero = [];
	for (ii=0; ii<ancho; ii++){
		tablero[ii] = [];
		for (jj=0; jj<alto; jj++){
			tablero[ii][jj] = 0;
		}
	}
}

function actualizar(){
	if (!pausa){
		r1 = ynt(Math.random()*3-1)
		r2 = ynt(Math.random()*3-1)
		r4 = ynt(20*Math.random()) -10
		tablero[tablero.length/2 + r1][tablero[0].length/2 + r2] = tablero[tablero.length/2 + r1][tablero[0].length/2 + r2] + 50 + r4;
		topple(tablero);
		pintar(tablero);
	}
}

function mover(){
	pausa = false;
	actualizar();
	pausa = true;
}

function iniciar(){
	borrar()
}

function reset(){
	pausa = false;
	ancho = document.getElementById('numero1').value;
	alto = document.getElementById('numero1').value;
	borrar()
}

iniciar();
window.setInterval(actualizar, 5)