var instrucciones = [
    "Utiliza las flechas de navegación para mover las piezas jeje",
    "Para ordenar las piezas guiate por la imagen objetivo"
];

//vamos a guardar dentro de una variable los movimeintos del rompecabezas
var movimientos = [];

//vamos a crear una matriz para saber las posiciones del rompecabezas
var rompe = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];

//vamos a tener que crear una matriz donde tengamos las posiciones correctas

var rompeCorrecta = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];

//necesito saber las coordenadas de la pieza vacia, la que se va a mover
var filaVacia = 2;
var columnaVacia = 2;

//necesitamos ahora si una funcion que se encargue de mostrar las instrucciones

function mostrarInstrucciones(instrucciones){
    for(var i = 0; i < instrucciones.length; i++){
        mostrarInstruccionesLista(instrucciones[i], "lista-instrucciones");
    }
}

//esta funcion se encarga de crear el componente li y agregar la lista de dichas instrucciones

function mostrarInstruccionesLista(instruccion, idLista){
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}

//vamos a crear una funcion para saber que gano
function checarSiGano(){
    for(var i = 0; i < rompe.length; i++){
        for(var j = 0; j < rompe[i].length; j++){
            var rompeActual = rompe[i][j];
            if(rompeActual !== rompeCorrecta[i][j]){
                return false;
            }
        }
    }
    return true;
}

//mostrar en html si se gano
function mostrarCartelGanador(){
    if(checarSiGano()){
        alert("¡Felicidades, ganaste jeje!");
    }
    return false
}

/*
    necesitamos una funcion que se encargue de poder intercambiar las posiciones de la pieza vacia vs la de cualquiera, patra esto tenemos que hacer uso de:
    arreglo[][] = posicion[][]
    //intercambiar
    posicion[][] = arreglo[][]
*/

function intercambiarPosicionesrompe(filaPos1, columnaPos1, filaPos2, columnaPos2){
    var pos1 = rompe[filaPos1,columnaPos1];
    var pos2 = rompe[filaPos2, columnaPos2];

    //intercambio

    rompe[filaPos1, columnaPos1] = pos2;
    rompe[filaPos2, columnaPos2] = pos1;
}    

function iniciar(){
    mezclarPiezas(30)
    capturarTeclas();
    //mezclar las piezas
    //capturar el ultimo movimiento
}
function actualizarPosiscionVacia(nuevaFila,nuevaColumna){
    filaVacia= nuevaFila
    columnavacia=nuevaColumna
}
function posicionValida(fila,columna){
    return (fila >= 0  && fila <=2 && columna >=0 && columna <=2);
}

//debemos crear una funcion del movimiento detectando el movimiento detectando elevento de las flechas de navegacion
//debemos crear una matriz de identificacion de movimieto
//arriba 38, abajo 40 izquierda 37 derecha 39

var codigosDireccion = {
   IZQUIERDA: 37,
    ARRIBA: 38,
    DERECHA: 39,
    ABAJO: 40
};



function moverDireccion(direccion) {
    var nuevaFilaVacia;
    var nuevaColumnaVacia;
    if (direccion === codigosDireccion.ABAJO) {
        nuevaFilaVacia = filaVacia +1;
        nuevaColumnaVacia = columnaVacia 
    }else if (direccion === codigosDireccion.ARRIBA) {
        nuevaFilaVacia = filaVacia -1;
        nuevaColumnaVacia = columnaVacia}
    else if (direccion === codigosDireccion.DERECHA) {
        nuevaFilaVacia = filaVacia;
        nuevaColumnaVacia = columnaVacia +1;}
    else if (direccion === codigosDireccion.IZQUIERDA) {
        nuevaFilaVacia = filaVacia;
        nuevaColumnaVacia = columnaVacia -1;}
// solo mando a llamar a que la posicion sea valida
        if (posicionValida(nuevaFilaVacia, nuevaColumnaVacia)) {

            intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaVacia, nuevaColumnaVacia);
            actualizarPosiscionVacia(nuevaFilaVacia, nuevaColumnaVacia);
            //Tengo que guardar el ultimo movimiento 
            agregarUltimoMovimiento(direccion);
        }
}
function intercambiarPosiciones(fila, columna, fila2, columna2){

    var pieza1= rompe[fila,columna];
    var pieza2 = rompe[fila2, columna2];
    

    //intercambio

    intercambiarPosicionesrompe(fila, columna, fila2, columna2);
    intercambiarPosicionesDOM('pieza'+pieza1, 'pieza'+pieza2);

}   

function intercambiarPosicionesDOM(idPieza1, idPieza2){
    var pieza1 = document.getElementById(idPieza1);
    var pieza2 = document.getElementById(idPieza2);


    //VAMOS A CLONARLA
    var padre = pieza1.parentNode;
    var pieza1Clon = pieza1.cloneNode(true);
    var pieza2Clon = pieza2.cloneNode(true);

    padre.replaceChild(pieza1Clon, pieza2);
    padre.replaceChild(pieza2Clon, pieza1);
}
//mandamos traer a la funcion

//Debo de atualizar los elementos en el dom
function actualizarUltimoMovimiento(direccion) {
    var ultimoMovimiento = document.getElementById("flecha");
    switch (direccion) {
        case codigosDireccion.ARRIBA:
            ultimoMovimiento.textContent = "↑";
            break;
        case codigosDireccion.ABAJO:
            ultimoMovimiento.textContent = "↓";
            break;
        case codigosDireccion.IZQUIERDA:
            ultimoMovimiento.textContent = "←";
            break;
        case codigosDireccion.DERECHA:
            ultimoMovimiento.textContent = "→";
            break;
    }
}
function mezclarPiezas(veces){
    if(veces <=0){
        alert("Asi no se puede");
        return;
    }
    var direcciones = [codigosDireccion.ABAJO, codigosDireccion.ARRIBA, codigosDireccion.DERECHA, codigosDireccion.IZQUIERDA];
    var direccion =direcciones[Math.floor(Math.random()*direcciones.length)];

    moverDireccion(direccion);
    setTimeout(function(){
        mezclarPiezas(veces -1);
    },100);
}

//Necesitamos saber que teclas se estan oprimiendo
function capturarTeclas(){  
    document.body.onkeydown = (function(evento){
       if(evento.which === codigosDireccion.ARRIBA
        || evento.which === codigosDireccion.ABAJO
        || evento.which === codigosDireccion.DERECHA
        || evento.which === codigosDireccion.IZQUIERDA
        ) {
            moverDireccion(evento.which);
            var gano = checarSiGano();
            if(gano){
                setTimeout(function(){
                    mostrarCartelGanador();
                },500);
               
            }
            evento.preventDefault();
        }
        actualizarUltimoMovimiento(evento.which);
    });
}
iniciar();




    mostrarInstrucciones(instrucciones);