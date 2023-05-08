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
        obtenerCandidatos (): [Candidato]
    }

    #Mutation
    type Mutation {
        #Ciudadano 
        nuevoCiudadano (input: CiudadanoInput!): Ciudadano
        #Candidato 
        nuevoCandidato (input: CandidatoInput!): Candidato
    }

`

module.exports = typeDefs