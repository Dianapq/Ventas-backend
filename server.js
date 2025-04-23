require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const ventaRoutes = require('./routes/ventaRoutes');

const app = express();

// Middleware para parsear JSON
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

// ⛔️ Elimina app.listen() y exporta la app para Vercel
module.exports = app;


