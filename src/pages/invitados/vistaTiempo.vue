<template>
  <q-page class="bg-indigo-10">
    <q-toolbar class="bg-transparent" elevatio="0">
      <!-- <q-btn
        class="text-white"
        @click="$router.go(-1)"
        dense
        flat
        round
        icon="arrow_back"
        aria-label="Menu"
      /> -->
      <q-space></q-space>
      <p class="datos text-white q-mt-md" style="font-size: 25px">
        Gracias por votar!
      </p>
      <q-space></q-space>
      <!-- <q-btn
        class="text-white"
        to="newcancion/new"
        dense
        flat
        round
        icon="edit"
        aria-label="Menu"
      /> -->
    </q-toolbar>
    <div class="row justify-center">
      <!-- <div class="col"> -->
      <p class="datos text-white q-mt-md">
        Esta es la lista oficial de canciones de la fiesta, disfruta!
      </p>
      <!-- </div> -->
    </div>
    <div class="row">
      <div class="col">
        <q-card class="q-ma-md roundedcard">
          <div class="row justify-center">
            <p style="font-size: 50px">{{ tiempoFormateado }}</p>
          </div>
          <div class="row justify-center">
            <p>¿Quieres volver a votar?, vuelve en 15 minutos</p>
          </div>
          <div class="row justify-center">
            <q-btn
              v-if="tiempoFormateado == 0"
              label="Volver a votar"
              color="red"
              disable
            ></q-btn>
          </div>

          <!-- <q-input class="q-mx-md" v-model="filter" label="Buscar canción">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input> -->
          <!-- <q-input label="Buscar playlist" class="q-mx-md"></q-input> -->
        </q-card>

        <q-table
          :filter="filter"
          separator="cell"
          style="height: auto"
          title="Playlist"
          :rows="cancionessel"
          :columns="columns"
          row-key="name"
          flat
          dense
          v-model:pagination="pagination"
          :rows-per-page-options="[0]"
        />

        <q-card class="q-mb-md q-mt-md">
          <q-list bordered>
            <!-- <p class="">TOP ARTISTAS</p> -->
            <q-separator></q-separator>
            <q-item>
              <q-item-section>
                <q-item-label>Grupo Frontera</q-item-label>
                <!-- <q-item-label caption lines="2"
                  >Secondary line text. Lorem ipsum dolor sit amet, consectetur
                  adipiscit elit.</q-item-label
                > -->
              </q-item-section>

              <q-item-section side top>
                <!-- <q-item-label caption>5 min ago</q-item-label> -->
                <q-icon name="star" color="yellow" />
              </q-item-section>
            </q-item>
            <q-separator></q-separator>
            <q-item>
              <q-item-section>
                <q-item-label>Los Angeles Azules</q-item-label>
                <!-- <q-item-label caption lines="2"
                  >Secondary line text. Lorem ipsum dolor sit amet, consectetur
                  adipiscit elit.</q-item-label
                > -->
              </q-item-section>

              <q-item-section side top>
                <!-- <q-item-label caption>5 min ago</q-item-label> -->
                <q-icon name="star" color="grey" />
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label>Banda MS</q-item-label>
                <!-- <q-item-label caption lines="2"
                  >Secondary line text. Lorem ipsum dolor sit amet, consectetur
                  adipiscit elit.</q-item-label
                > -->
              </q-item-section>

              <q-item-section side top>
                <!-- <q-item-label caption>5 min ago</q-item-label> -->
                <q-icon name="star" color="orange-3" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, watch, computed, onBeforeUnmount } from "vue";
import { useQuasar } from "quasar";
import { api } from "boot/axios";
import { useRouter, useRoute } from "vue-router";
import { useLoginStore } from "stores/loginStore";
const loginStore = useLoginStore();
const router = useRouter();
const route = useRoute();
const $q = useQuasar();

const loading = ref(false);

const idfiesta = ref(0);
const filter = ref("");
const cantante = ref("");
const cancionessel = ref([]);
const pagination = ref([]);

//TIEMPO
const tiempoRestante = ref(900); // 15 minutos en segundos 900
let intervalo;

const tiempoFormateado = computed(() => {
  const minutos = Math.floor(tiempoRestante.value / 60);
  const segundos = tiempoRestante.value % 60;
  return `${minutos}:${segundos < 10 ? "0" : ""}${segundos}`;
});

const iniciarContador = () => {
  intervalo = setInterval(() => {
    if (tiempoRestante.value > 0) {
      tiempoRestante.value -= 1;
    } else {
      clearInterval(intervalo);
      // Aquí puedes agregar acciones cuando el tiempo llega a cero
      console.log("¡Tiempo agotado!");
    }
  }, 1000); // Actualizar cada segundo
};

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
  // {
  //   name: "cantante",
  //   label: "Autor",
  //   field: "cantante",
  //   sortable: true,
  //   align: "left",
  // },
  {
    name: "votos",
    label: "Votos",
    field: "votos",
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
  iniciarContador();
});

onBeforeUnmount(() => {
  // Limpiar el intervalo cuando el componente se destruye para evitar fugas de memoria
  clearInterval(intervalo);
});

const consultar = async () => {
  cancionessel.value = [];
  // loading.value = true;

  try {
    let params = {};
    params.idfiesta = parseInt(route.params.idfiesta);
    const request = await api.get(
      `cancionessel.votos/${route.params.idfiesta}`,
      {
        params: {
          ...params,
          limit: 1000,
        },
      }
    );
    // console.log("result", request);
    if (request.data.result != null) {
      // console.log("resul", request.result);
      cancionessel.value = request.data.result;
      loading.value = false;
      // cancionessel.value.avatar = 'https://redleaf.pro/vacaciones/logotienda.png'
    } else {
      // cancionessel.value = []
    }
  } catch (error) {
    console.warn(
      "Error al tratar de obtener cancionessel, " + error.toString()
    );
  }
};

// const editar = (evt, row) => {
//   router.push({ path: "newcancion/" + row.idcancion });
// };

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
