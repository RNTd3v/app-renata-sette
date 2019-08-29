import { GraphQLServer } from 'graphql-yoga'
import { default as typeDefs } from './typeDefs'
import { default as resolvers } from './resolvers'
import { rule, shield, and, or, not } from 'graphql-shield'
import { startDB, models } from './db'
import config from './config/config'
import * as jwt from 'jsonwebtoken'

require('dotenv').config()

const db = startDB({
  user: process.env.DB_USER,
  pwd: process.env.DB_PASSWORD,
  db: process.env.DB_DATABASE,
  url: `${process.env.DB_HOST}:${process.env.DB_PORT}`
})

function getClaims (req): any {
  let token
  try {
    token = jwt.verify(req.request.get('Authorization'), config.jwt.JWT_SECRET)
  } catch (e) {
    return null
  }
  return token.claims
}

// Rules
const isAuthenticated = rule()(async (parent, args, ctx) => {
  return ctx.claims !== null
})

// Permissions
const permissions = shield({
  Query: {
    users: and(isAuthenticated),
    categories: not(isAuthenticated)
  }
})

const options = { port: 4004 }

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  middlewares: [permissions],
  context: (req): any => ({
    ...req,
    claims: getClaims(req),
    models,
    db
  })
})

server
  .start(options, () =>
    console.log(`Server is running on localhost:${options.port}`)
  )
  .catch(err => console.error('connection Error', err))
