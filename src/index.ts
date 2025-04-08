// const express = require('express');
import express  from "express";

const bookroutes = require('./routes/bookroutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', bookroutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
