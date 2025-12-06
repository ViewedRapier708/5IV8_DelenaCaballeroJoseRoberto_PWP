//Este es el midleware

const express = require('express');
const cursosRouters = express.Router();

const cursosController = require('../controlls/cursosControl.js');


cursosRouters.get('/',cursosController.getCursos );
//necesito busqueda por id
cursosRouters.get('/:id',cursosController.getCursosById );
/*
//post
cursosRouters.post('/registrar-curso',cursosController.createCurso );


//put

cursosRouters.put('/:id',cursosController.updateCurso );
//delete
cursosRouters.delete('/:id',cursosController.deleteCurso );
*/
module.exports = cursosRouters;