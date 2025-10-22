// import mongoose from 'mongoose';

// const connectDB =async()=>{
//     try {
//         mongoose.connection.on('connected',()=>console.log("DataBase Connected")
       
//         );
//          await mongoose.connect(`${process.env.MONGODB_URI}/greencart`)
//     }catch(error){
//             console.error(error.message);
            
//     }

// }

// export default connectDB;

import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI is not defined');
    process.exit(1);
  }

  try {
    mongoose.connection.once('open', () => console.log('MongoDB connected'));
    mongoose.connection.on('error', (err) => console.error('MongoDB error:', err?.message || err));

    await mongoose.connect(uri, {
      dbName: 'greencart',          // instead of appending /greencart
      serverSelectionTimeoutMS: 5000,
    });

    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection failed:', error?.message || error);
    process.exit(1);
  }
};

export default connectDB;