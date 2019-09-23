import { Schema, model, Document } from 'mongoose'

interface ContactInterface extends Document {
  phone: string;
  cellPhone: string;
  email: string;
  email2: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  cep: string;
}

export interface ContactModel {
  id?: string;
  phone?: string;
  cellPhone?: string;
  email?: string;
  email2?: string;
  street?: string;
  number?: string;
  district?: string;
  city?: string;
  state?: string;
  cep?: string;
}

const ContactSchema = new Schema({
  phone: String,
  cellPhone: String,
  email: String,
  email2: String,
  street: String,
  number: String,
  district: String,
  city: String,
  state: String,
  cep: String,
  created: {
    type: Date,
    default: Date.now
  }
})

export default model<ContactInterface>('Contact', ContactSchema)
