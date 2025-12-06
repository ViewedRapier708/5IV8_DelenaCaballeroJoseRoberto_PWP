//Necesitamos crear un crud de cursos 

//necesitamos la conexion en la base de datos
const dbConfig = require ('../database/db.js');
//vamos a crear los endpoints


const getCursos = (req, res) => {
 
 try {
    const sql = "SELECT * FROM cursos";
    dbConfig.query(sql, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).json({ message: "Error al obtener los cursos" });
            console.log(error);
        }   else{
            res.status(200).json(results);
        }
    });
 } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
 }
}
const getCursosById = (req, res) => {
 
 try {
    const sql = "SELECT * FROM cursos where id= ?";
    dbConfig.query(sql, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).json({ message: "Error al obtener los cursos" });
            console.log(error);
        }   else{
            res.status(200).json(results);
        }
    });
 } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
 }
}

  
module.exports = {
    getCursos,
    getCursosById
}
