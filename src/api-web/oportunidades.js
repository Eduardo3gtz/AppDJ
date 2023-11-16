// import { httpAxios } from '../main'
import { api } from "boot/axios";

export const oportunidadesApi = {
  buscarOportunidad: async (buscarData) => {
    return new Promise((resolve, reject) => {
      api
        .post("/buscar.opo", buscarData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getIdoportunidad: async (idoportunidad) => {
    // console.log('auth', api.defaults.headers.common)
    try {
      const request = await api.get(`/oportunidades.get/${idoportunidad}`);
      return request.data;
    } catch (error) {
      console.warn(
        "Error al tratar de obtener datos del idoportunidad, " +
          error.toString()
      );
    }
  },
  getOportunidad: async (idoportunidad) => {
    return new Promise((resolve, reject) => {
      api
        .get("/oportunidades.get/" + idoportunidad)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  addOportunidad: async (payloadData) => {
    return new Promise((resolve, reject) => {
      api
        .post("/oportunidades.insert", payloadData)
        .then((response) => {
          // console.log(response)
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateOportunidad: async (idoportunidad, payloadData) => {
    // console.log("payloadData", payloadData);
    return new Promise((resolve, reject) => {
      api
        .put(`/oportunidades.update/${idoportunidad}`, payloadData)
        .then((response) => {
          // console.log(response);
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  oportunidadUpdPerfil: async (idoportunidad, payloadData) => {
    // console.log("payloadData", payloadData);
    return new Promise((resolve, reject) => {
      api
        .patch(`/oportunidades.upd.perfil/${idoportunidad}`, payloadData)
        .then((response) => {
          // console.log(response);
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  oportunidadUpdDemo: async (idoportunidad, payloadData) => {
    // console.log("payloadData", payloadData);
    return new Promise((resolve, reject) => {
      api
        .patch(`/oportunidades.upd.demo/${idoportunidad}`, payloadData)
        .then((response) => {
          // console.log(response);
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  oportunidadUpdEncuesta: async (idoportunidad, payloadData) => {
    // console.log("payloadData", payloadData);
    return new Promise((resolve, reject) => {
      api
        .patch(`/oportunidades.upd.encuesta/${idoportunidad}`, payloadData)
        .then((response) => {
          // console.log(response);
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
