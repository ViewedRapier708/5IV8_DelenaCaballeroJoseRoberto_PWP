/*Vamos a crear un cliente servidor para un crud
Para esto debemos de probar si el modulo de mysql debe de estar verificado si no utilizaremos mysql2
*/
const express= require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app  = express();
const port =3000;

//Configuracion de mysql

const db =mysql.createConnection({host:'localhost',user:'root',password:'n0m3l0', database:'estudiantescecyt'})
//tenemos que configurar nuestro middleware el cual estaremos usando rutas y codificacion de la informacion por json

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('view engine','ejs');
//Donde se encuentra el directorio de dichas vistas
app.set('views',__dirname + '/views');
db.connect((error)=>{
if (error) {
    console.log('El error de conexion es: '+error);
}
console.log('Conexion exitosa a la base de datos');
})
//Tenemos que configurar las vistas que se van a ejecutar 


//Para la carga de imagenes css multimedia etc es necesario configurar una carpeta publica en la cual se van a encontrar estos archivos


app.use(express.static('__dirname + /css'));

//Vamos a crear el crud de estudiantes a partir de rutas

//Ruta para crear un estudiante
app.post('/estudiantes',(req,res)=>{


})
//Ruta para mostrar el formulario y la lista de estudiantes
app.get('/',(req,res)=>{
    //Necesito obtener la lista de estudiantes desde la db
    const sql = 'SELECT * FROM estudiantes';
    db.query(sql,(error,results)=>{
        if (error) {
            console.log('El error al traer los estudientes es: '+error);

        }
        //console.log(results);
        res.render('index',{estudiantes:results});
    })
});



app.listen(port,()=>{
    console.log(`Servidor ejecutandose en el puerto ${port}`);
});