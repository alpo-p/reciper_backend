import mongoose from 'mongoose';

export const dbconfig = () => {
  const MONGODB_URI = process.env.MONGODB_URI as string;

  console.log('Connecting to mongodb');

  const mongoConfig = { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  };

  mongoose.connect(MONGODB_URI, mongoConfig)
    .then(() => {
      console.log('Monnected to MongoDB');
    })
    .catch((e) => {
      console.log('Error connecting to MongoDB', e?.message);
    });
};
