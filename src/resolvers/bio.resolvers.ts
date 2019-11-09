import { BioModel } from '../db/schemas/Bio'

export default {
  Query: {
    bios: (_, args, { models }): Promise<BioModel[]> => models.Bio.find(),
    biosAuth: (_, args, { models }): Promise<BioModel[]> => models.Bio.find(),
    bio: (_, { id }, { models }): Promise<BioModel> => models.Bio.findById(id)
  },
  Mutation: {
    createBio: async (_, { titlePT, titleEN, contentPT, contentEN, picture }, { models }) : Promise<BioModel> => {
      // create a new bio
      const newBio = new models.Bio({
        titlePT,
        titleEN,
        contentPT,
        contentEN,
        picture
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
    updateBio: async (_, { id, titlePT, titleEN, contentPT, contentEN, picture }, { models }): Promise<BioModel> => {
      const bio = await models.Bio.findById(id)

      if (!bio) {
        throw new Error('Bio não encontrada!')
      }

      const newBio: BioModel = {
        titlePT,
        titleEN,
        contentPT,
        contentEN, 
        picture
      }

      await models.Bio.updateOne({ _id: id }, newBio)

      newBio.id = id

      return newBio
    },
    deleteBio: async (_, { id }, { models }) : Promise<BioModel> => {
      const bio = await models.Bio.findById(id)

      if (!bio) {
        throw new Error('Bio não encontrado!')
      }

      await models.Bio.deleteOne({ _id: id })

      return bio
    }
  }
}
