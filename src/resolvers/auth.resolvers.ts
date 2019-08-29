import bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import config from '../config/config'

export default {
  Query: {
    auth: async (_, { email, password }, { models }): Promise<void> => {
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
