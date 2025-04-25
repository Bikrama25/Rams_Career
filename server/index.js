const app = require('./server');
const mongoose = require('mongoose');
const config = require('./config/config');

// Connect to MongoDB
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(() => {
  console.log('Connected to MongoDB');
  // Start the server after successful DB connection
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
})
.catch(err => {
  console.error('Database connection error:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
