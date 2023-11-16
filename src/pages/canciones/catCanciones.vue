<template>
  <q-page class="bg-indigo">
    <q-toolbar class="bg-transparent" elevatio="0">
      <q-btn
        class="text-white"
        to="panelGrupo"
        dense
        flat
        round
        icon="arrow_back"
        aria-label="Menu"
      />
      <q-space></q-space>
      <p class="q-ml-md datos text-white q-mt-md">Catalogo de canciones</p>
      <q-space></q-space>
      <q-btn
        class="text-white"
        to="newcancion/new"
        dense
        flat
        round
        icon="edit"
        aria-label="Menu"
      />
    </q-toolbar>
    <div class="row">
      <div class="col">
        <q-card class="q-ma-md roundedcard">
          <q-input class="q-mx-md" v-model="filter" label="Buscar canción">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <!-- <q-input label="Buscar playlist" class="q-mx-md"></q-input> -->
        </q-card>

        <q-table
          :filter="filter"
          separator="cell"
          @row-click="editar"
          style="height: auto"
          title="Playlist"
          :rows="canciones"
          :columns="columns"
          row-key="name"
          flat
          dense
          v-model:pagination="pagination"
          :rows-per-page-options="[0]"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useQuasar } from "quasar";
import { api } from "boot/axios";
import { useRouter } from "vue-router";

const router = useRouter();
const $q = useQuasar();

const loading = ref(false);

const filter = ref("");
const canciones = ref([]);
const pagination = ref([]);

const columns = [
  {
    name: "idcancion",
    label: "Id",
    field: "idcancion",
    sortable: true,
    align: "center",
  },
  {
    name: "nomcancion",
    label: "Canción",
    field: "nomcancion",
    sortable: true,
    align: "left",
  },
  {
    name: "cantante",
    label: "Autor",
    field: "cantante",
    sortable: true,
    align: "left",
  },
  {
    name: "disco",
    label: "Album",
    field: "disco",
    sortable: true,
    align: "left",
  },
  // {
  //   name: "email",
  //   label: "Correo electronico",
  //   field: "email",
  //   sortable: true,
  //   align: "left",
  // },

  // {
  //   name: "celular",
  //   label: "Celular",
  //   field: "celular",
  //   sortable: true,
  //   align: "center",
  // },
];

onMounted(() => {
  consultar();
});

const consultar = async () => {
  canciones.value = [];
  // loading.value = true;

  try {
    const request = await api.get("canciones.list");
    // console.log("result", request);
    if (request.data.result != null) {
      // console.log("resul", request.result);
      canciones.value = request.data.result;
      loading.value = false;
      // canciones.value.avatar = 'https://redleaf.pro/vacaciones/logotienda.png'
    } else {
      // canciones.value = []
    }
  } catch (error) {
    console.warn("Error al tratar de obtener canciones, " + error.toString());
  }
};

const editar = (evt, row) => {
  router.push({ path: "newcancion/" + row.idcancion });
};

// const redirigirAOtraVista = () => {
//   router.push({ name: "newSesion" }); // Reemplaza '/otra-vista' con la ruta real de tu vista
// };
</script>

<style scoped>
.roundedcard {
  border-radius: 15px 15px 15px 15px;
}

.roundedcard2 {
  border-radius: 15px 15px 0px 0px;
}

.fuente {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.datos {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 15px;
}
</style>
