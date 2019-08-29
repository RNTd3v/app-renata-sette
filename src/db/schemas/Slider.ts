import { Schema, model, Document } from 'mongoose'

interface SliderInterface extends Document {
  titlePT: string;
  titleEN: string;
  url: string;
}

export interface SliderModel {
  id?: string;
  titlePT: string;
  titleEN: string;
  url: string;
}

const SliderSchema = new Schema({
  titlePT: {
    type: String,
    required: true
  },
  titleEN: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
})

export default model<SliderInterface>('Slider', SliderSchema)
