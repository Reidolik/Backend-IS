const { gql } = require('apollo-server');


//Schema
const typeDefs = gql`

    #types
    type Ciudadano {
        id: ID
        nombre: String
        apellido: String
        edad: Int
        dpi: String
        creado: String
    }

    type Candidato {
        id: ID
        nombre: String
        apellido: String
        puesto: String
        planilla: String
        dpi: String
        cv: String
        creado: String
    }

    type Voto {
        id: ID
        ciudadano_id: ID
        eleccion_id: ID
        presidente_voto: String
        alcalde_voto: String
        fecha_voto: String
        creado: String
    }

    type Eleccion {
        id: ID
        anio_eleccion: Int
        fecha_inicio_eleccion: String
        fecha_fin_eleccion: String
        cantidad_partidos_activos: Int
        creado: String
    }

    type MesaVotacion {
        id:ID
        ciudadano_voluntario_id: ID
        eleccion_id: ID
        numero_mesa: Int
        departamento: String
        municipio: String
        ubicacion: String
        fecha_acta: String
        creado: String
    }

    type ResultadoElectoral {
        id: ID,
        eleccion_id: ID
        candidato_id: ID
        firma_presidente_mesa: Boolean
        firma_vicepresidente_mesa: Boolean
        fecha_acta: String
        creado: String
    }

    type ActasMesa {
        id: ID
        mesa_votacion_id: ID
        eleccion_id: ID
        firma_presidente_mesa: Boolean
        firma_vicepresidente_mesa: Boolean
        fecha_acta: String
        creado: String
    }

    type AutoridadMesa {
        id: ID
        mesa_votacion_id: ID
        nombre: String
        apellido: String
        dpi: String
        puesto: String
        creado: String
    }

    type Usuario {
        id: ID
        nombre: String
        apellido: String
        email: String
        password: String
        creado: String
    }

    type Token {
        token: String
    }

    #inputs
    input CiudadanoInput {
        nombre: String!
        apellido: String!
        edad: Int!
        dpi: String!
    }

    input CandidatoInput {
        nombre: String!
        apellido: String!
        puesto: String!
        planilla: String!
        dpi: String!
        cv: String!
    }

    input VotoInput {
        ciudadano_id: ID!
        eleccion_id: ID!
        presidente_voto: String!
        alcalde_voto: String!
        fecha_voto: String!
    }

    input EleccionInput {
        anio_eleccion: Int!
        fecha_inicio_eleccion: String!
        fecha_fin_eleccion: String!
        cantidad_partidos_activos: Int!
    }

    input MesaVotacionInput {
        numero_mesa: Int!
        departamento: String!
        municipio: String!
        ubicacion: String!
        fecha_acta: String!
    }

    input ResultadoElectoralInput {
        candidato_id: ID!
        firma_presidente_mesa: Boolean!
        firma_vicepresidente_mesa: Boolean!
        fecha_acta: String!
    }

    input AutoridadMesaInput {
        mesa_votacion_id: ID!
        nombre: String!
        apellido: String!
        dpi: String!
        puesto: String!
    }

    input ActasMesaInput {
        mesa_votacion_id: ID!
        firma_presidente_mesa: Boolean!
        firma_vicepresidente_mesa: Boolean!
        fecha_acta: String!
    }

    input UsuarioInput {
        nombre: String!
        apellido: String!
        email: String!
        password: String!
    }

    input AutenticarInput {
        email: String!
        password: String!
    }

    #Query
    type Query {
        #Ciudadano
        obtenerCiudadano (dpi: String!): Ciudadano
        #Candidato
        obtenerCandidato (dpi: String!): Candidato
        obtenerCandidatos : [Candidato]
        #Voto
        obtenerVoto (dpi: ID!, anio: Int!): Voto
        #Eleccion
        obtenerEleccion (anio: Int!): Eleccion
        #Mesa de votacion
        obtenerMesaVotacionVotante (dpi: ID!, anio: Int!): MesaVotacion
        #Resultado electoral
        obtenerResultadosElectorales (anio: Int!): [ResultadoElectoral]
        #Autoridad de mesa
        obtenerAutoridadMesa (nombre: String!, apellido: String!, idMesa: ID!): AutoridadMesa
        #Actas de mesa
        obtenerActasMesa (idMesa: ID, anio: Int!): ActasMesa
        #Usuario
        obtenerUsuario (token: String!): Usuario
    }

    #Mutation
    type Mutation {
        #Ciudadano 
        nuevoCiudadano (input: CiudadanoInput!): Ciudadano
        #Candidato 
        nuevoCandidato (input: CandidatoInput!): Candidato
        #voto
        nuevoVoto (input: VotoInput!): Voto
        #Eleccion
        nuevaEleccion (input: EleccionInput!): Eleccion
        #Mesa de votacion
        nuevaMesaVotacionVotante (dpi: ID!, anio: Int!, input: MesaVotacionInput!): MesaVotacion
        #Resultado electoral
        nuevoResultadoElectoral (anio: Int!, input: ResultadoElectoralInput!): ResultadoElectoral
        #Autoridad de mesa
        nuevaAutoridadMesa (input: AutoridadMesaInput!): AutoridadMesa
        #Actaas de mesa
        nuevaActaMesa (anio: Int!, input: ActasMesaInput!): ActasMesa
        #Usuario
        nuevoUsuario (input: UsuarioInput!): Usuario
        autenticarUsuario (input: AutenticarInput!): Token
    }

`

module.exports = typeDefs