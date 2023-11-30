<template>
  <q-page class="bg-blue-3">
    <q-toolbar class="bg-transparent" elevatio="0">
      <q-btn
        class="text-white"
        to="panelview"
        dense
        flat
        round
        icon="arrow_back"
        aria-label="Menu"
      />
      <q-space></q-space>
      <p class="q-ml-md datos q-mr-md text-white q-mt-md">Eventos</p>
      <q-space></q-space>
      <q-btn
        class="text-white"
        to="newfiesta/new"
        dense
        flat
        round
        icon="edit"
        aria-label="Menu"
      />
    </q-toolbar>
    <div class="row justify-center align-center">
      <div class="col">
        <q-date
          v-model="fecha"
          :event-color="(date) => (date[9] % 2 === 0 ? 'red' : 'red')"
          class="full-width roundedcal"
          bordered
          flat
          today-btn
          :events="events"
        />
        <q-virtual-scroll
          style="max-height: 400px"
          :items="fiestas"
          class="bg-blue-10"
          separator
          :filter="filter"
        >
          <template #default="{ item, index }">
            <q-item
              :filter="filter"
              :key="index"
              :to="`/newfiesta/${item.idfiesta}`"
            >
              <q-item-section>
                <q-item-label class="text-blue-3">
                  {{ item.fecha }}
                  <!-- <p class="text-black text-blue">Zoom</p></q-item-label -->
                </q-item-label>
                <q-item-label class="tituloord text-white">{{
                  item.nomfiesta
                }}</q-item-label>

                <!-- <q-item-label caption>{{ item.desc }}</q-item-label> -->
                <q-item-label caption class="row">
                  <!-- {{ item.lugar }} -->
                  <!-- <p class="text-black text-blue">Zoom</p></q-item-label -->
                </q-item-label>
              </q-item-section>

              <!-- <q-item-section side top>
                <q-item-label caption class="text-black"
                  >{{ item.fechaMovil }}
                </q-item-label>
                <q-item-label caption class="text-grey"
                  >{{ item.hora }}
                </q-item-label>
              </q-item-section> -->
            </q-item>
          </template>
        </q-virtual-scroll>

        <!-- <q-card class="q-ma-md roundedcard">
          <q-input class="q-mx-md" v-model="filter" label="Buscar playlist">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-card>

        <q-table
          :filter="filter"
          title="Playlist"
          :rows="rows"
          :columns="columns"
          row-key="name"
        /> -->
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useQuasar } from "quasar";
import { api } from "boot/axios";
import { useRouter } from "vue-router";
import { useLoginStore } from "stores/loginStore";
const loginStore = useLoginStore();

const router = useRouter();
const $q = useQuasar();

const nomfiesta = ref("");
const descfiesta = ref("");
const loading = ref(false);

const filter = ref("");
const date = ref("2023/11/01");

const m = new Date(Date.now() - new Date().getTimezoneOffset() * 60000);
const fecha = ref("");
fecha.value =
  m.getUTCFullYear() +
  "/" +
  ("0" + (m.getUTCMonth() + 1)).slice(-2) +
  "/" +
  ("0" + m.getUTCDate()).slice(-2);

const events = ref([]);
const fiestas = ref([]);
// const idbanda = ref(2);
const idbanda = ref(0);
const idusuariosweb = ref(0);

onMounted(() => {
  consultar();
  idusuariosweb.value = loginStore.getUser.idusuariosweb;
  idbanda.value = loginStore.getUser.idbanda;
  console.log("idbanda: ", idbanda.value);
});

const consultar = async () => {
  fiestas.value = [];
  events.value = [];

  // loading.value = true;

  try {
    let params = {};
    params.idbanda = loginStore.getUser.idbanda;
    const request = await api.get("fiestas.list", {
      params: {
        ...params,
        limit: 1000,
      },
    });
    console.log("result", request);
    if (request.data.result != null) {
      // console.log("resul", request.result);
      fiestas.value = request.data.result;
      loading.value = false;
      // fiestas.value.push(request.data.result.fecha);
      console.log("fiestas", fiestas);

      //CICLO PARA RECORRER FIESTAS
      fiestas.value.forEach((element) => {
        let nfecha = element.fecha.replace("-", "/");

        events.value.push(nfecha.replace("-", "/"));

        console.log(element.fecha);
      });
      console.log(events);

      // fiestas.value.avatar = 'https://redleaf.pro/vacaciones/logotienda.png'
    } else {
      // fiestas.value = []
    }
  } catch (error) {
    console.warn("Error al tratar de obtener fiestas, " + error.toString());
  }
};

const editar = (evt, row) => {
  router.push({ path: "newfiesta/" + row.idfiesta });
};

// const redirigirAOtraVista = () => {
//   router.push({ name: "newSesion" }); // Reemplaza '/otra-vista' con la ruta real de tu vista
// };
</script>

<style scoped>
.roundedcard {
  border-radius: 15px 15px 15px 15px;
}

.roundedcal {
  border-radius: 15px 15px 0px 0px;
}

.fuente {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.datos {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 20px;
}

.fondobar {
  background-color: #c0392b;
}

.texto {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: black;
}

.fondo {
  background-color: #c0392b;
}

.titulo {
  color: white;
  font-size: 20px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
