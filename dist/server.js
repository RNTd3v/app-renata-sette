"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _graphqlyoga = require('graphql-yoga');
var _typeDefs = require('./typeDefs');
var _resolvers = require('./resolvers');
var _graphqlshield = require('graphql-shield');
var _db = require('./db');
var _config = require('./config/config'); var _config2 = _interopRequireDefault(_config);
var _jsonwebtoken = require('jsonwebtoken'); var jwt = _interopRequireWildcard(_jsonwebtoken);

require('dotenv').config()

const db = _db.startDB.call(void 0, {
  user: process.env.DB_USER,
  pwd: process.env.DB_PASSWORD,
  db: process.env.DB_DATABASE,
  url: process.env.DB_HOST,
  dbInitial: process.env.IS_WORK ? 'mongodb' : 'mongodb+srv',
  dbFinal: process.env.IS_WORK ? 'authSource=admin' : 'retryWrites=true&w=majority'
})

function getClaims (req) {
  let token
  try {
    token = jwt.verify(req.request.get('Authorization'), _config2.default.jwt.JWT_SECRET)
  } catch (e) {
    return null
  }
  return token.claims
}

// Rules
const isAuthenticated = _graphqlshield.rule.call(void 0, )(async (parent, args, ctx) => {
  return ctx.claims !== null
})

// Permissions
const permissions = _graphqlshield.shield.call(void 0, {
  Query: {
    biosAuth: _graphqlshield.and.call(void 0, isAuthenticated),
    categoriesAuth: _graphqlshield.and.call(void 0, isAuthenticated),
    categoryAuth: _graphqlshield.and.call(void 0, isAuthenticated),
    contactsAuth: _graphqlshield.and.call(void 0, isAuthenticated),
    mediasByWorkAuth: _graphqlshield.and.call(void 0, isAuthenticated),
    projectsAuth: _graphqlshield.and.call(void 0, isAuthenticated),
    projectAuth: _graphqlshield.and.call(void 0, isAuthenticated),
    sliderAuth: _graphqlshield.and.call(void 0, isAuthenticated),
    socialMediaAuth: _graphqlshield.and.call(void 0, isAuthenticated),
    uploads: _graphqlshield.and.call(void 0, isAuthenticated),
    users: _graphqlshield.and.call(void 0, isAuthenticated),
    user: _graphqlshield.and.call(void 0, isAuthenticated),
    worksByCategoryAuth: _graphqlshield.and.call(void 0, isAuthenticated),
    workAuth: _graphqlshield.and.call(void 0, isAuthenticated),
    categories: _graphqlshield.not.call(void 0, isAuthenticated)
  },
  Mutation: {
    '*': _graphqlshield.and.call(void 0, isAuthenticated),
    authenticate: _graphqlshield.not.call(void 0, isAuthenticated),
    changePass: _graphqlshield.not.call(void 0, isAuthenticated)
  }
})

const options = { port: 4004 }

const server = new (0, _graphqlyoga.GraphQLServer)({
  typeDefs: _typeDefs.default,
  resolvers: _resolvers.default,
  middlewares: [permissions],
  context: (req) => ({
    ...req,
    claims: getClaims(req),
    models: _db.models,
    db
  })
})

server
  .start(options, () =>
    console.log(`Server is running on localhost:${options.port}`)
  )
  .catch(err => console.error('connection Errors', err))
