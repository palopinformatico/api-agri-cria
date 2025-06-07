const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
require('dotenv').config();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors()); // Preflight

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', protectedRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
