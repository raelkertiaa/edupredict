const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root Route 
app.get('/', (req, res) => {
  res.send('Test API');
});

// Run Server
app.listen(port, () => {
  console.log(`Server nyala dan jalan di http://localhost:${port}`);
});