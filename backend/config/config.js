import dotenv from 'dotenv';
// import path from 'path'

// dotenv.config({ path: path.join(__dirname, './.env') });
dotenv.config();

export default {
    MONGODB_URL:process.env.MONGODB_URL
}