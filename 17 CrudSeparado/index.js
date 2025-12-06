const express = require('express');
const dotenv = require ('dotenv');
const cors = require ('cors');
const path = require ('path');
const cursosRouters = require ('./routers/cusosRouters.js');

const app = express();
 
const db =require ('./database/db.js');
const { error } = require('console');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(cors());

//Vamos a generar una vista estatica
app.use(express.static(path.join(__dirname, 'views')));

//necesito ver la pagina de cursos
app.get('/vista/cursos-ejs', (req, res) => {
    res.redirect('/vista/cursos-ejs');
});

//Ruta de bienvenida
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'bienvenida.html'));
});

//Vamos a renderizar la ruta de consulta
app.get('/vista/cursos-ejs', (req, res) => {
    const sql = (
        'SELECT * FROM cursos',
        (error, results) => {
        if (error) {
            console.log('Error al obtener los cursos:', error);
            res.status(500).send('Error al obtener los cursos');
            return res.render('cursos', { cursos: [] });
        } 
          return res.render('cursos', { cursos:[results] });
    });

});

//Rutas usar la rutas
app.use('/cursos', cursosRouters);

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000 http://localhost:3000');
});