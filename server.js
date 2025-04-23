require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const foodRoutes = require('./routes/food');

const app = express();

// Middlewares
app.use(cors()); // Permite conexiones desde tu app React Native
app.use(bodyParser.json({ limit: '10mb' })); // Para recibir imágenes en base64

// Rutas
app.use('/api/food', foodRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});