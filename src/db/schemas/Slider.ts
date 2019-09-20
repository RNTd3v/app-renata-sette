import { Schema, model, Document } from 'mongoose'

interface SliderInterface extends Document {
  titlePT: string;
  titleEN: string;
  linkPT: string;
  linkEN: string;
  picture: string;
}

export interface SliderModel {
  titlePT: string;
  titleEN: string;
  linkPT: string;
  linkEN: string;
  picture: string;
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
  picture: {
    type: String,
    required: true
  },
  linkPT: String,
  linkEN: String
})

export default model<SliderInterface>('Slider', SliderSchema)
