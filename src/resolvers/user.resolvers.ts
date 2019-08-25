import bcrypt from 'bcrypt';
import * as jwt from "jsonwebtoken";
import config from '../config/config';

export default {
  Query: {
    users: async (_, args, { models }) => await models.User.find(),
    user: async (_, { id }, {models}) => await models.User.findById(id)
  },
  Mutation: {
    createUser: async (_, {name, email, password}, {models}) => {
      const user = await models.User.findOne({ email });

      if (user) {
        throw new Error('Email ja cadastrado.');        
      }

      const hash = bcrypt.hashSync(password, 10);
      
      // create a new user
      const newUser = new models.User({
        name,
        email,
        password: hash
      });

      let userRegistered;

      const token = jwt.sign({id: userRegistered._id, name, email}, config.jwt.JWT_SECRET);

      // save the user
      try {
        userRegistered = await newUser.save();
        userRegistered.token = token;
      } catch (e) {
        throw new Error('Cannot Save User!');
      }

      return userRegistered;

    },
    updateUser: async (_, {id, name, email}, {models}) => {
      const user = await models.User.findById(id);

      if (!user) {
        throw new Error('Usuário não encontrado!');        
      }

      if (name) {
        user.name = name
      }

      if (email) {
        user.email = email
      }

      const updateUser = await models.User.updateOne({_id: id}, user);

      console.log(updateUser);

      return user;
    },
    deleteUser: async (_, {id}, {models}) => {
      const user = await models.User.findById(id);

      if (!user) {
        throw new Error('Usuário não encontrado!');        
      }

      const deleteUser = await models.User.deleteOne({_id: id})

      console.log(deleteUser);

      return user
    }
  }
};
