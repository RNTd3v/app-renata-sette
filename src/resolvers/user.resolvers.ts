import bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import config from '../config/config'
import { UserInterface } from '../db/schemas/User'

export default {
  Query: {
    users: (_, args, { models }): Promise<UserInterface[]> => models.User.find(),
    user: (_, { id }, { models }): Promise<UserInterface> => models.User.findById(id)
  },
  Mutation: {
    createUser: async (_, { name, email, password }, { models }) : Promise<UserInterface> => {
      const user = await models.User.findOne({ email })

      if (user) {
        throw new Error('Email ja cadastrado.')
      }

      const hash = bcrypt.hashSync(password, 10)

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
          config.jwt.JWT_SECRET
        )
        userRegistered.token = token
      } catch (e) {
        throw new Error('Cannot Save User!')
      }

      return userRegistered
    },
    updateUser: async (_, { id, name, email }, { models }) : Promise<UserInterface> => {
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
    deleteUser: async (_, { id }, { models }) : Promise<UserInterface> => {
      const user = await models.User.findById(id)

      if (!user) {
        throw new Error('Usuário não encontrado!')
      }

      const deleteUser = await models.User.deleteOne({ _id: id })

      console.log(deleteUser)

      return user
    },
    authenticate: async (_, { email, password }, { models }): Promise<void> => {
      const user = await models.User.findOne({ email })

      if (!user) {
        throw new Error('Usuário não encontrado!')
      }

      const validpass = await bcrypt.compareSync(password, user.password)

      if (validpass) {
        const token = jwt.sign({ email: user.email, name: user.name, id: user._id }, config.jwt.JWT_SECRET)
        user.token = token
        return user
      }

      return null
    }
  }
}
