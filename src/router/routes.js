const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      // { path: "", component: () => import("pages/IndexPage.vue") },

      //LOGIN

      {
        path: "",
        name: "loginView",
        component: () => import("src/pages/login/loginView.vue"),
        meta: { libre: true },
      },
      {
        path: "olvidacontra",
        name: "olviaContra",
        component: () => import("src/pages/login/olvidaContra.vue"),
        meta: { libre: true },
      },
      {
        path: "cambiacontra/:id",
        name: "cambiaContra",
        component: () => import("src/pages/login/cambiaContra.vue"),
        meta: { libre: true },
      },
      {
        path: "activarusuario/:id",
        name: "activarUsuario",
        component: () => import("src/pages/login/activarUsuario.vue"),
        meta: { libre: true },
      },
      ///////////////////
      {
        path: "/panelview",
        name: "panelView",
        component: () => import("src/pages/panelView.vue"),
        // meta: { libre: true },
      },

      {
        path: "/panelinv",
        name: "panelInv",
        component: () => import("src/pages/panelInv.vue"),
        // meta: { libre: true },
      },

      {
        path: "/newsesion",
        name: "newSesion",
        component: () => import("src/pages/sesiones/newSesion.vue"),
        // meta: { libre: true },
      },
      {
        path: "/catsesiones",
        name: "catSesiones",
        component: () => import("src/pages/sesiones/catSesiones.vue"),
        // meta: { libre: true },
      },
      {
        path: "/listacanciones",
        name: "listaCanciones",
        component: () => import("src/pages/sesiones/listaCanciones.vue"),
        // meta: { libre: true },
      },
      {
        path: "/nuevacuenta",
        name: "nuevaCuenta",
        component: () => import("src/pages/login/nuevaCuenta.vue"),
        // meta: { libre: true },
      },
      {
        path: "/catcanciones",
        name: "catCanciones",
        component: () => import("src/pages/canciones/catCanciones.vue"),
        // meta: { libre: true },
      },
      {
        path: "/newcancion/:idcancion",
        name: "newCancion",
        component: () => import("src/pages/canciones/newCancion.vue"),
        // meta: { libre: true },
      },

      {
        path: "/elegirCancion",
        name: "elegirCancion",
        component: () => import("src/pages/canciones/elegirCancion.vue"),
        // meta: { libre: true },
      },

      {
        path: "/catfiestas",
        name: "catFiestas",
        component: () => import("src/pages/eventos/catFiestas.vue"),
        // meta: { libre: true },
      },
      {
        path: "/newfiesta/:idfiesta",
        name: "newFiesta",
        component: () => import("src/pages/eventos/newFiesta.vue"),
        // meta: { libre: true },
      },

      {
        path: "/newcancion/:idcancion",
        name: "newCancion",
        component: () => import("src/pages/canciones/newCancion.vue"),
        // meta: { libre: true },
      },

      {
        path: "/fiestasview",
        name: "fiestasView",
        component: () => import("src/pages/invitados/fiestasView.vue"),
        // meta: { libre: true },
      },
      {
        path: "/selecancion/:idfiesta",
        name: "seleCancion",
        component: () => import("src/pages/invitados/seleCancion.vue"),
        // meta: { libre: true },
      },
      {
        path: "/vistatiempo/:idfiesta",
        name: "vistaTiempo",
        component: () => import("src/pages/invitados/vistaTiempo.vue"),
        // meta: { libre: true },
      },
      {
        path: "/codigoinv/:idfiesta",
        name: "codigoInv",
        component: () => import("src/pages/invitados/codigoInv.vue"),
        // meta: { libre: true },
      },
      //MODO FIESTA
      {
        path: "/votosview/:idfiesta",
        name: "votosView",
        component: () => import("src/pages/modofiesta/votosView.vue"),
        // meta: { libre: true },
      },
      {
        path: "/selfiestas",
        name: "selFiestas",
        component: () => import("src/pages/modofiesta/selFiestas.vue"),
        // meta: { libre: true },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
