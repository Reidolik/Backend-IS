const mongoose = require('mongoose')

const EleccionSchema = mongoose.Schema({
    anio_eleccion: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    fecha_inicio_eleccion: {
        type: Date,
        required: true,
        trim: true
    },
    fecha_fin_eleccion: {
        type: Date,
        required: true,
        trim: true
    },
    cantidad_partidos_activos: {
        type: Number,
        required:true,
        trim: true
    },
    creado: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Eleccion', EleccionSchema)