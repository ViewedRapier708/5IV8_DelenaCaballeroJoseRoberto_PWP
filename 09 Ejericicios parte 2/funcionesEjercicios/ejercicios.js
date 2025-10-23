function ejercicio1() {
    var num1 = parseFloat(document.getElementById("num1").value);
    var num2 = parseFloat(document.getElementById("num2").value);

    if (isNaN(num1) || isNaN(num2)) {
        alert("Favor de ingresar numeros ");
        return;
    }
    
    var resultado;

    if (num1 === num2) {
       resultado = num1 * num2;
    } else if (num1 > num2) {
        resultado = num1 - num2;
    } else {
        resultado = num1 + num2;
    }
    document.getElementById("resultado").value = resultado;
}
function ejercicio2() {

    arreglo = [document.getElementById("num21").value, 
        document.getElementById("num22").value,
        document.getElementById("num23").value   ];

        if (arreglo[0]=="" || arreglo[1]=="" || arreglo[2]=="") {
            alert("Favor de ingresar numeros ");
            return;
        }
    arreglo=arreglo.sort((a,b)=>b-a);
    document.getElementById("resultado2").value = arreglo[0];
}
function ejercicio3() {
    var hrsTrabajadas = parseFloat(document.getElementById("hrsTrabajadas").value);
    var pagoHora = parseFloat(document.getElementById("pagoHora").value);
    if (isNaN(hrsTrabajadas) || isNaN(pagoHora)) {
        alert("Favor de ingresar numeros ");
        return;
    }
    var pagoTotal = 0;

    if (hrsTrabajadas > 40 ) {
        var hrsExtra = hrsTrabajadas - 40;
        
        if (hrsExtra > 8) {
            var hrsExtraAdicionales = hrsExtra - 8;
            hrsExtra -=hrsExtraAdicionales;
           pagoTotal= 40*pagoHora+(pagoHora*hrsExtra*2)+(hrsExtraAdicionales*3*pagoHora);
        }else{
            pagoTotal=40*pagoHora+(hrsExtra*2*pagoHora);
        }
    }else{
        pagoTotal = hrsTrabajadas * pagoHora;
    }
    document.getElementById("resultado3").value = pagoTotal;
}
function ejercicio4() {
    var salarioMensual = parseFloat(document.getElementById("salarioMensual").value);
    var antiguedad = parseFloat(document.getElementById("antiguedad").value);
    var antiguedadAnios = antiguedad / 12;
    if (isNaN(salarioMensual) || isNaN(antiguedad)) {
        alert("Favor de ingresar numeros ");
        return;
    }
    var porcentaje = 0;
    if (antiguedadAnios < 1) {
        porcentaje = 0.05;
    } else if (antiguedadAnios < 2) {
        porcentaje = 0.07;
    } else if (antiguedadAnios < 5) {
        porcentaje = 0.10;
    } else if (antiguedadAnios < 10) {
        porcentaje = 0.15;
    } else {
        porcentaje = 0.20;
    }
    var utilidades = salarioMensual * porcentaje;
    document.getElementById("utilidades").value = utilidades;

  
}
