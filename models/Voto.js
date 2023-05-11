const mongoose = require('mongoose')

const VotoSchema = mongoose.Schema({
    ciudadano_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Ciudadano'
    },
    eleccion_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Eleccion'
    },
    presidente_voto: {
        type: String,
        required: true,
        trim: true
    },
    alcalde_voto: {
        type: String,
        required: true,
        trim: true
    },
    fecha_voto: {
        type: Date,
        required:true,
        trim: true
    },
    creado: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Voto', VotoSchema)