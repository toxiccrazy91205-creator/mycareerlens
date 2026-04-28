module.exports = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/mycareerlens',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000'
};