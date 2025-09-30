/*
JavaScript es un lenguaaje multiparadigma
Acepta la programacion funcional, estructurada, POO, Eventos
Dentro de JS, no existe el typado de variables (int, string, float, etc)
Solo existen 3 tipos de variables de acuerdo al estandar ES6
VAR, LET y CONST
*/

function validar(formulario) {
    //quiero validar que el campo nombre acepte mas de 3 caracteres
    if (formulario.Nombre.value.length < 4) {
        alert("Porfavor escribe más de 3 caracteres en el campo nombre");
        formulario.nombre.focus();
        return false;
    }
    if (formulario.Edad.value > 100) {
        alert("Porfavor escribe una edad válida");
        formulario.Edad.focus();
        return false;
    }
    if (formulario.Edad.value < 0) {
        alert("Porfavor escribe una edad válida");
        formulario.Edad.focus();
        return false;
    }

    //validacio para unicamente letras
    var checkStr = formulario.Nombre.value;
    alert(checkStr);

    var abcOk = "QWERTYUIOPASDFGHJKLÑZXCVBNM" + "qwertyuiopasdfghjklñzxcvbnm";

    var allValido = true;

    //tenemos que comparar la cadena de nombre vs abc

    for (var i = 0; i < checkStr.length; i++) {
        var caracteres = checkStr.charAt(i);
        for (var j = 0; j < abcOk.length; j++) {
            if (caracteres == abcOk.charAt(j)) {
                break;
            }
        }
        if (j == abcOk.length) {
            allValido = false;
            break;
        }
    }

    
    if(!allValido){
        alert("Escribe unicamente letras en el campo nombre");
        formulario.nombre.focus();
        return false;
    }
    
    var checkStr = formulario.Edad.value;
    alert(checkStr);

    var abcOk = "1234567890" + "qwertyuiopasdfghjklñzxcvbnm" + " ";

    var allValido = true;

    //tenemos que comparar la cadena de nombre vs abc

    for (var i = 0; i < checkStr.length; i++) {
        var caracteres = checkStr.charAt(i);
        for (var j = 0; j < abcOk.length; j++) {
            if (caracteres == abcOk.charAt(j)) {
                break;
            }
        }
        if (j == abcOk.length) {
            allValido = false;
            break;
        }
    }

    if(!allValido){
        alert("Escribe unicamente digitos en el campo edad");
        formulario.Edad.focus();
        return false;
    }

    //vamos a crear una funcion de una expresion regular para validar el correo electronico
    //texto.texto@texto.texto

    var b = /^[^@\s]+[^@\.\s]+(\.[^@\.\s]+)+$/;

    var txt = formulario.Correo.value;

    alert("Email" + (b.test(txt)? " ": " no ") + "valido");

    return b.test;
}