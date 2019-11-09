import { Schema, model, Document } from 'mongoose'

interface ProjectInterface extends Document {
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

export interface ProjectModel {
  id?: string;
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

const ProjectSchema = new Schema({
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

export default model<ProjectInterface>('Project', ProjectSchema)
