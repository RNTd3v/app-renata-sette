import mongoose from 'mongoose';
import User from './schemas/User';

mongoose.Promise = global.Promise;

export const startDB = ({ user, pwd, url, db }) => mongoose.connect(`mongodb://${user}:${pwd}@${url}/${db}?authSource=admin`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

export const models = {
  User,
}