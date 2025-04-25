require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/ram-career-app',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_here',
  jwtExpiration: process.env.JWT_EXPIRATION || '7d'
};
