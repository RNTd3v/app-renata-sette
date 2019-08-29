import { Schema, model, Document } from 'mongoose'

interface WorkInterface extends Document {
  categoryID: string;
  namePT: string;
  nameEN: string;
  descriptionPT: string;
  descriptionEN: string;
  date: string;
  picture: string;
  movie: string;
  icon: string;
}

export interface WorkModel {
  id?: string;
  categoryID: string;
  namePT: string;
  nameEN: string;
  descriptionPT: string;
  descriptionEN: string;
  date: string;
  picture: string;
  movie: string;
  icon: string;
}

const WorkSchema = new Schema({
  categoryID: {
    type: String,
    required: true
  },
  namePT: {
    type: String,
    required: true
  },
  nameEN: {
    type: String,
    required: true
  },
  descriptionPT: String,
  descriptionEN: String,
  date: String,
  picture: String,
  movie: String,
  icon: String
})

export default model<WorkInterface>('Work', WorkSchema)
