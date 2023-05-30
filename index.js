const { ApolloServer, gql } = require('apollo-server');
const conectarDB = require('./config/db')
const typeDefs = require('./db/schema')
const resolvers = require('./db/resolvers')
const jwt = require('jsonwebtoken')

require('dotenv').config({ path: 'variables.env' })

//Conectar a la DB
conectarDB()

//Servidor
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers['authorization'] || ''

        if (token) {
            try {
                const usuario = jwt.verify(token.replace('Bearer ', ''), process.env.SIGN_SECRET)
                return { usuario }
            } catch (error) {
                console.log('Hubo un error')
                console.log(error)
            }
        }
    }
})

//Arrancar el servidor
server.listen({ port: 5000 }).then(({ url }) => {
    console.log(`Servidor listo ${url}`)
})