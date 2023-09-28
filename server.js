const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', thoughtRoutes);

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
