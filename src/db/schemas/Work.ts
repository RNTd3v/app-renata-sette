import { Schema, model, Document } from 'mongoose'

interface WorkInterface extends Document {
  categoryID: string;
  namePT: string;
  nameEN: string;
  codePT: string;
  codeEN: string;
  descriptionPT: string;
  descriptionEN: string;
  date: string;
  picture: string;
  movie: string;
  icon: string;
  order_by?: number;
}

export interface WorkModel {
  id?: string;
  categoryID: string;
  namePT: string;
  nameEN: string;
  codePT: string;
  codeEN: string;
  descriptionPT: string;
  descriptionEN: string;
  date: string;
  picture: string;
  movie: string;
  icon: string;
  order_by?: number;
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
  codePT: String,
  codeEN: String,
  descriptionPT: String,
  descriptionEN: String,
  date: String,
  picture: String,
  movie: String,
  icon: String,
  order_by: Number
})

export default model<WorkInterface>('Work', WorkSchema)
