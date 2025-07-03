require('dotenv').config();
console.log("MONGO_URI is:", process.env.MONGO_URI);
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.get('/mentors-test', (req, res) => {
  res.send('Mentors test route is working');
});
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/mentors', require('./routes/mentors'));
app.use('/requests', require('./routes/requests'));
app.use('/availability', require('./routes/availability'));
app.use('/sessions', require('./routes/sessions'));
app.use('/admin', require('./routes/admin'));
app.get('/', (req, res) => {
  res.send('Mentorship App Backend is running!');
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB connected!');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => console.log(err));