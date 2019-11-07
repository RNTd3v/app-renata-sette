"use strict";Object.defineProperty(exports, "__esModule", {value: true});

exports. default = {
  Query: {
    bios: (_, args, { models }) => models.Bio.find(),
    biosAuth: (_, args, { models }) => models.Bio.find(),
    bio: (_, { id }, { models }) => models.Bio.findById(id)
  },
  Mutation: {
    createBio: async (_, { titlePT, titleEN, contentPT, contentEN }, { models }) => {
      // create a new bio
      const newBio = new models.Bio({
        titlePT,
        titleEN,
        contentPT,
        contentEN
      })

      let bioRegistered

      // save the bio
      try {
        bioRegistered = await newBio.save()
      } catch (e) {
        throw new Error('Cannot Save Bio!')
      }

      return bioRegistered
    },
    updateBio: async (_, { id, titlePT, titleEN, contentPT, contentEN }, { models }) => {
      const bio = await models.Bio.findById(id)

      if (!bio) {
        throw new Error('Bio não encontrada!')
      }

      const newBio = {
        titlePT,
        titleEN,
        contentPT,
        contentEN
      }

      await models.Bio.updateOne({ _id: id }, newBio)

      newBio.id = id

      return newBio
    },
    deleteBio: async (_, { id }, { models }) => {
      const bio = await models.Bio.findById(id)

      if (!bio) {
        throw new Error('Bio não encontrado!')
      }

      await models.Bio.deleteOne({ _id: id })

      return bio
    }
  }
}
