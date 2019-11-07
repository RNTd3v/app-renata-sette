"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);
var _jsonwebtoken = require('jsonwebtoken'); var jwt = _interopRequireWildcard(_jsonwebtoken);
var _config = require('../config/config'); var _config2 = _interopRequireDefault(_config);


exports. default = {
  Query: {
    users: (_, args, { models }) => models.User.find(),
    user: (_, { id }, { models }) => models.User.findById(id)
  },
  Mutation: {
    createUser: async (_, { name, email, password }, { models }) => {
      const user = await models.User.findOne({ email })

      if (user) {
        throw new Error('Email ja cadastrado.')
      }

      const hash = _bcrypt2.default.hashSync(password, 10)

      // create a new user
      const newUser = new models.User({
        name,
        email,
        password: hash
      })

      let userRegistered

      // save the user
      try {
        userRegistered = await newUser.save()
        const token = jwt.sign(
          { id: userRegistered._id, name, email },
          _config2.default.jwt.JWT_SECRET
        )
        userRegistered.token = token
      } catch (e) {
        throw new Error('Cannot Save User!')
      }

      return userRegistered
    },
    updateUser: async (_, { id, name, email }, { models }) => {
      const user = await models.User.findById(id)

      if (!user) {
        throw new Error('Usuário não encontrado!')
      }

      if (name) {
        user.name = name
      }

      if (email) {
        user.email = email
      }

      const updateUser = await models.User.updateOne({ _id: id }, user)

      console.log(updateUser)

      return user
    },
    deleteUser: async (_, { id }, { models }) => {
      const user = await models.User.findById(id)

      if (!user) {
        throw new Error('Usuário não encontrado!')
      }

      const deleteUser = await models.User.deleteOne({ _id: id })

      console.log(deleteUser)

      return user
    },
    authenticate: async (_, { email, password }, { models }) => {
      const user = await models.User.findOne({ email })

      if (!user) {
        throw new Error('Usuário não encontrado!')
      }

      const validpass = await _bcrypt2.default.compareSync(password, user.password)

      if (validpass) {
        const token = jwt.sign({ email: user.email, name: user.name, id: user._id }, _config2.default.jwt.JWT_SECRET)
        user.token = token
        return user
      }

      return null
    }
  }
}
