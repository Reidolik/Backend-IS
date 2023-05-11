const mongoose = require('mongoose')

const ActasEscrutinioSchema = mongoose.Schema({
    mesa_votacion_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'MesaVotacion'
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

module.exports = mongoose.model('ActasEscrutinio', ActasEscrutinioSchema)