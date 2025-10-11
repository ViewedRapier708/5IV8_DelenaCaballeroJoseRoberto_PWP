function calcularDescuento() {
    const precioOriginal = parseFloat(document.getElementById("precioOriginal").value);
    const descuento = precioOriginal * 0.15;
    const precioFinal = precioOriginal - descuento;

    document.getElementById("precioFinal").value = precioFinal.toString()+'$';
}
