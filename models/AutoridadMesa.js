const mongoose = require('mongoose')

const AutoridadMesaSchema = mongoose.Schema({
    mesa_votacion_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'MesaVotacion'
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    dpi: {
        type: String,
        required:true,
        trim: true
    },
    puesto: {
        type: String,
        required:true,
        trim: true
    },
    creado: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('AutoridadMesa', AutoridadMesaSchema)