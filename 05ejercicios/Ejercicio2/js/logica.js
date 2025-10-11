function calcularComisiones() {
    const ventas = document.getElementById("ventas").value;
    const sueldo = document.getElementById("sueldo").value;
    const totalVentas = ventas * 100;
    const comision = totalVentas * 0.10;
    const sueldoi = parseFloat(sueldo) + parseFloat(comision);
    document.getElementById("sueldo_con_comisiones").value = sueldoi;
    document.getElementById("costo_total_ventas").value = totalVentas;
    document.getElementById("comisiones").value = comision;
}
function validarFormulario(formulario) {
  if (formulario.sueldo.value === "") {
        alert("Por favor, ingrese su sueldo.");
        formulario.sueldo.focus();
        return false;
    }

    if (formulario.ventas.value === "") {
        alert("Por favor, ingrese sus ventas.");
        formulario.ventas.focus();
        return false;
    }

    return true;
}