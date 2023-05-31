//Modelos
const Candidato = require('../models/Candidato')
const Ciudadano = require('../models/Ciudadano')

//Librerias u otros
const bcryptjs = require('bcryptjs')
require('dotenv').config({ path: 'variables.env' })
const jwt = require('jsonwebtoken')
const Voto = require('../models/Voto')
const Eleccion = require('../models/Eleccion')
const MesaVotacion = require('../models/MesaVotacion')
const ResultadoElectoral = require('../models/ResultadoElectoral')
const AutoridadMesa = require('../models/AutoridadMesa')
const ActasMesa = require('../models/ActasMesa')
const Usuario = require('../models/Usuario')

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
        obtenerCiudadanos: async () => {
            try {
                const ciudadanosData = await Ciudadano.find({})
                return ciudadanosData
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
                const candidatosData = await Candidato.find({})
                return candidatosData
            } catch (error) {
                console.log(error)
            }
        },
        //Voto
        obtenerVoto: async (_, { dpi, anio }) => {

            //Verificar que exista el ciudadano
            const existeCiudadano = await Ciudadano.findOne({ dpi })

            if (!existeCiudadano) {
                throw new Error('Ciudadano no esta registrado')
            }

            //Verificar que exista la eleccion
            const existeEleccion = await Eleccion.findOne({ anio_eleccion: anio })

            if (!existeEleccion) {
                throw new Error('Eleccion no esta registrado')
            }

            try {
                const votoData = await Voto.findOne({ ciudadano_id: existeCiudadano._id, eleccion_id: existeEleccion._id })
                return votoData
            } catch (error) {
                console.log(error)
            }
        },
        obtenerVotos: async () => {
            try {
                const votosData = await Voto.find({})
                return votosData
            } catch (error) {
                console.log(error)
            }
        },
        //Eleccion
        obtenerEleccion: async (_, { anio }) => {
            try {
                const eleccionData = await Eleccion.findOne({ anio_eleccion: anio })
                return eleccionData
            } catch (error) {
                console.log(error)
            }
        },
        //Mesa de votacion
        obtenerMesaVotacionVotante: async (_, { dpi, anio }) => {

            //Verificar que exista el ciudadano
            const existeCiudadano = await Ciudadano.findOne({ dpi })

            if (!existeCiudadano) {
                throw new Error('Ciudadano no esta registrado')
            }

            //Verificar que exista la eleccion
            const existeEleccion = await Eleccion.findOne({ anio_eleccion: anio })

            if (!existeEleccion) {
                throw new Error('Eleccion no esta registrado')
            }

            try {
                const mesaVotacionData = await MesaVotacion.findOne({ ciudadano_voluntario_id: existeCiudadano._id, eleccion_id: existeEleccion._id })
                return mesaVotacionData
            } catch (error) {
                console.log(error)
            }
        },
        //Resultado electoral
        obtenerResultadosElectorales: async (_, { anio }) => {

            //Verificar que exista la eleccion
            const existeEleccion = await Eleccion.findOne({ anio_eleccion: anio })

            if (!existeEleccion) {
                throw new Error('Eleccion no esta registrado')
            }

            try {
                const resultadosElectorales = await ResultadoElectoral.find()
                return resultadosElectorales
            } catch (error) {
                console.log(error)
            }
        },
        //Autoridad de mesa
        obtenerAutoridadMesa: async (_, { nombre, apellido, idMesa }) => {

            //Verificar la existencia de la mesa
            const mesaData = await MesaVotacion.findOne({ _id: idMesa })

            if (!mesaData) {
                throw new Error('No existe la mesa a buscar')
            }

            try {
                const autoridadMesa = await AutoridadMesa.findOne({ mesa_votacion_id: idMesa, nombre, apellido })
                return autoridadMesa
            } catch (error) {
                console.log(error)
            }
        },
        //Actas de mesa
        obtenerActasMesa: async (_, { idMesa, anio }) => {

            //Verificar la existencia de la mesa
            const mesaData = await MesaVotacion.findOne({ _id: idMesa })

            if (!mesaData) {
                throw new Error('No existe la mesa a buscar')
            }

            //Verificar que exista la eleccion
            const existeEleccion = await Eleccion.findOne({ anio_eleccion: anio })

            if (!existeEleccion) {
                throw new Error('Eleccion no esta registrado')
            }

            try {
                const actaMesa = await ActasMesa.findOne({ mesa_votacion_id: idMesa, eleccion_id: existeEleccion._id })
                return actaMesa
            } catch (error) {
                console.log(error)
            }
        },
        //Usuario
        obtenerUsuario: async (_, { }, ctx) => {
            return ctx.usuario
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
        },
        //Voto
        nuevoVoto: async (_, { input }) => {
            const { ciudadano_id, eleccion_id, fecha_voto } = input

            //Revisar si el ciudadano esta registrado
            const existeCiudadano = await Ciudadano.findOne({ _id: ciudadano_id })

            if (!existeCiudadano) {
                throw new Error('Ciudadano no esta registrado')
            }

            //Revisar si existe voto registrado para esta eleccion
            let fechaHoy = new Date(fecha_voto)
            let fechaParseada = `${fechaHoy.getFullYear()}-${(fechaHoy.getMonth() + 1).toString().padStart(2, '0')}-${(fechaHoy.getDate()).toString().padStart(2, '0')}`

            // const options = { ciudadano_id: ciudadano_id, eleccion_id: eleccion_id }
            // options.fecha_voto = { $gte: fechaHoy }

            const existeVoto = await Voto.findOne({ ciudadano_id: ciudadano_id, eleccion_id: eleccion_id })

            if (existeVoto) {
                throw new Error('Voto ya esta registrado')
            }

            //Guardar en BD
            try {
                //Guardado
                const voto = new Voto(input)
                voto.save()
                return voto
            } catch (error) {
                console.log(error)
            }
        },
        //Eleccion
        nuevaEleccion: async (_, { input }) => {
            const { anio_eleccion } = input

            //Revisar si la eleccion esta registrada
            const existeEleccion = await Eleccion.findOne({ anio_eleccion })

            if (existeEleccion) {
                throw new Error('Eleccion ya esta registrada')
            }

            //Guardar en BD
            try {
                const eleccion = new Eleccion(input)
                eleccion.save()
                return eleccion
            } catch (error) {
                console.log(error)
            }
        },
        //mesa de votacion
        nuevaMesaVotacionVotante: async (_, { dpi, anio, input }) => {

            //Verificar que exista el ciudadano
            const existeCiudadano = await Ciudadano.findOne({ dpi })

            if (!existeCiudadano) {
                throw new Error('Ciudadano no esta registrado')
            }

            //Verificar que exista la eleccion
            const existeEleccion = await Eleccion.findOne({ anio_eleccion: anio })

            if (!existeEleccion) {
                throw new Error('Eleccion no esta registrado')
            }

            //Guardar en BD
            try {
                input.ciudadano_voluntario_id = existeCiudadano._id
                input.eleccion_id = existeEleccion._id
                const mesaVotacion = new MesaVotacion(input)
                mesaVotacion.save()
                return mesaVotacion
            } catch (error) {
                console.log(error)
            }
        },
        //Resultado electoral
        nuevoResultadoElectoral: async (_, { anio, input }) => {

            const { candidato_id } = input

            //Verificar que exista la eleccion
            const existeEleccion = await Eleccion.findOne({ anio_eleccion: anio })

            if (!existeEleccion) {
                throw new Error('Eleccion no esta registrado')
            }

            //Revisar si el candidato esta registrado
            const existeCandidato = await Candidato.findOne({ _id: candidato_id })

            if (!existeCandidato) {
                throw new Error('Candidato no esta registrado')
            }

            //Verificar si ya existe el registro para la eleccion
            const resultadosElectoralesData = await ResultadoElectoral.findOne({ eleccion_id: existeEleccion._id, candidato_id: existeCandidato._id })

            if (resultadosElectoralesData) {
                throw new Error('Ya esta registrado el resultado electoral para este año y esta eleccion')
            }

            //Guardar en BD
            try {
                input.eleccion_id = existeEleccion._id
                const resultadoElectoral = new ResultadoElectoral(input)
                resultadoElectoral.save()
                return resultadoElectoral
            } catch (error) {
                console.log(error)
            }
        },
        //Autoridad de mesa
        nuevaAutoridadMesa: async (_, { input }) => {

            const { mesa_votacion_id, dpi } = input

            //Comprobar existencia de la mesa de votacion
            const mesaData = await MesaVotacion.findOne({ _id: mesa_votacion_id })

            if (!mesaData) {
                throw new Error('No existe la mesa a buscar')
            }

            //Comprobar que exista el ciudadano
            const existeCiudadano = await Ciudadano.findOne({ dpi })

            if (!existeCiudadano) {
                throw new Error('Ciudadano no esta registrado')
            }

            //Comprobar que no este asignado dos veces la misma persona
            const existeAutoridad = await AutoridadMesa.findOne({ dpi })

            if (existeAutoridad) {
                throw new Error('Ya esta registrada la persona como autoridad')
            }

            //Guardar en BD
            try {
                const autoridadMesa = new AutoridadMesa(input)
                autoridadMesa.save()
                return autoridadMesa
            } catch (error) {
                console.log(error)
            }
        },
        //Actas de mesa
        nuevaActaMesa: async (_, { anio, input }) => {

            //Verificar que exista la eleccion
            const existeEleccion = await Eleccion.findOne({ anio_eleccion: anio })

            if (!existeEleccion) {
                throw new Error('Eleccion no esta registrado')
            }

            //Comprobar existencia de la mesa de votacion
            const mesaData = await MesaVotacion.findOne({ _id: mesa_votacion_id })

            if (!mesaData) {
                throw new Error('No existe la mesa a buscar')
            }

            //Guardar en BD
            try {
                const actaMesa = new ActasMesa(input)
                actaMesa.save()
                return actaMesa
            } catch (error) {
                console.log(error)
            }
        },
        //Usuario
        nuevoUsuario: async (_, { input }) => {
            const { email, password } = input

            const existeUsuario = await Usuario.findOne({ email })

            if (existeUsuario) {
                throw new Error('El usuario ya esta registrado')
            }

            //Hashear password
            const salt = await bcryptjs.genSaltSync(10)
            input.password = await bcryptjs.hashSync(password, salt)

            //Guardar en BD
            try {
                const usuario = new Usuario(input)
                usuario.save()
                //return usuario
            } catch (error) {
                console.log(error)
            }
        },
        autenticarUsuario: async (_, { input }) => {
            const { email, password } = input

            //El usuario existe
            const existeUsuario = await Usuario.findOne({ email })

            if (!existeUsuario) {
                throw new Error('El usuario no esta registrado')
            }

            //Revisar si el password es correcto
            const passwordCorrecto = await bcryptjs.compareSync(password, existeUsuario.password)

            if (!passwordCorrecto) {
                throw new Error('El password es incorrecto')
            }

            //Crear token
            return {
                token: crearToken(existeUsuario, process.env.SIGN_SECRET, '24h')
            }
        },
        autenticarCiudadano: async (_, { dpi }) => {
            try {
                const ciudadanoData = await Ciudadano.findOne({ dpi })
                return ciudadanoData
            } catch (error) {
                console.log(error)
            }
        },
    }
}

module.exports = resolvers