const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    console.log(`MongoDB Connect: ${conn.connection.host} `)
}

module.exports = connectDB;