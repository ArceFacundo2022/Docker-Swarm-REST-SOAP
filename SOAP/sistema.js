const soap = require('strong-soap').soap;
const mysql = require('mysql');
const fs = require('fs');

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

const consultarAlumnos = (args, callback) => {
  const nombre = args.nombre;
  const query = "SELECT apellidos, nombres, dni, nota FROM prueba.alumnos WHERE nombres LIKE ? OR apellidos LIKE ?";
  connection.query(query, [`%${nombre}%`, `%${nombre}%`], (error, results) => {
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

//const xml = fs.readFileSync('consultarAlumnos.wsdl', 'utf8');
const path = require('path');
const xml = fs.readFileSync(path.resolve(__dirname, 'consultarAlumnos.wsdl'), 'utf8');

const server = soap.listen(require('http').createServer((req, res) => {
  res.end('404: Not Found: ' + req.url);
}), '/consultar_alumnos', xml, (service, port) => {
  port.on('consultarAlumnos', consultarAlumnos);
});

server.log = (type, data) => {
  console.log(type + ': ' + data);
};

server.listen(3555, () => {
  console.log('Servidor SOAP escuchando en el puerto 3555');
});
