import { WorkModel } from '../db/schemas/Work'
import ReplaceSpecialChars from '../utils/replaceSpecialChars'

export default {
  Query: {
    works: (_, args, { models }): Promise<WorkModel[]> => models.Work.find(),
    worksByCategory: (_, {categoryID}, { models }): Promise<WorkModel[]> => models.Work.find({categoryID}),
    workByCodePT: (_, { codePT }, { models }): Promise<WorkModel> => models.Work.findOne({codePT}),
    workByCodeEN: (_, { codeEN }, { models }): Promise<WorkModel> => models.Work.findOne({codeEN}),
    work: (_, { id }, { models }): Promise<WorkModel> =>
      models.Work.findById(id)
  },
  Mutation: {
    createWork: async (
      _,
      {
        categoryID,
        namePT,
        nameEN,
        descriptionPT,
        descriptionEN,
        date,
        picture,
        movie,
        icon
      },
      { models }
    ): Promise<WorkModel> => {
      // create a new work
      const newWork = new models.Work({
        categoryID,
        namePT,
        nameEN,
        codePT: ReplaceSpecialChars(namePT),
        codeEN: ReplaceSpecialChars(nameEN),
        descriptionPT,
        descriptionEN,
        date,
        picture,
        movie,
        icon
      })

      let workRegistered

      // save the work
      try {
        workRegistered = await newWork.save()
      } catch (e) {
        throw new Error('Cannot Save Work!')
      }

      return workRegistered
    },
    updateWork: async (
      _,
      {
        id,
        categoryID,
        namePT,
        nameEN,
        descriptionPT,
        descriptionEN,
        date,
        picture,
        movie,
        icon
      },
      { models }
    ): Promise<WorkModel> => {
      const work = await models.Work.findById(id)

      if (!work) {
        throw new Error('Work não encontrada!')
      }

      const newWork: WorkModel = {
        categoryID,
        namePT,
        nameEN,
        codePT: ReplaceSpecialChars(namePT),
        codeEN: ReplaceSpecialChars(nameEN),
        descriptionPT,
        descriptionEN,
        date,
        picture,
        movie,
        icon
      }

      await models.Work.updateOne({ _id: id }, newWork)

      newWork.id = id

      return newWork
    },
    deleteWork: async (_, { id }, { models }): Promise<WorkModel> => {
      const work = await models.Work.findById(id)

      if (!work) {
        throw new Error('Work não encontrado!')
      }

      await models.Work.deleteOne({ _id: id })

      return work
    }
  }
}
