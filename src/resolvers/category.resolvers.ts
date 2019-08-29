import { CategoryModel } from '../db/schemas/Category'

export default {
  Query: {
    categories: (_, args, { models }): Promise<CategoryModel[]> => models.Category.find(),
    category: (_, { id }, { models }): Promise<CategoryModel> => models.Category.findById(id)
  },
  Mutation: {
    createCategory: async (_, { namePT, nameEN, icon }, { models }) : Promise<CategoryModel> => {
      // create a new category
      const newCategory = new models.Category({
        namePT,
        nameEN,
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
