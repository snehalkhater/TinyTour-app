import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGOODB_URL);
        if (conn) {
            console.log('Connected to MongoDB');
        }
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};

export default connectDB;