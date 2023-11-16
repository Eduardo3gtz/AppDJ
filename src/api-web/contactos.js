// import { httpAxios } from '../main'
import { api } from "boot/axios";

export const contactosApi = {
  buscarContacto: async (buscarData) => {
    return new Promise((resolve, reject) => {
      api
        .post("/buscar.contacto", buscarData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getIdcontacto: async (idcontacto) => {
    // console.log('auth', api.defaults.headers.common)
    try {
      const request = await api.get(`/contactos.get/${idcontacto}`);
      return request.data;
    } catch (error) {
      console.warn(
        "Error al tratar de obtener datos del idcontacto, " + error.toString()
      );
    }
  },

  getContacto: async (idcontacto) => {
    return new Promise((resolve, reject) => {
      api
        .get("/contactos.get/" + idcontacto)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  addContacto: async (payloadData) => {
    return new Promise((resolve, reject) => {
      api
        .post("/contactos.insert", payloadData)
        .then((response) => {
          // console.log(response)
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateContacto: async (idcontacto, payloadData) => {
    console.log("payloadData", payloadData);
    return new Promise((resolve, reject) => {
      api
        .put(`/contactos.update/${idcontacto}`, payloadData)
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
