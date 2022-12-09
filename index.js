const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const app = express();
const port = 3001;

const db = require('./queries');

//middlewares
app.use(helmet());
app.use(morgan("common"));
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


//endpoints
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/servitec/equipos-por-cliente/:cliente', db.getInformeEquipoCliente);
app.get('/servitec/equipos-entregados', db.getInformeEquiposEntregados);
app.get('/servitec/equipos-entregados-fechas', db.getInformeEquiposEntregadosFechas);
app.route('/servitec/existencia-taller').get(db.getInformeExistenciaRealTaller).post(db.postEntradaEquipoTalller).delete(db.deleteSalidaEquipoTaller);
app.route('/servitec/clientes').get(db.getListaClientes).post(db.addCliente);
app.route('/servitec/estados').get(db.getEstados).post(db.addEstado);
app.route('/servitec/productos').get(db.getListaProductos).post(db.addProducto);
app.route('/servitec/tecnicos').get(db.getListaTecnicos).post(db.addTecnico);
app.route('/servitec/tipo-servicio').get(db.getTipoServicio).post(db.addTipoServicio);
app.route('servitec/descripciones').get(db.getDescripciones).post(db.addDescripcion);
/*app.get('/servitec/existenciremote: Counting objects: 100% (42a-taller', db.getInformeExistenciaRealTaller);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);*/

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
