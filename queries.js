const { response, request } = require('express');

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: '192.168.1.69',
  database: 'serviteccontrol_toner2022',
  password: 'RyuK6699.cu',
  port: 5432,
});


//Visualizar o modificar equipos en taller
const getInformeExistenciaRealTaller = (request, response, next) => {
  pool.query('SELECT * from get_existencia_en_taller()', (error, results) => {
    if (error) {
      next(error);
    } else {
      response.status(200).json(results.rows);
    }
  });
};
const postEntradaEquipoTalller = (request, response, next) => {
  console.log(request.body);
  response.json(request.body);
  /*pool.query('SELECT public.entrada_producto_taller()',(error, results)=>{
     if (error) {
      next(error);
    } else {
      response.status(200).json(results.rows);
    }
  });*/
};
const deleteSalidaEquipoTaller = (request, response, next) => {

};

//Informes 
const getInformeEquipoCliente = (request, response, next) => {
  const cliente = request.params.cliente;
  pool.query('SELECT * from get_equipos_por_cliente_existencia($1)', [cliente], (error, results) => {
    if (error) {
      next(error);
    } else {
      response.status(200).json(results.rows);
    }
  });
};

const getInformeEquiposEntregados = (request, response, next) => {
  pool.query('SELECT * from get_equipos_entregados_2013_2015()', [], (error, results) => {
    if (error) {
      next(error);
    } else {
      response.status(200).json(results.rows);
    }
  });
};

const getInformeEquiposEntregadosFechas = (request, response, next) => {
  const fecha1 = request.query.fecha1;
  const fecha2 = request.query.fecha2;
  //console.log(`fecha1: ${fecha1} y fecha2: ${fecha2}`)
  pool.query('SELECT * from get_equipos_entregados_2013_2015_fechas($1,$2)', [fecha1, fecha2], (error, results) => {
    if (error) {
      next(error);
    } else {
      response.status(200).json(results.rows);
    }
  });
};


//Visualizar o modificar lista de clientes
const getListaClientes = (request, response, next) => {
  pool.query('SELECT * from get_lista_clientes()', [], (error, results) => {
    if (error) {
      next(error);
    } else {
      response.status(200).json(results.rows);
    }
  });
};
const addCliente=(request,response,next)=>{

};

//Visualizar o modificar lista de productos
const getListaProductos = (request, response, next) => {
  pool.query('SELECT * from get_lista_productos()', [], (error, results) => {
    if (error) {
      next(error);
    } else {
      response.status(200).json(results.rows);
    }
  });
};

const addProducto=(request,response,next)=>{
  
};

//Visualizar o modificar lista de tecnicos
const getListaTecnicos = (request, response, next) => {
  pool.query('SELECT * from get_lista_tecnicos()', [], (error, results) => {
    if (error) {
      next(error);
    } else {
      response.status(200).json(results.rows);
    }
  });
};
const addTecnico=(request,response,next)=>{
  
};

//Visualizar o modificar lista de estados
const getEstados = (request, response, next) => {
  pool.query('SELECT * from get_estados()', [], (error, results) => {
    if (error) {
      next(error);
    } else {
      response.status(200).json(results.rows);
    }

  });
};
const addEstado=(request,response,next)=>{
  
};

//Visualizar o modificar lista de tipos de servicio
const getTipoServicio = (request, response, next) => {
  pool.query('SELECT * from get_tipo_servicio()', [], (error, results) => {
    if (error) {
      next(error);
    } else {
      response.status(200).json(results.rows);
    }

  });
};
const addTipoServicio=(request,response,next)=>{
  
};
































const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM lista_de_tecnicos WHERE idtecnico = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createUser = (request, response) => {
  const { name, email } = request.body;

  pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [name, email],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`);
    }
  );
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getInformeExistenciaRealTaller,
  postEntradaEquipoTalller,
  deleteSalidaEquipoTaller,
  getInformeEquipoCliente,
  getInformeEquiposEntregados,
  getInformeEquiposEntregadosFechas,
  getListaClientes,
  getEstados,
  getListaProductos,
  getListaTecnicos,
  getTipoServicio,
  addCliente,
  addEstado,
  addProducto,
  addTecnico,
  addTipoServicio
};
