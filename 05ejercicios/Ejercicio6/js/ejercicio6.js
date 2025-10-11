function calcularEdad() {
    const anioNacimiento = parseInt(document.getElementById("anioNacimiento").value);
    const añoActual = 2025;


    if (anioNacimiento<1900  || anioNacimiento>2100 || isNaN(anioNacimiento)) {
        alert("Por favor ingresa un año de nacimiento válido.");
        document.getElementById("anioNacimiento").value = "";
    }else{const edad = -1*(anioNacimiento-añoActual);
    document.getElementById("edad").value = `Tu edad es: ${edad} años.`;}
    
}