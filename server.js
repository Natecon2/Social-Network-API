// server.js

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Use the user and thought routes
app.use('/api', userRoutes); // Prefix user routes with '/api'
app.use('/api', thoughtRoutes); // Prefix thought routes with '/api'

// Connect to MongoDB
mongoose.connect('mongodb://localhost/social-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB database');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});