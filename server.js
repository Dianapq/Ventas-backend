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

// Configurar CORS para permitir solicitudes del frontend en Vercel
const corsOptions = {
  origin: 'https://ventas-front-three.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
};

app.use(cors(corsOptions));

// Manejar solicitudes preflight (OPTIONS)
app.options('*', cors(corsOptions));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/ventas', ventaRoutes);

// Conectar a MongoDB
const connectDB = require('./config/db');
connectDB();

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
