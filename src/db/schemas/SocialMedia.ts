import { Schema, model, Document } from 'mongoose'

interface SocialMediaInterface extends Document {
  name: string;
  icon: string;
  url: string;
}

export interface SocialMediaModel {
  id?: string;
  name: string;
  icon: string;
  url: string;
}

const SocialMediaSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  url: {
    type: String
  }
})

export default model<SocialMediaInterface>('SocialMedia', SocialMediaSchema)
