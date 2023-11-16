// import { httpAxios } from '../main'
import { api } from "boot/axios";

export const citasApi = {
  getCita: async (idcita) => {
    return new Promise((resolve, reject) => {
      api
        .get("/citas.get/" + idcita)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  addCita: async (payloadData) => {
    return new Promise((resolve, reject) => {
      api
        .post("/citas.insert", payloadData)
        .then((response) => {
          // console.log(response)
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateCita: async (idcita, payloadData) => {
    console.log("payloadData", payloadData);
    return new Promise((resolve, reject) => {
      api
        .put(`/citas.update/${idcita}`, payloadData)
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
