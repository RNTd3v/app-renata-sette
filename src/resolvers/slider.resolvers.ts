import { SliderModel } from '../db/schemas/Slider'

export default {
  Query: {
    slider: (_, args, { models }): Promise<SliderModel[]> => models.Slider.find(),
    sliderAuth: (_, args, { models }): Promise<SliderModel[]> => models.Slider.find(),
    sliderAuthByID: (_, { id }, { models }): Promise<SliderModel> =>
      models.Slider.findById(id)
  },
  Mutation: {
    createSlider: async (_, {
      titlePT, titleEN, picture, linkPT,
      linkEN
    }, { models }) : Promise<SliderModel> => {
      // create a new slider
      const newSlider = new models.Slider({
        titlePT,
        titleEN,
        picture,
        linkPT,
        linkEN
      })

      let sliderRegistered

      // save the slider
      try {
        sliderRegistered = await newSlider.save()
      } catch (e) {
        throw new Error('Cannot Save Slider!')
      }

      return sliderRegistered
    },
    updateSlider: async (_, {
      id, titlePT, titleEN, picture, linkPT,
      linkEN
    }, { models }): Promise<SliderModel> => {
      const slider = await models.Slider.findById(id)

      if (!slider) {
        throw new Error('Slider não encontrado!')
      }

      const newSlider: SliderModel = {
        titlePT,
        titleEN,
        picture,
        linkPT,
        linkEN
      }

      await models.Slider.updateOne({ _id: id }, newSlider)

      const updateSlider = {
        ...newSlider,
        id
      }

      return updateSlider
    },
    deleteSlider: async (_, { id }, { models }) : Promise<SliderModel> => {
      const slider = await models.Slider.findById(id)

      if (!slider) {
        throw new Error('Slider não encontrado!')
      }

      await models.Slider.deleteOne({ _id: id })

      return slider
    }
  }
}
