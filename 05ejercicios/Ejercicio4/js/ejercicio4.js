function calcularCalificacionTotal() {
    const calificacion1 = parseFloat(document.getElementById("calificacion1").value);
    const calificacion2 = parseFloat(document.getElementById("calificacion2").value);
    const calificacion3 = parseFloat(document.getElementById("calificacion3").value);
    const trabajoFinal = parseFloat(document.getElementById("trabajoFinal").value);
    const examenFinal = parseFloat(document.getElementById("examenFinal").value);

    // Validar cada sección por separado y borrar sólo el campo inválido
    if (isNaN(calificacion1) || calificacion1 < 0 || calificacion1 > 10) {
        alert("Calificación 1 inválida. Ingrese un valor numérico entre 0 y 10.");
        document.getElementById("calificacion1").value = "";
        document.getElementById("calificacion1").focus();
        return;
    } else if (isNaN(calificacion2) || calificacion2 < 0 || calificacion2 > 10) {
        alert("Calificación 2 inválida. Ingrese un valor numérico entre 0 y 10.");
        document.getElementById("calificacion2").value = "";
        document.getElementById("calificacion2").focus();
        return;
    } else if (isNaN(calificacion3) || calificacion3 < 0 || calificacion3 > 10) {
        alert("Calificación 3 inválida. Ingrese un valor numérico entre 0 y 10.");
        document.getElementById("calificacion3").value = "";
        document.getElementById("calificacion3").focus();
        return;
    } else if (isNaN(trabajoFinal) || trabajoFinal < 0 || trabajoFinal > 10) {
        alert("Trabajo final inválido. Ingrese un valor numérico entre 0 y 10.");
        document.getElementById("trabajoFinal").value = "";
        document.getElementById("trabajoFinal").focus();
        return;
    } else if (isNaN(examenFinal) || examenFinal < 0 || examenFinal > 10) {
        alert("Examen final inválido. Ingrese un valor numérico entre 0 y 10.");
        document.getElementById("examenFinal").value = "";
        document.getElementById("examenFinal").focus();
        return;
    } else {
        // Pesos: 55% promedio de exámenes (las tres calificaciones), 30% examen final, 15% trabajo final
        const promedioExamenes = (calificacion1 + calificacion2 + calificacion3) / 3;
        const pesoExamenes = 0.55;
        const pesoExamenFinal = 0.30;
        const pesoTrabajoFinal = 0.15;

        const calificacionTotal =
            promedioExamenes * pesoExamenes +
            examenFinal * pesoExamenFinal +
            trabajoFinal * pesoTrabajoFinal;

        // Guardar con dos decimales
        document.getElementById("calificacionTotal").value = calificacionTotal.toFixed(2).toString();
    }
}
