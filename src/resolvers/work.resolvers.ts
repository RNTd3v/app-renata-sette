import { WorkModel } from '../db/schemas/Work'
import ReplaceSpecialChars from '../utils/replaceSpecialChars'

export default {
  Query: {
    works: (_, args, { models }): Promise<WorkModel[]> => models.Work.find(),
    worksByCategory: (_, { categoryID }, { models }): Promise<WorkModel[]> => models.Work.find({ categoryID }),
    worksByCategoryAuth: (_, { categoryID }, { models }): Promise<WorkModel[]> => models.Work.find({ categoryID }),
    workByCodePT: (_, { codePT }, { models }): Promise<WorkModel> => models.Work.findOne({ codePT }),
    workByCodeEN: (_, { codeEN }, { models }): Promise<WorkModel> => models.Work.findOne({ codeEN }),
    work: (_, { id }, { models }): Promise<WorkModel> =>
      models.Work.findById(id),
    workAuth: (_, { id }, { models }): Promise<WorkModel> =>
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
        icon,
        order_by
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
        icon,
        order_by
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
        icon,
        order_by
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
        icon,
        order_by
      }

      await models.Work.updateOne({ _id: id }, newWork)

      newWork.id = id

      return newWork
    },
    updateOrderWork: async (
      _,
      {
        id,
        order_by
      },
      { models }
    ): Promise<any> => {
      const work = await models.Work.findById(id)
      if (!work) {
        throw new Error('Work não encontrada!')
      }
      await models.Work.updateOne({ _id: id }, {order_by})
      const newWork = {
        ...work,
        order_by
      }
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
