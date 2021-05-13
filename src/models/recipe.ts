import mongoose, { Schema } from 'mongoose';
import { IRecipe } from '../types';

const schema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  preparationTimeInMinutes: {
    type: Number,
    required: true
  },
  numberOfServings: {
    type: Number,
    required: true
  },
  shortDescription: {
    type: String,
    required: true,
    maxlength: 50,
  },
  longDescription: {
    type: String,
    required: true,
    maxlength: 500,
  },
  tags: [{ type: String }],
  ingredients: [{ type: String }],
  stepByStepDirections: [{ type: String }]
});

export default mongoose.model<IRecipe>('Recipe', schema);