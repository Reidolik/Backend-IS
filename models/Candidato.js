const mongoose = require('mongoose')

const CandidatoSchema = mongoose.Schema({
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
    puesto: {
        type: String,
        required: true,
        trim: true
    },
    planilla: {
        type: String,
        required: true,
        trim: true
    },
    dpi: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    cv: {
        type: String,
        required: true,
        trim: true
    },
    creado: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Candidato', CandidatoSchema)