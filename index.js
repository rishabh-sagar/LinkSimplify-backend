// index.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const authRoutes = require('./app/routes/authRoutes');
const linkRoutes = require('./app/routes/linkRoutes');
const cors = require('cors')
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/links', linkRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
