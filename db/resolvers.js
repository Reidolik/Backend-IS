//Modelos
const Candidato = require('../models/Candidato')
const Ciudadano = require('../models/Ciudadano')

//Librerias u otros
//const bcryptjs = require('bcryptjs')
require('dotenv').config({ path: 'variables.env' })
const jwt = require('jsonwebtoken')

//Crear token
const crearToken = (usuario, secreto, expiracion) => {
    const { id, email, nombre, apellido } = usuario
    return jwt.sign({ id, email, nombre, apellido }, secreto, { expiresIn: expiracion })
}

//Resolvers
const resolvers = {
    Query: {
        //Ciudadano
        obtenerCiudadano: async (_, { dpi }) => {
            try {
                const ciudadanoData = await Ciudadano.findOne({ dpi })
                return ciudadanoData
            } catch (error) {
                console.log(error)
            } 
        },
        //Candidato
        obtenerCandidato: async (_, { dpi }) => {
            try {
                const candidatoData = await Candidato.findOne({ dpi })
                return candidatoData
            } catch (error) {
                console.log(error)
            } 
        },
        obtenerCandidatos: async () => {
            try {
                const candidatosData = await Candidato.find({ })
                return candidatosData
            } catch (error) {
                console.log(error)
            } 
        }
    },
    Mutation: {
        //Ciudadano
        nuevoCiudadano: async (_, { input }) => {
            const { nombre, apellido, edad, dpi } = input

            //Revisar si el ciudadano esta registrado
            const existeCiudadano = await Ciudadano.findOne({ dpi })

            if (existeCiudadano) {
                throw new Error('Ciudadano ya registrado')
            }

            //Guardar en BD
            try {
                const ciudadano = new Ciudadano(input)
                ciudadano.save()
                return ciudadano
            } catch (error) {
                console.log(error)
            }
        },
        //Candidato
        nuevoCandidato: async (_, { input }) => {
            const { nombre, apellido, edad, dpi } = input

            //Revisar si el candidato esta registrado
            const existeCandidato = await Candidato.findOne({ dpi })

            if (existeCandidato) {
                throw new Error('Candidato ya registrado')
            }

            //Guardar en BD
            try {
                const candidato = new Candidato(input)
                candidato.save()
                return candidato
            } catch (error) {
                console.log(error)
            }
        }
    }
}

module.exports = resolvers