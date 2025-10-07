function ValidarNumeros(e) {
    var teclado =(document.all)? e.keyCode : e.which
    if (teclado== 8 ) return true;
    var patron =/[0-9\d.]/
    var codigo=String.fromCharCode(teclado);
    return patron.test(codigo);
}

//Funcion para calcular el interes
function interes(){
    var valor =document.getElementById("cantidad").value;
    var parseo = parseFloat(valor)
    
    var interes =parseo * 0.085
    var total = interes + parseo

    document.getElementById("saldoi").value = "$" + total;
}
 function borrari(){
     document.getElementById("saldoi").value = "";
     document.getElementById("cantidad").value = "";
 }

 /*Del ejercicio  1 tenemos que agregar el campo numero de meses */