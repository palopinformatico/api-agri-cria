const express = require('express');
const router = express.Router();
const db = require('../db'); // conexión MySQL
const authenticateToken = require('../middlewares/authMiddleware');

// POST para guardar reporte
router.post('/', authenticateToken, (req, res) => {
  const {
    filtro,
    tipoActividad,
    area,
    volumen,
    duracion,
    humedad,
    costo
  } = req.body;

  const sql = `
    INSERT INTO reportes (filtro, tipoActividad, area, volumen, duracion, humedad, costo)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [filtro, tipoActividad, area, volumen, duracion, humedad, costo], (err, result) => {
    if (err) {
      console.error('Error al insertar el reporte:', err);
      return res.status(500).json({ error: 'Error al guardar el reporte' });
    }

    res.status(201).json({ message: 'Reporte guardado correctamente' });
  });
});

module.exports = router;
