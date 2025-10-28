/*
Esta es un ejemplo de una api rest utilizando una llamada con fetch el cual sirve para obtener informaion sobre el tipo de api de pokemon
y bontener su estructura a partir de crear una funcion callback a partir de una promesa.
*/
const pokeApiURl = 'https://pokeapi.co/api/v2/';
//Vamos a crear una funcion para obtener todos los datos de la pokedex para esto tenemos que imaginar el orden y la obtencion de datos
const pokedex=()=>{
    //Primero necesitamos obtener todas las 
    // estadisticas del pokemon asi que necesitamos crear un diccionario para obtener cada uno de los elementos del front para despues vaciar todos los datos
    const pokedmonStats = {
        hp: document.getElementById('pokemonStatHP'),
        attack: document.getElementById('pokemonStatAttack'),
        defense: document.getElementById('pokemonStatDefense'),
        specialAttack: document.getElementById('pokemonStatSpecialAttack'),
        specialDefense: document.getElementById('pokemonStatSpecialDefense'),
        speed: document.getElementById('pokemonStatSpeed')
    };
    //NEcesitamos un auxiliar que nos permita utilizar la clase del tipo de pokemon
    let currentClassType = null;
    //Tiene que cambiar los elementos de la imagen para ello debemos de crear un template que se encarge de encadenar los datos
    const ImageTemplate = "<img class='pokedisplayImage' src='{imgSrc}' alt='pokedisplay'>";
    //necesitamos un objeto que se encargue de guardar las rutas de las imagenes que vamos a cambiar depenndiendo de si es una busqueda si lo encontro o no al pokemon
    const imagePaths = {
        default: '../img/loading.gif',
        notFound: '../img/404.png'

    };

    //NEcesitamos una variable que guarde todos los contenedores de la pokedex 
    const containers={
        imagenContainer: document.getElementById('pokedisplay-container'),
        pokemonTypesContainer: document.getElementById('pokemos-types-container'),
        pokemonNameElement: document.getElementById('pokedisplay-name'),
        pokemonAbilitiesContainer: document.getElementById('pokemon-abilities-container'),
        pokemonMoveElement: document.getElementById('pokemon-move-element'),
        pokemonIdElement: document.getElementById('pokedisplay-id')

    }

    //Necesitamos un objeto de tipo array que guarde los botones con su tipo de referencia
    const buttons = {
        all:Array.from(document.getElementsByClassName('btn')),
        search:document.getElementById('btnSearch'),
        next:document.getElementById('btnUp'),
        previous:document.getElementById('btnDown')
    };

//vamos a buscar u pokemon necesitamos una variable que guarde el nombre del pokemon
const pokemonIntput =document.getElementById('pokemon-input');
// la agrupacion de los elementos en este elemento tiene que ser una estrucutura que nos 
// permita crear funcionnes pas pequennas que nos permiten traer todos los datos solicitados 
// sin importar el orden

 const processPokemonType =(pokemonData)=>
    {
 //Primero necesitamos obtener el tipo de pokemon el nombre y la clase para que
 // se modifique en el html ya que tenemos todo eso tenemos que obtener los stats los
 // movimientos las habilidades
        let pokemonType=""
        //utilizo una busqueda de la clase de pokemon eso se refiere al tipo de pokemon 
        const primeraClase= pokemonData.types[0].type.name
        pokemonData.types.forEach((pokemonTypeData)=>{

            //Necesito obtener la etiqueta de cada cambio 
            pokemonType += `<span class="pokemon-type ${pokemonTypeData.type.name}">${pokemonTypeData.type.name}</span>`;


         })
        //Para poder quitar y cambiar el contenedor dependiendo del tipo tengo que saver a cual pretenece
         if(currentClassType){
            containers.pokemonMoveElement.classList.remove(currentClassType);
                containers.pokemonAbilitiesContainer.classList.remove(currentClassType);

         }
         containers.pokemonMoveElement.classList.add(primeraClase);
            containers.pokemonAbilitiesContainer.classList.add(primeraClase);

            containers.pokemonTypesContainer.innerHTML=pokemonType;

            //Haora necesitamos obtener las estadisticas del pokemon
            const processPOkemonStats=(pokemonData)=>{
                pokemonData.stats.forEach((statData)=>{
                   pokemonData.stats?.forEach((statData)=>{
                    //Vamos a evaluar si encuentra el nombre de la estadistica para colocarlo en su contenedor correspondiente
                    switch(statData.stat.name) {
                        case 'hp':
                            pokedmonStats.hp.innerHTML = statData.base_stat;
                            pokedmonStats.hp.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${statData.base_stat}%, rgb(0, 0, 0,1) ${statData.base_stat}%);`;
                            break;
                        case 'attack':
                            pokedmonStats.attack.innerHTML = statData.base_stat;
                            pokedmonStats.attack.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${statData.base_stat}%, rgb(0, 0, 0,1) ${statData.base_stat}%);`;
                            break;
                        case 'defense':
                            pokedmonStats.defense.innerHTML = statData.base_stat;
                            pokedmonStats.defense.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${statData.base_stat}%, rgb(0, 0, 0,1) ${statData.base_stat}%);`;
                            break;
                        case 'special-attack':
                            pokedmonStats.specialAttack.innerHTML = statData.base_stat;
                            pokedmonStats.specialAttack.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${statData.base_stat}%, rgb(0, 0, 0,1) ${statData.base_stat}%);`;
                            break;
                        case 'special-defense':
                            pokedmonStats.specialDefense.innerHTML = statData.base_stat;
                            pokedmonStats.specialDefense.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${statData.base_stat}%, rgb(0, 0, 0,1) ${statData.base_stat}%);`;
                            break;
                        case 'speed':
                            pokedmonStats.speed.innerHTML = statData.base_stat;
                            pokedmonStats.speed.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${statData.base_stat}%, rgb(0, 0, 0,1) ${statData.base_stat}%);`;
                            break;
                    }
                   })
                });

            }
    }
}