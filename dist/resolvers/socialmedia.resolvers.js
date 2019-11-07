"use strict";Object.defineProperty(exports, "__esModule", {value: true});

exports. default = {
  Query: {
    socialMedia: (_, args, { models }) => models.SocialMedia.find(),
    socialMediaAuth: (_, args, { models }) => models.SocialMedia.find()
  },
  Mutation: {
    createSocialMedia: async (_, { name, icon, url }, { models }) => {
      // create a new socialMedia
      const newSocialMedia = new models.SocialMedia({
        name,
        icon,
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
    updateSocialMedia: async (_, {
 id, name,
      icon,
      url 
}, { models }) => {
      const socialMedia = await models.SocialMedia.findById(id)

      if (!socialMedia) {
        throw new Error('SocialMedia não encontrado!')
      }

      const newSocialMedia = {
        name,
        icon,
        url
      }

      await models.SocialMedia.updateOne({ _id: id }, newSocialMedia)

      newSocialMedia.id = id

      return newSocialMedia
    },
    deleteSocialMedia: async (_, { id }, { models }) => {
      const socialMedia = await models.SocialMedia.findById(id)

      if (!socialMedia) {
        throw new Error('SocialMedia não encontrado!')
      }

      await models.SocialMedia.deleteOne({ _id: id })

      return socialMedia
    }
  }
}
