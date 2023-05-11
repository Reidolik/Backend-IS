const mongoose = require('mongoose')

const ResultadoElectoralSchema = mongoose.Schema({
    eleccion_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Eleccion'
    },
    candidato_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Candidato'
    },
    firma_presidente_mesa: {
        type: Boolean,
        required: true,
        trim: true
    },
    firma_vicepresidente_mesa: {
        type: Boolean,
        required:true,
        trim: true
    },
    fecha_acta: {
        type: Date,
        required:true,
        trim: true
    },
    creado: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('ResultadoElectoral', ResultadoElectoralSchema)