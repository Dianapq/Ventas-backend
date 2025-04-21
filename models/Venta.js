const mongoose = require('mongoose');

const VentaSchema = new mongoose.Schema({
    producto: { type: String, required: true, trim: true },
    valor: { type: Number, required: true, min: 0 },
    fecha: { type: Date, default: Date.now },
    estado: { 
        type: String, 
        enum: ['pendiente', 'pagado', 'rechazado'], 
        default: 'pendiente',
        required: true 
    },
    usuario: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
});

// Exportar el modelo con el nombre correcto del esquema
module.exports = mongoose.model('Ventas', VentaSchema);
