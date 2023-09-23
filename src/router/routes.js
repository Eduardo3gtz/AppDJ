const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/panelview",
        name: "panelView",
        component: () => import("src/pages/panelView.vue"),
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
