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
const path = require('path');
require('dotenv').config({path: './.env'});
const app = express();
const port = 3100;
console.log(process.env.DB_user);
//configuracion de mysql
const bd = mysql.createConnection({
    
    host: process.env.BD_HOST || 'localhost',
    user: process.env.BD_USER || 'root',
    password: process.env.BD_PASSWORD || 'n0m3l0',
    database: process.env.BD_NAME || 'bitacora'
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
// donde se encuentra el directorio de dichas vistas
app.set('views', path.join(__dirname, 'views'));

// servir archivos estáticos (css) desde /css para que en las vistas puedas usar /css/archivo.css
app.use('/css', express.static(path.join(__dirname, 'css')));

app.get('/', (req, res)=>{
    //necesito obtener la lista de estudiantes desde la base de datos
    const querry = 'SELECT * FROM bitacora_de_mantenimiento_correctivo';
    bd.query(querry, (error, resultados)=>{
        if(error){
            console.log('Error al obtener los registros: ' + error);
            res.status(500).send('Error al obtener los registros');
        }
        // Obtener mensajes de error o éxito si existen
        const errorMsg = req.query.error || null;
        const successMsg = req.query.success || null;
        res.render('index', { registros: resultados, error: errorMsg, success: successMsg });
        
    });
});

//ruta para crear un reporte
app.post('/crearReporte', (req, res) => {
    // Validación de los datos del formulario
    const { Id_equipo, Sintoma_reportado, 
        Diagnostico, Accion_correctiva, 
        Piezas_remplazadas, 
        Tiempo_de_inactividad } = req.body;

    // Validar que todos los campos existan y no estén vacíos
    if (
        !Id_equipo || Id_equipo.toString().trim() === '' ||
        !Sintoma_reportado || Sintoma_reportado.trim() === '' ||
        !Diagnostico || Diagnostico.trim() === '' ||
        !Accion_correctiva || Accion_correctiva.trim() === '' ||
        !Piezas_remplazadas || Piezas_remplazadas.trim() === '' ||
        !Tiempo_de_inactividad || Tiempo_de_inactividad.toString().trim() === ''
    ) {
        return res.redirect(`/?error=${encodeURIComponent('Todos los campos son obligatorios')}`);
    }

    // Validar que Id_equipo sea un número válido
    if (!/^\d+$/.test(Id_equipo)) {
        return res.redirect(`/?error=${encodeURIComponent('El Id_equipo debe ser un número válido')}`);
    }

    // Validar longitud máxima de campos de texto
    if (
        Sintoma_reportado.length > 255 ||
        Diagnostico.length > 255 ||
        Accion_correctiva.length > 255 ||
        Piezas_remplazadas.length > 255
    ) {
        return res.redirect(`/?error=${encodeURIComponent('Los campos de texto no deben exceder 255 caracteres')}`);
    }

    // Validar que Tiempo_de_inactividad sea un formato de hora válido (HH:MM)
    if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(Tiempo_de_inactividad)) {
        return res.redirect(`/?error=${encodeURIComponent('El tiempo de inactividad debe tener formato HH:MM')}`);
    }

    const fechaMysql = new Date().toISOString().slice(0, 19).replace('T', ' ');

  

    const querry = `INSERT INTO bitacora_de_mantenimiento_correctivo
     (Id_equipo, Fecha_y_hora_reporte, Sintoma_reportado, Diagnostico, 
     Accion_correctiva, Piezas_remplazadas, 
     Tiempo_de_inactividad) VALUES 
     ('${Id_equipo}', '${fechaMysql}', '${Sintoma_reportado}',
      '${Diagnostico}', '${Accion_correctiva}', '${Piezas_remplazadas}',
       '${Tiempo_de_inactividad}');`;
    
       bd.query(querry, (error, resultados) => {
        if (error) {
            console.log('Error al crear el reporte: ' + error);
            return res.redirect(`/?error=${encodeURIComponent('Error al crear el reporte en la base de datos')}`);
        }
        res.redirect(`/?success=${encodeURIComponent('Reporte creado exitosamente')}`);
    });
});
//Ruta para eliminar un estudiante
app.get('/crearReporte/delete/:id', (req, res) => {
    const idregistro = req.params.id;
    // Validación: solo se admiten números
    if (!/^\d+$/.test(idregistro)) {
        return res.redirect(`/?error=${encodeURIComponent('El ID debe ser un número válido')}`);
    }
    const querry = `DELETE FROM bitacora_de_mantenimiento_correctivo WHERE Id_registro = ${idregistro};`;
    bd.query(querry, (error, resultados) => {
        if (error) {
            console.log('Error al eliminar el registro: ' + error);//Depuracion
            return res.redirect(`/?error=${encodeURIComponent('Error al eliminar el registro')}`);
        }
        res.redirect(`/?success=${encodeURIComponent('Registro eliminado exitosamente')}`);
    });
})
//Ruta para buscar y actualizar al estudiante
app.get('/crearReporte/edit/:id', (req, res) => {
    const idregistro = req.params.id;
     if (!/^\d+$/.test(idregistro)) {
        return res.status(400).send('El ID debe ser un número válido');
    }
    
    const querry = `SELECT * FROM bitacora_de_mantenimiento_correctivo WHERE Id_registro = ${idregistro};`;
    bd.query(querry, (error, resultados) => {
        if (error) {
            console.log('Error al obtener el estudiante: ' + error);//Depuracion
            res.status(500).send('Error al obtener el estudiante');
        }
        // Obtener mensaje de error si existe
        const errorMsg = req.query.error || null;
        res.render('edit', { reporte: resultados[0], error: errorMsg });
    });

});
app.post('/crearReporte/update/:id', (req, res) => {
    const idregistro = req.params.id;
    const { Id_equipo, Sintoma_reportado,
         Diagnostico, Accion_correctiva, 
         Piezas_remplazadas, Tiempo_de_inactividad }
    = req.body;

    // Validar que el ID sea un número válido
    if (!/^\d+$/.test(idregistro)) {
        return res.redirect(`/crearReporte/edit/${idregistro}?error=${encodeURIComponent('El ID debe ser un número válido')}`);
    }

    // Validar Id_equipo si se proporciona
    if (Id_equipo && Id_equipo.trim() !== '') {
        if (!/^\d+$/.test(Id_equipo)) {
            return res.redirect(`/crearReporte/edit/${idregistro}?error=${encodeURIComponent('El Id_equipo debe ser un número válido')}`);
        }
    }

    // Validar longitud de campos de texto si se proporcionan
    if (Sintoma_reportado && Sintoma_reportado.length > 255) {
        return res.redirect(`/crearReporte/edit/${idregistro}?error=${encodeURIComponent('El síntoma reportado no debe exceder 255 caracteres')}`);
    }
    if (Diagnostico && Diagnostico.length > 255) {
        return res.redirect(`/crearReporte/edit/${idregistro}?error=${encodeURIComponent('El diagnóstico no debe exceder 255 caracteres')}`);
    }
    if (Accion_correctiva && Accion_correctiva.length > 255) {
        return res.redirect(`/crearReporte/edit/${idregistro}?error=${encodeURIComponent('La acción correctiva no debe exceder 255 caracteres')}`);
    }
    if (Piezas_remplazadas && Piezas_remplazadas.length > 255) {
        return res.redirect(`/crearReporte/edit/${idregistro}?error=${encodeURIComponent('Las piezas reemplazadas no debe exceder 255 caracteres')}`);
    }

    // Validar formato de tiempo si se proporciona
    if (Tiempo_de_inactividad && Tiempo_de_inactividad.trim() !== '') {
        if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(Tiempo_de_inactividad)) {
            return res.redirect(`/crearReporte/edit/${idregistro}?error=${encodeURIComponent('El tiempo de inactividad debe tener formato HH:MM')}`);
        }
    }

    const campos = [];
    if (Id_equipo && Id_equipo.trim() !== '') campos.push(`Id_equipo = '${Id_equipo.trim()}'`);
    if (Sintoma_reportado && Sintoma_reportado.trim() !== '') campos.push(`Sintoma_reportado = '${Sintoma_reportado.trim()}'`);
    if (Diagnostico && Diagnostico.trim() !== '') campos.push(`Diagnostico = '${Diagnostico.trim()}'`);
    if (Accion_correctiva && Accion_correctiva.trim() !== '') campos.push(`Accion_correctiva = '${Accion_correctiva.trim()}'`);
    if (Piezas_remplazadas && Piezas_remplazadas.trim() !== '') campos.push(`Piezas_remplazadas = '${Piezas_remplazadas.trim()}'`);
    if (Tiempo_de_inactividad && Tiempo_de_inactividad.trim() !== '') campos.push(`Tiempo_de_inactividad = '${Tiempo_de_inactividad.trim()}'`);

    if (campos.length === 0) return res.redirect(`/crearReporte/edit/${idregistro}?error=${encodeURIComponent('No se proporcionaron campos para actualizar')}`);
    
    const querry = `UPDATE bitacora_de_mantenimiento_correctivo SET ${campos.join(', ')} WHERE Id_registro = ${idregistro};`;
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