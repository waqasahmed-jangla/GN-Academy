import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Validate environment variable
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI not defined in .env');
    }

    // Connect with additional configuration
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Connection event listeners
    conn.connection.on('connected', () => {
      console.log('Mongoose connected to DB');
    });

    conn.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });

  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};
export default connectDB;