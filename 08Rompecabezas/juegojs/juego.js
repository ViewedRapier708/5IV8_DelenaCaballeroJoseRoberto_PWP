var instrucciones=["Utiliza las flechas del teclado para mover las piezas del rompecabezas.",
    "Para ordenar las piezas guiate por la imagen objetivo"
]

//Vamos a guardar dentro de esta variable el número de movimientos que ha realizado el jugador
var movimientos=0;

//Vamos a crear una matriz para saber las posisiones del rompecabezas
var rompe=[
    [1,2,3],
    [4,5,6],
    [7,8,9]
];
//Vamos a tener que crear una matriz donde tengamos las posisiones correctas
var rompeCorrecta=[
    [1,2,3],
    [4,5,6],
    [7,8,9]
];
//Primero necesito las cordenadas de la piexa vacia la que se va a mover
var filaVacia=2;
var columnaVacia=2;

//necesitmaos una función que se encarge de mostrar las instrucciones en pantalla
function mostrarInstrucciones(){
    for(var i=0;i<instrucciones.length;i++){
        mostrarInstruccionesListas(instrucciones[i],"lista-instrucciones");
    }
}
//Esta funcion se encarga de crear el componente li y agregar dichas instrucciones
function mostrarInstruccionesListas(instruccion, idLista){
    var ul=document.getElementById(idLista);
    var li=document.createElement("li");
  li.textContent=instruccion;
    ul.appendChild(li);
}
function iniciar(){//Mesclar las piezas
      
    //Capturar el ultimo movimiento
}
function checarSiGano(){
    for(var i=0;i<rompe.length;i++){
        for(var j=0;j<rompe[i].length;j++){
            var rompeValor=rompe[i][j];
            if(rompeValor!==rompeCorrecta[i][j]){
                return false;
            }


}
return true;
    }
//Mostrar en html que gano
function mostrarCartelGanador(){
    if(checarSiGano()){
        alert("Felicidades, ganaste ");
    }
return false;
}
//mandamos traer la funcion
mostrarInstrucciones(instrucciones);