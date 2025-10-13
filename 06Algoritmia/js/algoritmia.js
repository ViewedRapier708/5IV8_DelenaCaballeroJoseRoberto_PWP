function problema1() {
    const palabras = document.getElementById("p1-input").value;
    let aceptado = true;

    // Verificar espacios dobles
    if (!(palabras== '' || palabras == ' ')) {
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
if(arrayPalabras.includes('sans')){
    window.open('https://www.youtube.com/watch?v=qHxxJSaHMTo')
}
    }
    }else{
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
 var patron=/[A-Z\,]/
 var codigo=String.fromCharCode(teclado);
 return patron.test(codigo);
}
function problema2() {

}

   function problema3(){
    const listaPalabras=document.getElementById("p3-input").value
   const separacionPalabras=listaPalabras.split(",")
    let CantidadAnterior=0;    
    let arregloLetras=[]
    let PalabraMayor=''
   const recorrido=separacionPalabras.map(a=>{
    arregloLetras=[]
    console.log(a.length)
    for (let index = 0; index < a.length; index++) {
            if(!(arregloLetras.includes(a[index]))){
                arregloLetras.push(a[index])
            }
           if (index==a.length-1) {
             if (arregloLetras.length>CantidadAnterior ) {
                    PalabraMayor=a
                    CantidadAnterior=arregloLetras.length

                }
            
            
           }
           
        }
   })
   document.getElementById("p3-output").textContent=PalabraMayor
   }
   

    

   
   
