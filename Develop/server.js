const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/api/userRoutes');
const thoughtRoutes = require('./routes/api/thoughtRoutes');
const reactionRoutes = require('./routes/api/reactionRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);
app.use('/api/reactions', reactionRoutes);

mongoose.connect('mongodb://localhost/social-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});