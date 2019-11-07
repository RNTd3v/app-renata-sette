"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});
var _replaceSpecialChars = require('../utils/replaceSpecialChars'); var _replaceSpecialChars2 = _interopRequireDefault(_replaceSpecialChars);

exports. default = {
  Query: {
    projects: (_, args, { models }) => models.Project.find(),
    projectsAuth: (_, args, { models }) => models.Project.find(),
    projectByCodePT: (_, { codePT }, { models }) => models.Project.findOne({ codePT }),
    projectByCodeEN: (_, { codeEN }, { models }) => models.Project.findOne({ codeEN }),
    project: (_, { id }, { models }) =>
      models.Project.findById(id),
    projectAuth: (_, { id }, { models }) =>
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
        icon
      },
      { models }
    ) => {
      // create a new project
      const newProject = new models.Project({
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
        icon
      },
      { models }
    ) => {
      const project = await models.Project.findById(id)

      if (!project) {
        throw new Error('Projeto não encontrado!')
      }

      const newProject = {
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

      await models.Project.updateOne({ _id: id }, newProject)

      newProject.id = id

      return newProject
    },
    deleteProject: async (_, { id }, { models }) => {
      const project = await models.Project.findById(id)

      if (!project) {
        throw new Error('Projeto não encontrado!')
      }

      await models.Project.deleteOne({ _id: id })

      return project
    }
  }
}
