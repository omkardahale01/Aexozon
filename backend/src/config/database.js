import mongoose from 'mongoose';

/**
 * Database Configuration
 * 
 * This module handles database connections. Currently configured for MongoDB,
 * but designed to be easily swappable with other databases.
 */

// MongoDB Connection
export const connectMongoDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/santosh_portfolio';
    
    const conn = await mongoose.connect(mongoURI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database Name: ${conn.connection.name}`);
    
    return conn;
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

// Generic database connection (can be swapped)
export const connectDB = async () => {
  const dbType = process.env.DB_TYPE || 'mongodb';
  
  switch (dbType.toLowerCase()) {
    case 'mongodb':
      return await connectMongoDB();
    default:
      console.log(`Database type '${dbType}' not supported. Using MongoDB as default.`);
      return await connectMongoDB();
  }
};

// Disconnect from database
export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('Database disconnected successfully');
  } catch (error) {
    console.error('Database disconnection error:', error.message);
  }
};

// Check database connection status
export const getDBStatus = () => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  
  return states[mongoose.connection.readyState] || 'unknown';
};

export default connectDB;
