const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Asegúrate de importar el modelo

exports.register = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ email, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ msg: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error("Error en el registro:", error.message);
        res.status(500).json({ msg: "Error en el servidor", error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Credenciales incorrectas' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciales incorrectas' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ 
            msg: "Inicio de sesión exitoso",
            token, 
            user: { id: user._id, email: user.email, role: user.role } 
        });

    } catch (error) {
        console.error("Error en el login:", error.message);
        res.status(500).json({ msg: "Error en el servidor", error: error.message });
    }
};
