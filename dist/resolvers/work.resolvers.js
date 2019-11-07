"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});
var _replaceSpecialChars = require('../utils/replaceSpecialChars'); var _replaceSpecialChars2 = _interopRequireDefault(_replaceSpecialChars);

exports. default = {
  Query: {
    works: (_, args, { models }) => models.Work.find(),
    worksByCategory: (_, { categoryID }, { models }) => models.Work.find({ categoryID }),
    worksByCategoryAuth: (_, { categoryID }, { models }) => models.Work.find({ categoryID }),
    workByCodePT: (_, { codePT }, { models }) => models.Work.findOne({ codePT }),
    workByCodeEN: (_, { codeEN }, { models }) => models.Work.findOne({ codeEN }),
    work: (_, { id }, { models }) =>
      models.Work.findById(id),
    workAuth: (_, { id }, { models }) =>
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
    ) => {
      // create a new work
      const newWork = new models.Work({
        categoryID,
        namePT,
        nameEN,
        codePT: _replaceSpecialChars2.default.call(void 0, namePT),
        codeEN: _replaceSpecialChars2.default.call(void 0, nameEN),
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
    ) => {
      const work = await models.Work.findById(id)

      if (!work) {
        throw new Error('Work não encontrada!')
      }

      const newWork = {
        categoryID,
        namePT,
        nameEN,
        codePT: _replaceSpecialChars2.default.call(void 0, namePT),
        codeEN: _replaceSpecialChars2.default.call(void 0, nameEN),
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
    deleteWork: async (_, { id }, { models }) => {
      const work = await models.Work.findById(id)

      if (!work) {
        throw new Error('Work não encontrado!')
      }

      await models.Work.deleteOne({ _id: id })

      return work
    }
  }
}
