function calcularPorcentaje() {
  const mujeres = parseFloat(document.getElementById("cantidadMujeres").value);
const hombres = parseFloat(document.getElementById("cantidadHombres").value);

const total = mujeres + hombres;
const porcentajeMujeres = (mujeres * 100) / total;
const porcentajeHombres = (hombres * 100) / total;

let pmu = porcentajeHombres.toFixed(2)+"%";
let pho = porcentajeMujeres.toFixed(2)+"%";

document.getElementById("porcentajeMujeres").value = pho;
document.getElementById("porcentajeHombres").value = pmu;




}