// import { httpAxios } from '../main'
import { api } from "boot/axios";

export const ordenesApi = {
  getOrden: async (idorden) => {
    return new Promise((resolve, reject) => {
      api
        .get("/ordenes.get/" + idorden)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  addOrden: async (payloadData) => {
    return new Promise((resolve, reject) => {
      api
        .post("/ordenes.insert", payloadData)
        .then((response) => {
          // console.log(response)
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateOrden: async (idorden, payloadData) => {
    console.log("payloadData", payloadData);
    return new Promise((resolve, reject) => {
      api
        .put(`/ordenes.update/${idorden}`, payloadData)
        .then((response) => {
          console.log(response);
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  cerrarOrden: async (idorden, payloadData) => {
    console.log("payloadData", payloadData);
    return new Promise((resolve, reject) => {
      api
        .patch(`/ordenes.cerrar/${idorden}`, payloadData)
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
