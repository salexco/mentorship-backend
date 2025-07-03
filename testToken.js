require('dotenv').config();
const jwt = require('jsonwebtoken');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NWVlYWFhNTVlN2YwMWFiNjNkYzlmMyIsInJvbGUiOiJtZW50ZWUiLCJpYXQiOjE3NTEyNzcyMjl9.LRvwIgTDvhRxAwl8MTmYceYz2o7xAeZTUWWzyeiid88';

try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("Token decoded successfully:", decoded);
} catch (err) {
  console.log("Token verification failed:", err.message);
}