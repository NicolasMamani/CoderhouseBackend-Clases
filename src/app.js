// const http = require('http');

// const server = http.createServer((req, res) => {
//   res.end('Mi primer servidor');
// });

const PUERTO = 8080;

// server.listen(PUERTO, () => {
//   console.log('Estamos en escucha');
// });

const express = require('express');
// creamos una app
const app = express();

// creamos una ruta
app.get('/', (req, res) => {
  res.send('Mi primer servidor con Express');
});

app.listen(PUERTO, () => {
  console.log('Escuchando en el LocalHost');
});

// creamos otra ruta
app.get('/tienda', (req, res) => {
  res.send('Bienvenido a nuestra tienda');
});

app.get('/contacto', (req, res) => {
  res.send('Bienvenidos a contacto');
});

const misProductos = [
  { id: 1, nombre: 'fideos', precio: 150 },
  { id: 2, nombre: 'arroz', precio: 200 },
  { id: 3, nombre: 'aceite', precio: 900 },
];

app.get('/productos/:id', (req, res) => {
  //res.send(misProductos);
  let id = req.params.id;
  const producto = misProductos.find((item) => item.id == id);
  producto ? res.send(producto) : res.send('Producto no encontrado');
});

app.use(express.urlencoded({ extended: true }));

app.get('/clientes', (req, res) => {
  let { nombre, apellido } = req.query;
  res.send(`Bienvenido ${nombre} ${apellido}`);
});

// para el límite voy a trabajar con query
app.get('/product', (req, res) => {
  let limit = parseInt(req.query.limit);
  const productos = misProductos.slice(0, limit);
  res.send(productos);
});
