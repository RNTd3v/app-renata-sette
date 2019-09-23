import { MediaModel } from '../db/schemas/Media'

export default {
  Query: {
    medias: (_, args, { models }): Promise<MediaModel[]> => models.Media.find(),
    mediasByWork: (_, {workID}, { models }): Promise<MediaModel[]> => models.Media.find({workID}),
    media: (_, { id }, { models }): Promise<MediaModel> => models.Media.findById(id)
  },
  Mutation: {
    createMedia: async (_, { workID, titlePT, titleEN, url, isMovie }, { models }) : Promise<MediaModel> => {
      // create a new media
      const newMedia = new models.Media({
        workID,
        titlePT,
        titleEN,
        isMovie,
        url
      })

      let mediaRegistered

      // save the media
      try {
        mediaRegistered = await newMedia.save()
      } catch (e) {
        throw new Error('Cannot Save Media!')
      }

      return mediaRegistered
    },
    updateMedia: async (_, { id, workID, titlePT, titleEN, url, isMovie }, { models }): Promise<MediaModel> => {
      const media = await models.Media.findById(id)

      if (!media) {
        throw new Error('Media não encontrada!')
      }

      const newMedia: MediaModel = {
        workID,
        titlePT,
        titleEN,
        isMovie,
        url
      }

      await models.Media.updateOne({ _id: id }, newMedia)

      newMedia.id = id

      return newMedia
    },
    deleteMedia: async (_, { id }, { models }) : Promise<MediaModel> => {
      const media = await models.Media.findById(id)

      if (!media) {
        throw new Error('Media não encontrado!')
      }

      await models.Media.deleteOne({ _id: id })

      return media
    }
  }
}
