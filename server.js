require('dotenv').config();
console.log("MONGO_URI is:", process.env.MONGO_URI);

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const commentRoutes = require('./routes/comments');
const mentorRoutes = require('./routes/mentors');
const menteeRoutes = require('./routes/mentees');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Updated CORS configuration
app.use(cors({
  origin: ['https://mentorship-frontend-ol26.onrender.com'],
  credentials: true
}));

app.use(express.json());

// Test route
app.get('/mentors-test', (req, res) => {
  res.send('Mentors test route is working');
});

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/mentors', require('./routes/mentors'));
app.use('/mentees', require('./routes/mentees'));
app.use('/requests', require('./routes/requests'));
app.use('/availability', require('./routes/availability'));
app.use('/sessions', require('./routes/sessions'));
app.use('/admin', require('./routes/admin'));
app.use('/comments', commentRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Mentorship App Backend is running!');
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected!');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.log(err));
