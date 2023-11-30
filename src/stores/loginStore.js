import { defineStore } from "pinia";
// import { httpAxios } from '../main'

import { api } from "boot/axios";
import router from "../router";

export const useLoginStore = defineStore("loginStore", {
  state: () => ({
    logueado: false,
    userlog: {
      email: "",
      idusuariosweb: 0,
      nivel: "",
      nomuser: "",
      idbanda: 0,
      idinvitado: 0,
    },
    trabaj: {
      idtrabaj: "",
      nombre: "",
      numemp: "",
      idbanda: 0,
      idinvitado: 0,
    },
  }),

  getters: {
    getLogueado() {
      return this.logueado;
    },

    getUser() {
      console.log("getUser ", this.userlog);
      return this.userlog;
    },

    getTrabaj() {
      return this.trabaj;
    },
  },

  actions: {
    setUser(userlog) {
      this.userlog = userlog;
    },

    async iniciarSesion(usuario) {
      // console.log('Buscar Usuario ', usuario)
      try {
        const response = await api.post("/publica/login", usuario);
        // console.log(response)
        if (response.data.token != null) {
          // console.log('Ok auth')
          const cToken = response.data.token;
          localStorage.setItem("tlkey", cToken);
          api.defaults.headers.common["Authorization"] = "Bearer " + cToken;

          // api.defaults.headers.common['Authorization'] = 'Bearer ' + cToken
          // session.set(data);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        localStorage.setItem("tlkey", "");
        // session.remove();
        return false;
        // console.log(error)
      }
    },

    async buscarUsuario(usuario) {
      // console.log('buscarusuario ', usuario)
      try {
        const response = await api.post("/publica/buscarusuario", usuario);
        // console.log('Reposne 200', response)
        if (response.status === 201) {
          console.log("Garbado aqui la respiesta.", response.data);
          // return response.data.result
          const userlog = response.data.result;
          this.setUser(userlog);
          this.setLoguado(true);
          // this.setTrabaj(userlog.idusuariosweb.toString())
          return true;
        } else {
          return false;
        }
      } catch (error) {
        localStorage.setItem("tlkey", "");
        // session.remove();
        return false;
      }
    },

    // async registrarUsuario(usuario) {
    //   console.log('ogin RegistrarUsuario ', usuario)
    //   try {
    //     const response = await api.post('r2/usuariosweb.insert', usuario)
    //     console.log(response)
    //     if (response.data.result != null) {
    //       // session.set(data);
    //       router.push({ name: 'login' })
    //     }
    //   } catch (error) {
    //     // session.remove();
    //     return error
    //   }
    // },

    async olvidaContra(payload) {
      try {
        const response = await api.post("/publica/olvidacontra", payload);
        console.log("olvidacontra", response.data.result);
        if (response.data.result != null) {
          return response.data.result;
          // session.set(data);
          // router.push({ name: 'loginView' })
        }
      } catch (error) {
        // session.remove();
        return error;
      }
    },

    async enviarcorreo(payload) {
      try {
        const response = await api.post("/publica/sendolvida", payload);
        console.log("enviarcorreo", response);
        if (response.status == 200) {
          return true;
          // session.set(data);
          // router.push({ name: 'loginView' })
        }
      } catch (error) {
        // session.remove();
        return error;
      }
    },

    async getUsarxId(payload) {
      try {
        const response = await api.post("/publica/getuserxid", payload);
        console.log("getuserxid", response);
        if (response.status == 201) {
          return response.data.result;
          // session.set(data);
          // router.push({ name: 'loginView' })
        }
      } catch (error) {
        // session.remove();
        return error;
      }
    },

    async cambiarcontra(id, payload) {
      try {
        const response = await api.put("/publica/cambiarcontra/" + id, payload);
        console.log("cambiacontra", response);

        if (response.data.result != "") {
          return response.data.result;
          // session.set(data);
          // router.push({ name: 'loginView' })
        }
      } catch (error) {
        // session.remove();
        return error;
      }
    },

    async activarusuario(id) {
      return new Promise((resolve, reject) => {
        const response = api
          .get("/publica/activarusuario/" + id)
          .then((response) => {
            console.log("activar usuario", response);
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    setLoguado(payload) {
      this.logueado = payload;
    },

    // const request = await api.get(`/trabaj.get/${idtrabaj}`);
    setTrabaj(trabajData) {
      this.trabaj = trabajData;
    },
  },
});
