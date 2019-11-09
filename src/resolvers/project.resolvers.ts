import { ProjectModel } from '../db/schemas/Project'
import ReplaceSpecialChars from '../utils/replaceSpecialChars'

export default {
  Query: {
    projects: (_, args, { models }): Promise<ProjectModel[]> => models.Project.find(),
    projectsAuth: (_, args, { models }): Promise<ProjectModel[]> => models.Project.find(),
    projectByCodePT: (_, { codePT }, { models }): Promise<ProjectModel> => models.Project.findOne({ codePT }),
    projectByCodeEN: (_, { codeEN }, { models }): Promise<ProjectModel> => models.Project.findOne({ codeEN }),
    project: (_, { id }, { models }): Promise<ProjectModel> =>
      models.Project.findById(id),
    projectAuth: (_, { id }, { models }): Promise<ProjectModel> =>
      models.Project.findById(id)
  },
  Mutation: {
    createProject: async (
      _,
      {
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
    ): Promise<ProjectModel> => {
      // create a new project
      const newProject = new models.Project({
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

      let projectRegistered

      // save the project
      try {
        projectRegistered = await newProject.save()
      } catch (e) {
        throw new Error('Cannot Save Project!')
      }

      return projectRegistered
    },
    updateProject: async (
      _,
      {
        id,
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
    ): Promise<ProjectModel> => {
      const project = await models.Project.findById(id)

      if (!project) {
        throw new Error('Projeto não encontrado!')
      }

      const newProject: ProjectModel = {
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

      await models.Project.updateOne({ _id: id }, newProject)

      newProject.id = id

      return newProject
    },
    updateOrderProject: async (
      _,
      {
        id,
        order_by
      },
      { models }
    ): Promise<any> => {
      const project = await models.Project.findById(id)
      if (!project) {
        throw new Error('Work não encontrada!')
      }
      await models.Project.updateOne({ _id: id }, {order_by})
      const newProject = {
        ...project,
        order_by
      }
      return newProject
    },
    deleteProject: async (_, { id }, { models }): Promise<ProjectModel> => {
      const project = await models.Project.findById(id)

      if (!project) {
        throw new Error('Projeto não encontrado!')
      }

      await models.Project.deleteOne({ _id: id })

      return project
    }
  }
}
