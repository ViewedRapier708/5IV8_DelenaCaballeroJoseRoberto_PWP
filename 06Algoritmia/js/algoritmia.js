function problema1() {
    const palabras = document.getElementById("p1-input").value;
    let aceptado = true;

    // Verificar espacios dobles
    if (!(palabras == '' || palabras == ' ')) {
        for (let i = 0; i < palabras.length; i++) {
            if (palabras.charAt(i) == " " && palabras.charAt(i + 1) == " ") {
                alert("Espacios entre palabras inválidos. Verifique que solo haya 1 espacio entre palabras.");
                aceptado = false;
                break;
            }
        }

        if (aceptado) {
            const arrayPalabras = palabras.split(" ");
            const palabrasInvertidas = arrayPalabras.reverse().join(" ");
            document.getElementById("p1-output").textContent = palabrasInvertidas;
            if (arrayPalabras.includes('sans')) {
                window.open('https://www.youtube.com/watch?v=qHxxJSaHMTo')
            }
        }
    } else {
        alert("Ingrese una palabra o frase válida")
    }


}

function ValidarNumeros(e) {
    var teclado = (document.all) ? e.keyCode : e.which
    if (teclado == 8) return true;
    var patron = /[a-z\A-Z\ " "]/
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);

}
function ValidarNumeros2(e) {
    var teclado = (document.all) ? e.keyCode : e.which
    if (teclado == 8) return true;
    var patron = /[A-Z\,]/
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}
function problema2() {
    var p2_x1 = document.querySelector("#p2-x1").value;
    var p2_x2 = document.querySelector("#p2-x2").value;
    var p2_x3 = document.querySelector("#p2-x3").value;
    var p2_x4 = document.querySelector("#p2-x4").value;
    var p2_x5 = document.querySelector("#p2-x5").value;
   var p2_y1 = document.querySelector("#p2-y1").value;
   var p2_y2 = document.querySelector("#p2-y2").value;
   var p2_y3 = document.querySelector("#p2-y3").value;
   var p2_y4 = document.querySelector("#p2-y4").value;
   var p2_y5 = document.querySelector("#p2-y5").value;
   //creamos los vectores
    var v1 = [p2_x1, p2_x2, p2_x3, p2_x4, p2_x5];
    var v2 = [p2_y1, p2_y2, p2_y3, p2_y4, p2_y5];

    v1 = v1.sort(function(a, b){return b-a});
    v2 = v2.sort(function(a, b){return b-a});

    v2 = v2.reverse();

    var p2_producto = 0;
    for(var i=0; i< v1.length; i++){

        p2_producto += v1[i] * v2[i];
    }
    document.querySelector("#p2_resultado").textContent = "El producto escalar es " + p2_producto
}

function problema3() {
    const listaPalabras = document.getElementById("p3-input").value
    const separacionPalabras = listaPalabras.split(",")
    let CantidadAnterior = 0;
    let arregloLetras = []
    let PalabraMayor = ''
    const recorrido = separacionPalabras.map(a => {
        arregloLetras = []
        console.log(a.length)
        for (let index = 0; index < a.length; index++) {
            if (!(arregloLetras.includes(a[index]))) {
                arregloLetras.push(a[index])
            }
            if (index == a.length - 1) {
                if (arregloLetras.length > CantidadAnterior) {
                    PalabraMayor = a
                    CantidadAnterior = arregloLetras.length

                }


            }

        }
    })
    document.getElementById("p3-output").textContent = PalabraMayor
}






