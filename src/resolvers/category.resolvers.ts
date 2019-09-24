import { CategoryModel } from '../db/schemas/Category'
import ReplaceSpecialChars from '../utils/replaceSpecialChars'

export default {
  Query: {
    categories: (_, args, { models }): Promise<CategoryModel[]> => models.Category.find(),
    categoriesAuth: (_, args, { models }): Promise<CategoryModel[]> => models.Category.find(),
    categoryByCodePT: (_, { codePT }, { models }): Promise<CategoryModel> => models.Category.findOne({codePT}),
    categoryByCodeEN: (_, { codeEN }, { models }): Promise<CategoryModel> => models.Category.findOne({codeEN}),
    category: (_, { id }, { models }): Promise<CategoryModel> => models.Category.findById(id)
  },
  Mutation: {
    createCategory: async (_, { namePT, nameEN, icon }, { models }) : Promise<CategoryModel> => {
      // create a new category
      const newCategory = new models.Category({
        namePT,
        nameEN,
        codePT: ReplaceSpecialChars(namePT),
        codeEN: ReplaceSpecialChars(nameEN),
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
    updateCategory: async (_, { id, namePT, nameEN, icon }, { models }): Promise<CategoryModel> => {
      const category = await models.Category.findById(id)

      if (!category) {
        throw new Error('Categoria não encontrada!')
      }

      const newCategory: CategoryModel = {
        namePT,
        nameEN,
        codePT: ReplaceSpecialChars(namePT),
        codeEN: ReplaceSpecialChars(nameEN),
        icon
      }

      await models.Category.updateOne({ _id: id }, newCategory)

      newCategory.id = id

      return newCategory
    },
    deleteCategory: async (_, { id }, { models }) : Promise<CategoryModel> => {
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
