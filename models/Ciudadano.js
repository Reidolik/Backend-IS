const mongoose = require('mongoose')

const CiudadanoSchema = mongoose.Schema({
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
    edad: {
        type: Number,
        required: true,
        trim: true
    },
    dpi: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    creado: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Ciudadano', CiudadanoSchema)