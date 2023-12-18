const express = require("express");
const app = express();
const PUERTO = 8080;

const clientes = [
  {
    id: "1",
    nombre: "Lionel",
    apellido: "Messi",
  },
  {
    id: "2",
    nombre: "Fideo",
    apellido: "Di maría",
  },
  {
    id: "3",
    nombre: "Dibu",
    apellido: "Martinez",
  },
];

// ruta raiz
app.get("/", (req, res) => {
  res.send(clientes);
});

app.use(express.json());

// ruta get ":id"
app.get("/:id", (req, res) => {
  let { id } = req.params;
  const clienteEncontrado = clientes.find((cliente) => cliente.id == id);
  if (clienteEncontrado) {
    return res.send(clienteEncontrado);
  } else {
    return res.send("Error al encontrar al cliente");
  }
});

// POST
app.post("/", (req, res) => {
  const clienteNuevo = req.body;
  clientes.push(clienteNuevo);
  console.log(clientes);
  res.send({ status: "success", mesagge: "cliente creado" });
});

// PUT
app.put("/:id", (req, res) => {
  // siempre guardar el parametro de id;
  const { id } = req.params;
  const { nombre } = req.body;
  const { apellido } = req.body;

  const clienteEncontrado = clientes.findIndex((cliente) => cliente.id == id);
  if (clienteEncontrado !== -1) {
    clientes[clienteEncontrado].nombre = nombre;
    clientes[clienteEncontrado].apellido = apellido;
    console.log(clientes);
    res.send({ status: "success", message: "recurso  encontrado" });
  } else {
    res
      .status(404)
      .send({ status: "error", mesagge: "cliente no actualizado" });
  }
});

// DELETE
app.delete("/:id", (req, res) => {
  const { id } = req.params;
  const clienteIndex = clientes.findIndex((cliente) => cliente.id === id);
  if (clienteIndex !== -1) {
    clientes.splice(clienteIndex, 1);
    console.log(clientes);
    res.send({ status: "success", mesagge: "Cliente eliminado" });
  } else {
    res.status(404).send({ status: "error", mesagge: "cliente no encontrado" });
  }
});

// Por lo general, el listen lo dejamos abajo de todo.
// Siempre debe estar
app.listen(PUERTO, () => {
  console.log(`Escuchando en http://localhost:${PUERTO}`);
});
