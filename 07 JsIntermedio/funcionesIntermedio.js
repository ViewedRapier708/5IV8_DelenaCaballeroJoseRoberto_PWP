/*

Js Maneja las varables del siguiente modo

var una variable de acceso local y global dependiendo de donde se declare
let es una variable protegida solo se puede utilizar dentro de una funcion o bloque donde se declara
const es una varable que no se puede cambiar su valor,es una constante


var x ="hola"
if (true) {
    let x = "habia una ves"
    console.log(x)
}



//Las funciones flecha nos atudan a realizar operaciones de una forma mas sencilla de acuerdo a la siguiente estructura 

function suma(n1,n2)
{
    return n1+n2
}
const f =(n1,n2)=> n1+n2
console.log(`Esta suma es :${f(1,1)}`)

*/

const razasDePerros =[
    "Pastor aleman",
    "Labrador",
    "pug",
    "Salchicha",
    "Dalmata",
    "Beagle",
    "Chihuahua",
    "Elgatoimplosiona"
]
/*
for (let i = 0; i < razasDePerros.length; i++) {
    console.log(razasDePerros[i])
} */

/*for (const raza of razasDePerros) {
    console.log(razasDePerros)
}

for (const key in razasDePerros) {
    console.log(razasDePerros[key])
}*/
//El for each itera sobre los elementos del arreglo y no devuelve nada por lo tanto los foreach son funciones flechas por defecto
//razasDePerros.forEach(r => console.log(r))

//La estructura general del for each es la siguente

//argumento.forEach((raza,indice,arreglo)) => codigo a ejecutar

//funcion map itera sobre los elementos del arreglo y regresa un arreglo diferente con el cual podemos jugar
/*const razasDePerrosMayusculas = razasDePerros.map(raza => raza.toUpperCase())
console.log(razasDePerrosMayusculas);
*/
//find nos permite realizar una busqueda de un elemento dentro del arreglo si lo encuentra lo retorna si no lanza un undefined
if (razasDePerros.find(raza => raza === "chihuahua")) {
    console.log("Si se encotro el perro perron:");
    console.log(razasDePerros);
}else{
    console.log('no hay nada' );
    razasDePerros.push("chichuahua")
}
//Find index permite realizar una busqueda dentro de un elemento del arreglo si lo encuenra regresa el indice del elemento si no regresa un -1 
//Esta funcion es util cuando se quiere modificar o eliminar de un arreglo original dentro de una copia del mismo

const indiceChihuahua = razasDePerros.findIndex(raza => raza ==="chichuahua")
console.log(indiceChihuahua);
if (indiceChihuahua >-1) {
    console.log("Si se encontro el perro perron");
    console.log(razasDePerros[indiceChihuahua] );
    razasDePerros[indiceChihuahua]+="(Es una raza de perror chiquita y chillona)"
    console.log(razasDePerros[indiceChihuahua]);
    console.log(razasDePerros );
}