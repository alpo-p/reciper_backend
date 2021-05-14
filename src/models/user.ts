/* eslint-disable @typescript-eslint/no-explicit-any */
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
  }
});

schema.set('toJSON', {
  transform: (_document: any, returnedObject: any) => {
    delete returnedObject.__v;
    delete returnedObject.password;
  }
});

schema.plugin(uniqueValidator);
export default mongoose.model<IUser>('MUser', schema);