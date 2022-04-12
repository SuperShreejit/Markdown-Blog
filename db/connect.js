const mongoose = require('mongoose')

const connectDB = async (url) => {
  const connect = await mongoose.connect(url)
  if (!connect)
    throw new Error('Failed to connect MongoDB')
  else
    return console.log('Database Connected')
}

module.exports = connectDB