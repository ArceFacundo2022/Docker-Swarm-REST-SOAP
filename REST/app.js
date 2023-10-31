const express = require('express');
const mysql = require('mysql2'); // Importa la versión no Promise de mysql2
const app = express();

// Crea una conexión con la base de datos usando mysql2
const connection = mysql.createConnection({
  host: 'base-datos_base-datos',
  user: 'root',
  password: 'root1',
  database: 'prueba'
});

app.get('/consultarAlumnosPorApellido', async (req, res) => {
  try {
    const query = "SELECT apellidos, nombres, dni, nota FROM prueba.alumnos ORDER BY nombres";
    const [rows, fields] = await connection.promise().query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error al consultar la base de datos: ', error);
    res.status(500).json({ error: 'Error al consultar la base de datos' });
  }
});

app.get('/consultarAlumnosPorNota', async (req, res) => {
  try {
    const query = "SELECT apellidos, nombres, dni, nota FROM prueba.alumnos ORDER BY nota";
    const [rows, fields] = await connection.promise().query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error al consultar la base de datos: ', error);
    res.status(500).json({ error: 'Error al consultar la base de datos' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor REST escuchando en el puerto ${PORT}`);
});