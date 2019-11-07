"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});
var _replaceSpecialChars = require('../utils/replaceSpecialChars'); var _replaceSpecialChars2 = _interopRequireDefault(_replaceSpecialChars);

exports. default = {
  Query: {
    categories: (_, args, { models }) => models.Category.find(),
    categoriesAuth: (_, args, { models }) => models.Category.find(),
    categoryByCodePT: (_, { codePT }, { models }) => models.Category.findOne({ codePT }),
    categoryByCodeEN: (_, { codeEN }, { models }) => models.Category.findOne({ codeEN }),
    category: (_, { id }, { models }) => models.Category.findById(id),
    categoryAuth: (_, { id }, { models }) => models.Category.findById(id)
  },
  Mutation: {
    createCategory: async (_, { namePT, nameEN, icon }, { models }) => {
      // create a new category
      const newCategory = new models.Category({
        namePT,
        nameEN,
        codePT: _replaceSpecialChars2.default.call(void 0, namePT),
        codeEN: _replaceSpecialChars2.default.call(void 0, nameEN),
        icon
      })

      let categoryRegistered

      // save the category
      try {
        categoryRegistered = await newCategory.save()
      } catch (e) {
        throw new Error('Cannot Save Category!')
      }

      return categoryRegistered
    },
    updateCategory: async (_, { id, namePT, nameEN, icon }, { models }) => {
      const category = await models.Category.findById(id)

      if (!category) {
        throw new Error('Categoria não encontrada!')
      }

      const newCategory = {
        namePT,
        nameEN,
        codePT: _replaceSpecialChars2.default.call(void 0, namePT),
        codeEN: _replaceSpecialChars2.default.call(void 0, nameEN),
        icon
      }

      await models.Category.updateOne({ _id: id }, newCategory)

      newCategory.id = id

      return newCategory
    },
    deleteCategory: async (_, { id }, { models }) => {
      const category = await models.Category.findById(id)

      if (!category) {
        throw new Error('Categoria não encontrada!')
      }

      const deleteCategory = await models.Category.deleteOne({ _id: id })

      console.log(deleteCategory)

      return category
    }
  }
}
