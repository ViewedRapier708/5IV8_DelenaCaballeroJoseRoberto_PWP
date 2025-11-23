/*
Vamos a crear un cliente servidor para un crud
Para esto tenemos que probar si el modulo de mysql esta verificado
sino utilizaremos mysql2
*/

/*campos para el reporte
Id_equipo, Fecha_y_hora_reporte, Sintoma_reportado, Diagnostico, Accion_correctiva, Piezas_remplazadas, Tiempo_de_inactividad


*/
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const ejs = require('ejs');
require('dotenv').config({path: './.env'});
const app = express();
const port = 3100;
console.log(process.env.DB_user);
//configuracion de mysql
const bd = mysql.createConnection({
    
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_NAME
});
bd.connect((error) => {
    if (error) {
        console.log('Error de conexion a la base de datos: ' + error);
    } else {
        console.log('Conexion exitosa a la base de datos');
    }
});

//tenemos que configurar nuestro middleware, el cual estaremos usando rutas y codificacion de la informacion por json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//tenemos que configurar las vistas que se van ejecutar
app.set('view engine', 'ejs');
//donde se encuentra el directorio de dichas vistas
app.set('views', __dirname + '/views');

//para la carga de imagenes, css, multimedia, etc es necesario configurar una carpeta public, en la cual todos los recursos del proyecto se podran consumir
app.use(express.static(__dirname + '/css'));

//vamos a crear el crud de estudiantes a partir de rutas

//ruta get para mostrar el formulario y la lista de estudiantes
app.get('/', (req, res)=>{
    //necesito obtener la lista de estudiantes desde la base de datos
    const querry = 'SELECT * FROM bitacora_de_mantenimiento_correctivo';
    bd.query(querry, (error, resultados)=>{
        if(error){
            console.log('Error al obtener los registros: ' + error);
            res.status(500).send('Error al obtener los registros');
        }
        res.render('index', { registros: resultados });
        
    });
});

//ruta para crear un reporte
app.post('/crearReporte', (req, res) => {
    // Validación de los datos del formulario
    const { Id_equipo, Sintoma_reportado, 
        Diagnostico, Accion_correctiva, 
        Piezas_remplazadas, 
        Tiempo_de_inactividad } = req.body;

    const Fecha_y_hora_reporte = new Date();
    
    // Verifica que todos los campos estén presentes y no vacíos
    if (
        !Id_equipo || !Sintoma_reportado || !Diagnostico ||
        !Accion_correctiva || !Piezas_remplazadas || !Tiempo_de_inactividad
    ) {
        return res.status(400).send('Faltan datos obligatorios para crear el reporte');
    }

    // Opcional: Validación de tipos de datos (ejemplo para Id_equipo y Tiempo_de_inactividad)
    if (isNaN(Id_equipo)) {
        return res.status(400).send('El Id_equipo debe ser un número');
    }
    if (isNaN(Tiempo_de_inactividad)) {
        return res.status(400).send('El Tiempo_de_inactividad debe ser un número');
    }

    const querry = `INSERT INTO bitacora_de_mantenimiento_correctivo
     (Id_equipo, Fecha_y_hora_reporte, Sintoma_reportado, Diagnostico, 
     Accion_correctiva, Piezas_remplazadas, 
     Tiempo_de_inactividad) VALUES 
     ('${Id_equipo}', '${Fecha_y_hora_reporte}', '${Sintoma_reportado}',
      '${Diagnostico}', '${Accion_correctiva}', '${Piezas_remplazadas}',
       '${Tiempo_de_inactividad}');`;
    
       bd.query(querry, (error, resultados) => {
        if (error) {
            console.log('Error al crear el estudiante: ' + error);
            res.status(500).send('Error al crear el estudiante');
        }
        res.redirect('/');
    });
});
//Ruta para eliminar un estudiante
app.get('/crearReporte/delete/:id', (req, res) => {
    const idregistro = req.params.id;
    const querry = `DELETE FROM bitacora_de_mantenimiento_correctivo WHERE id = ${idregitro};`;
    bd.query(querry, (error, resultados) => {
        if (error) {
            console.log('Error al eliminar el registro: ' + error);//Depuracion
            res.status(500).send('Error al el registro');
        }
        res.redirect('/');
    });
})
//Ruta para buscar y actualizar al estudiante
app.get('/crearReporte/edit/:id', (req, res) => {
    const idregistro = req.params.id;
    const querry = `SELECT * FROM bitacora_de_mantenimiento_correctivo WHERE id = ${idregistro};`;
    bd.query(querry, (error, resultados) => {
        if (error) {
            console.log('Error al obtener el estudiante: ' + error);//Depuracion
            res.status(500).send('Error al obtener el estudiante');
        }
        res.render('edit', { estudiante: resultados[0] });
    });

});
app.post('/crearReporte/update/:id', (req, res) => {
    const estudianteId = req.params.id;
    const { Id_equipo, Sintoma_reportado,
         Diagnostico, Accion_correctiva, 
         Piezas_remplazadas, Tiempo_de_inactividad }
    = req.body;
    const campos = [];
    if (Id_equipo) campos.push(`Id_equipo = '${Id_equipo}'`);
    if (Sintoma_reportado) campos.push(`Sintoma_reportado = '${Sintoma_reportado}'`);
    if (Diagnostico) campos.push(`Diagnostico = '${Diagnostico}'`);
    if (Accion_correctiva) campos.push(`Accion_correctiva = '${Accion_correctiva}'`);
    if (Piezas_remplazadas) campos.push(`Piezas_remplazadas = '${Piezas_remplazadas}'`);
    if (Tiempo_de_inactividad) campos.push(`Tiempo_de_inactividad = '${Tiempo_de_inactividad}'`);

    if (campos.length === 0) return res.status(400).send('No se proporcionaron campos para actualizar');
    
    const querry = `UPDATE bitacora_de_mantenimiento_correctivo SET ${campos.join(', ')} WHERE id = ${estudianteId};`;
    bd.query(querry, (error, resultados) => {
        if (error) {
            console.log('Error al actualizar el estudiante: ' + error);
            res.status(500).send('Error al actualizar el estudiante');
        }
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});