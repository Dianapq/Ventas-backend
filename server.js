require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const ventaRoutes = require('./routes/ventaRoutes');

const app = express();

// Middlewares
app.use(express.json());

// ✅ Configurar CORS para permitir frontend desde Vercel
app.use(cors({
  origin: 'https://ventas-front-three.vercel.app',
  credentials: true
}));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/ventas', ventaRoutes);

// Conectar a MongoDB
const connectDB = require('./config/db');
connectDB();

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
