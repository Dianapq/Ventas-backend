const Venta = require('../models/Venta');

exports.crearVenta = async (req, res) => {
    const { producto, valor, usuario } = req.body;

    try {
        const nuevaVenta = new Venta({ producto, valor, usuario });
        await nuevaVenta.save();
        res.status(201).json(nuevaVenta);
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.obtenerVentas = async (req, res) => {
    try {
        const ventas = await Venta.find().populate('usuario', 'email');
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ error });
    }
};

