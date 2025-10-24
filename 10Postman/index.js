import express from 'express';
import mirrow from './endpoint/mirrow.js';


//Vamos a hacer una instancia del servidor
const app = express();
const port = 3000;

app.use(express.json());//middleware para parsear json
//Definimos las rutas
app.get('/', mirrow);
app.post('/', mirrow);
app.put('/', mirrow);
app.patch('/', mirrow);
app.delete('/', mirrow);
app.head('/', mirrow);
app.listen(port, () => {
   console.log(`Servidor escuchando`);
});