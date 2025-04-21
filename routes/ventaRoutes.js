const express = require('express');
const { crearVenta, obtenerVentas } = require('../controllers/ventaController');
const router = express.Router();

router.post('/crear', crearVenta);
router.get('/listar', obtenerVentas);

module.exports = router;
