const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/panelgrupo",
        name: "panelGrupo",
        component: () => import("src/pages/panelGrupo.vue"),
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
        path: "/votosview",
        name: "votosView",
        component: () => import("src/pages/canciones/votosView.vue"),
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
