import express from 'express';
import path from 'path';
import productRoutes from './routes/productroutes.js';

//Aqui nosotros debemos agregar las rutas que se vana consumir
const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../Frontend','public')));

app.set('views engine','ejs');
app.set('public', path.join(__dirname, '../Frontend','public'));
app.set('views', path.join(__dirname, '../Frontend','views'));
app.use('/')
app.use('/api', productRoutes);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});