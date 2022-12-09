const { response, request } = require('express');

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'servitecDB',
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
  const { tecnico, idCliente, fecha_de_entrada, tipo_servicio, equipo, modelo, inventario, accesorios, trabajo_a_realizar, observaciones, telefono } = request.body;
  pool.query(
    'SELECT public.entrada_producto_taller($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)',
    [tecnico, idCliente, fecha_de_entrada, tipo_servicio, equipo, modelo, inventario, accesorios, trabajo_a_realizar, observaciones, telefono],
    (error, results) => {
      if (error) {
        next(error);
      } else {
        response.status(200);
      }
    });
};


const deleteSalidaEquipoTaller = (request, response, next) => {
  const { id, modelo, trabajo_realizado, situacion, argumento, fecha_salida, nombrePersona_recoge, apellidoPersona_recoge, c_i } = request.body;
  pool.query('SELECT public.salida_producto_taller()',
    [id, `${nombrePersona_recoge} ${apellidoPersona_recoge}`, c_i, trabajo_realizado, situacion, argumento, fecha_salida],
    (error, results) => {
      if (error) {
        next(error);
      } else {
        response.status(200);
      }
    });
};

//Informes 
const getInformeEquipoCliente = (request, response, next) => {
  app.get('/servitec/equipos-por-cliente/:cliente', db.getInformeEquipoCliente);
  app.get('/servitec/equipos-entregados', db.getInformeEquiposEntregados);
  app.get('/servitec/equipos-entregados-fechas', db.getInformeEquiposEntregadosFechas);
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
  pool.query('SELECT * from get_equipos_entregados_2013_2015_fechas($1,$2)',
    [fecha1, fecha2],
    (error, results) => {
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
const addCliente = (request, response, next) => {
  const { idCliente, nombre_cliente, direccion } = request.body;
  pool.query(
    'SELECT * from public.add_cliente($1,$2,$3)',
    [idCliente, nombre_cliente, direccion],
    (error, results) => {
      if (error) {
        next(error);
      } else {
        response.status(200);
      }
    });
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

const addProducto = (request, response, next) => {
  const { idProducto, nombre_producto } = request.body;
  pool.query('SELECT * from add_producto($1)', [nombre_producto], (error, results) => {
    if (error) {
      next(error);
    } else {
      response.status(200).json(results.rows);
    }
  });
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
const addTecnico = (request, response, next) => {
  const { idTecnico, nombre_tecnico, cargo, c_i } = request.body;
  pool.query('SELECT * from add_producto($1,$2,$3)', [nombre_tecnico, cargo, c_i], (error, results) => {
    if (error) {
      next(error);
    } else {
      response.status(200).json(results.rows);
    }
  });
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
const addEstado = (request, response, next) => {

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
const addTipoServicio = (request, response, next) => {
  const { idServicio, nombre_servicio } = request.body;
  pool.query('SELECT * from add_producto($1)', [nombre_servicio], (error, results) => {
    if (error) {
      next(error);
    } else {
      response.status(200).json(results.rows);
    }
  });
};


const getDescripciones = (request, response, next) => { 
  pool.query('SELECT * from get_lista_descripciones()', [], (error, results) => {
    if (error) {
      next(error);
    } else {
      response.status(200).json(results.rows);
    }
  });
};


const addDescripcion = (request, response, next) => {
  const { idDesc, descripcion,precioMN,precioUSD,direccion,trabajo_realizado} = request.body;
  pool.query('SELECT * from add_descripcion($1,$2,$3,$4)', [descripcion,precioMN,precioUSD,trabajo_realizado], (error, results) => {
    if (error) {
      next(error);
    } else {
      response.status(200).json(results.rows);
    }
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
  getDescripciones,
  addCliente,
  addEstado,
  addProducto,
  addTecnico,
  addTipoServicio,
  addDescripcion
};
