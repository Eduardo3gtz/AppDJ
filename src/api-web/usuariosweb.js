import { api } from "boot/axios";

export const usuarioswebApi = {
  getUsuariosweb: async (idusuariosweb) => {
    // console.log('auth', api.defaults.headers.common)
    try {
      const request = await api.get(`/usuariosweb.get/${idusuariosweb}`);
      return request.data;
    } catch (error) {
      console.warn(
        "Error al tratar de obtener datos del usuarioswebador, " +
          error.toString()
      );
    }
  },

  addUsuariosweb: async (payloadData) => {
    // api.defaults.baseURL = process.env.VITE_BASE_URL_DEV;

    return new Promise((resolve, reject) => {
      api
        .post("publica/usuariosweb.insert", payloadData)
        .then((response) => {
          // console.log(response)
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // addUsuarioswebOpa: async (payloadData) => {
  //   api.defaults.baseURL = process.env.VITE_BASE_URL_DEV;

  //   return new Promise((resolve, reject) => {
  //     api
  //       .post("/publica/usuariosweb.insert.empresa", payloadData)
  //       .then((response) => {
  //         console.log("respuesta de insert usuarios opa", response);

  //         resolve(response.data.result);
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       });
  //   });
  // },

  // updateUsuariosweb: async (idusuariosweb) => {
  //   // console.log('auth', api.defaults.headers.common)
  //   try {
  //     const request = await api.put(`/usuariosweb.update/${idusuariosweb}`);
  //     return request.data;
  //   } catch (error) {
  //     console.warn(
  //       "Error al tratar de actualizar datos del usuarioswebador, " +
  //         error.toString()
  //     );
  //   }
  // },

  updateUsuariosweb: async (idusuariosweb, payloadData) => {
    console.log("payloadData", payloadData);
    return new Promise((resolve, reject) => {
      api
        .put(`/usuariosweb.update/${idusuariosweb}`, payloadData)
        .then((response) => {
          console.log(response);
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
