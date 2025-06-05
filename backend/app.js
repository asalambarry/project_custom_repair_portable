const express = require('express');
const app = express();
const contactRoutes = require('./routes/contact');

app.use('/api/contact', contactRoutes);


module.exports = app;