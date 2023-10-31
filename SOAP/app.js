const express = require('express');
const app = express();
const soap = require('soap');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'base-datos_base-datos',
  user: 'root',
  password: 'root1',
  database: 'prueba'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión: ', err);
    return;
  }
  console.log('Conexión a la base de datos exitosa!');
});

const consultarAlumnosPorNombre = (args, callback) => {
  const query = "SELECT apellidos, nombres, dni, nota FROM prueba.alumnos ORDER BY nombres";
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos: ', error);
      callback(error);
    } else {
      const alumnos = results.map(({ apellidos, nombres, dni, nota }) => ({
        apellidos,
        nombres,
        dni: dni.toString(),
        nota: nota.toString()
      }));
      callback(null, { alumnos });
    }
  });
};

const consultarAlumnosPorNota = (args, callback) => {
  const query = "SELECT apellidos, nombres, dni, nota FROM prueba.alumnos ORDER BY nota";
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos: ', error);
      callback(error);
    } else {
      const alumnos = results.map(({ apellidos, nombres, dni, nota }) => ({
        apellidos,
        nombres,
        dni: dni.toString(),
        nota: nota.toString()
      }));
      callback(null, { alumnos });
    }
  });
};

const wsdl = require('fs').readFileSync('consultarAlumnos.wsdl', 'utf8');

app.use(express.static(__dirname));

app.listen(3555, () => {
  console.log('Servidor SOAP escuchando en el puerto 3555');
});

const xml = require('fs').readFileSync('consultarAlumnos.wsdl', 'utf8');

const serviceObject = {
  ConsultarAlumnosService: {
    ConsultarAlumnosPort: {
      consultarAlumnosPorNombre: consultarAlumnosPorNombre,
      consultarAlumnosPorNota: consultarAlumnosPorNota,
    },
  },
};

soap.listen(app, '/consultar_alumnos', serviceObject, xml);
