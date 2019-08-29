import { Schema, model, Document } from 'mongoose'

export interface UserInterface extends Document {
  name: string;
  email: string;
  password?: string;
  created: Date;
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 80,
    minlength: 3
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
})

export default model<UserInterface>('User', UserSchema)
