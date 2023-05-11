const mongoose = require('mongoose')

const MesaVotacionSchema = mongoose.Schema({
    ciudadano_voluntario_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Ciudadano'
    },
    eleccion_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Eleccion'
    },
    numero_mesa: {
        type: Number,
        required: true,
        trim: true
    },
    departamento: {
        type: String,
        required:true,
        trim: true
    },
    municipio: {
        type: String,
        required:true,
        trim: true
    },
    ubicacion: {
        type: String,
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

module.exports = mongoose.model('MesaVotacion', MesaVotacionSchema)