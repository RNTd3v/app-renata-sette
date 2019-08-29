import { SocialMediaModel } from '../db/schemas/SocialMedia'

export default {
  Query: {
    socialMedia: (_, args, { models }): Promise<SocialMediaModel[]> => models.SocialMedia.find()
  },
  Mutation: {
    createSocialMedia: async (_, { titlePT, titleEN, url }, { models }) : Promise<SocialMediaModel> => {
      // create a new socialMedia
      const newSocialMedia = new models.SocialMedia({
        titlePT,
        titleEN,
        url
      })

      let socialMediaRegistered

      // save the socialMedia
      try {
        socialMediaRegistered = await newSocialMedia.save()
      } catch (e) {
        throw new Error('Cannot Save SocialMedia!')
      }

      return socialMediaRegistered
    },
    updateSocialMedia: async (_, { id, titlePT, titleEN, url }, { models }): Promise<SocialMediaModel> => {
      const socialMedia = await models.SocialMedia.findById(id)

      if (!socialMedia) {
        throw new Error('SocialMedia não encontrado!')
      }

      const newSocialMedia: SocialMediaModel = {
        titlePT,
        titleEN,
        url
      }

      await models.SocialMedia.updateOne({ _id: id }, newSocialMedia)

      newSocialMedia.id = id

      return newSocialMedia
    },
    deleteSocialMedia: async (_, { id }, { models }) : Promise<SocialMediaModel> => {
      const socialMedia = await models.SocialMedia.findById(id)

      if (!socialMedia) {
        throw new Error('SocialMedia não encontrado!')
      }

      await models.SocialMedia.deleteOne({ _id: id })

      return socialMedia
    }
  }
}
