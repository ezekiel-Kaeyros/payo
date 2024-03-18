import mongoose, { ConnectOptions } from 'mongoose';


export const initDb = async (): Promise<any> => {
    let database_url = process.env.MONGO_URL
  try {
    const db = await mongoose.connect(database_url, {
    } as ConnectOptions);
    console.log(`DB connected`);
    return db;
  } catch (error) {
    console.error('DB connection failed', error);
    process.exit(1);
  }
};
