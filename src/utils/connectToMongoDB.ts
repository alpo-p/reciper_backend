import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

export const connectToMongoDB = async () => {
  const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI as string
    : process.env.MONGODB_URI as string;

  console.log('Connecting to MongoDB');

  const mongoConfig = { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  };

  await mongoose.connect(MONGODB_URI, mongoConfig)
    .then(() => {
      console.log(`Connected to MongoDB`);
    })
    .catch((e) => {
      console.log('Error connecting to MongoDB', e?.message);
    });
};
