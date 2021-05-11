import mongoose from 'mongoose';

export const dbconfig = () => {
  const MONGODB_URI = process.env.MONGODB_URI as string;

  console.log('connecting to mongodb');

  const mongoConfig = { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  mongoose.connect(MONGODB_URI, mongoConfig)
    .then(() => {
      console.log('Monnected to MongoDB');
    })
    .catch((e) => {
      console.log('Error connecting to MongoDB', e?.message);
    });
};
