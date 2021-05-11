import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { IUser } from '../types';

const schema: Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  }
});

schema.plugin(uniqueValidator);
export default mongoose.model<IUser>('MAuthUser', schema);