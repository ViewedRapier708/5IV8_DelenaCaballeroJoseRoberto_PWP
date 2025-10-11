function ValidarNumeros(e) {
    var teclado =(document.all)? e.keyCode : e.which
    if (teclado== 8 ) return true;
    var patron =/[0-9\d.]/
    var codigo=String.fromCharCode(teclado);
    return patron.test(codigo);
}

function interes(){
    var valor =document.getElementById("cantidad").value;
    var parseo = parseFloat(valor)
    var meses = document.getElementById("tiempo").value;
    if (meses >18) {
        alert("El tiempo maximo es de 18 meses");
        document.getElementById("tiempo").value = "";
    }else{
 var interes =parseo * 0.02 * meses
    var total = interes + parseo
    document.getElementById("saldoi").value = "$" + total;
    }
   
}
 function borrari(){
     document.getElementById("saldoi").value = "";
     document.getElementById("cantidad").value = "";
 }