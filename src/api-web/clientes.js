// import { httpAxios } from '../main'
import { api } from "boot/axios";

export const clientesApi = {
  buscarCliente: async (buscarData) => {
    return new Promise((resolve, reject) => {
      api
        .post("/buscar.cliente", buscarData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getIdcliente: async (idcliente) => {
    // console.log('auth', api.defaults.headers.common)
    try {
      const request = await api.get(`/clientes.get/${idcliente}`);
      return request.data;
    } catch (error) {
      console.warn(
        "Error al tratar de obtener datos del idcliente, " + error.toString()
      );
    }
  },

  getCliente: async (idcliente) => {
    return new Promise((resolve, reject) => {
      api
        .get("/clientes.get/" + idcliente)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  addCliente: async (payloadData) => {
    return new Promise((resolve, reject) => {
      api
        .post("/clientes.insert", payloadData)
        .then((response) => {
          // console.log(response)
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateCliente: async (idcliente, payloadData) => {
    console.log("payloadData", payloadData);
    return new Promise((resolve, reject) => {
      api
        .put(`/clientes.update/${idcliente}`, payloadData)
        .then((response) => {
          console.log(response);
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // buscarProducto: async (buscarData) => {
  //   return new Promise((resolve, reject) => {
  //     api
  //       .post('/buscar.producto', buscarData)
  //       .then((response) => {
  //         resolve(response)
  //       })
  //       .catch((err) => {
  //         reject(err)
  //       })
  //   })
  // },
  // listarProductos: async () => {
  //   return new Promise((resolve, reject) => {
  //     api
  //       .get('/arts.list')
  //       .then((response) => {
  //         resolve(response)
  //       })
  //       .catch((err) => {
  //         reject(err)
  //       })
  //   })
  // },
  // cyberMasiva: async (payload) => {
  //   return new Promise((resolve, reject) => {
  //     api
  //       .post('/cyber.update.masiva', payload)
  //       .then((response) => {
  //         resolve(response)
  //       })
  //       .catch((err) => {
  //         reject(err)
  //       })
  //   })
  // },
  // listarActivos: async () => {
  //   return new Promise((resolve, reject) => {
  //     api
  //       .get('/arts.list.activos')
  //       .then((response) => {
  //         resolve(response)
  //       })
  //       .catch((err) => {
  //         reject(err)
  //       })
  //   })
  // },
};
