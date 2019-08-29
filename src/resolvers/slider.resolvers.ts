import { SliderModel } from '../db/schemas/Slider'

export default {
  Query: {
    slider: (_, args, { models }): Promise<SliderModel[]> => models.Slider.find()
  },
  Mutation: {
    createSlider: async (_, { titlePT, titleEN, url }, { models }) : Promise<SliderModel> => {
      // create a new slider
      const newSlider = new models.Slider({
        titlePT,
        titleEN,
        url
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
    updateSlider: async (_, { id, titlePT, titleEN, url }, { models }): Promise<SliderModel> => {
      const slider = await models.Slider.findById(id)

      if (!slider) {
        throw new Error('Slider não encontrado!')
      }

      const newSlider: SliderModel = {
        titlePT,
        titleEN,
        url
      }

      await models.Slider.updateOne({ _id: id }, newSlider)

      newSlider.id = id

      return newSlider
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
