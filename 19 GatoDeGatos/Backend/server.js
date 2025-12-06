import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import gameRoutes from './routes/gameRoutes.js';
import playerRoutes from './routes/playerRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(rootDir, 'Frontend', 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(rootDir, 'Frontend', 'vistas'));

app.get('/', (_req, res) => {
  res.render('index');
});

app.use('/api/jugadores', playerRoutes);
app.use('/api/partidas', gameRoutes);

app.listen(PORT, () => {
  console.log(`Servidor Gato de Gatos en http://localhost:${PORT}`);
});
