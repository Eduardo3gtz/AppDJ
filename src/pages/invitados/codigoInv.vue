<template>
  <q-page class="bg-black">
    <q-toolbar class="bg-transparent" elevatio="0">
      <q-btn
        class="text-white"
        to="/fiestasview"
        dense
        flat
        round
        icon="arrow_back"
        aria-label="Menu"
      />
      <q-space></q-space>
      <p class="q-mr-md datos text-white q-mt-md">Codigo de acceso</p>
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
    <div class="row">
      <div class="col">
        <p class="text-white q-ml-lg" style="font-size: 20px">Evento:</p>
        <q-card class="q-ma-md roundedcard">
          <q-item>
            <q-item-section>
              <q-item-label>{{ nomfiesta }} </q-item-label>
              <q-item-label caption lines="2">{{ fecha }}.</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <!-- <q-item-label caption>{{ fecha }}</q-item-label> -->
              <q-icon name="star" color="yellow" />
            </q-item-section>
          </q-item>

          <!-- <q-input label="Buscar playlist" class="q-mx-md"></q-input> -->
        </q-card>
      </div>
    </div>
    <q-card class="q-ma-md roundedcard">
      <q-input
        class="bg-white q-mx-md"
        v-model="codigop"
        label="Escribe el codigo "
      ></q-input>
      <q-item>
        <q-item-section>
          <q-item-label
            >Pide el codigo de acceso al dueño de la fiesta para poder entrar a
            la playlist.
          </q-item-label>
        </q-item-section>
      </q-item>
      <!-- <q-input label="Buscar playlist" class="q-mx-md"></q-input> -->
    </q-card>

    <div class="row justify-center q-mx-md q-mt" v-if="codigop != codigofi">
      <q-btn class="full-width" color="red" label="Comenzar"> </q-btn>
    </div>

    <div class="row justify-center q-mx-md q-mt-" v-if="codigop === codigofi">
      <q-btn
        class="full-width"
        color="green"
        :to="'/selecancion/' + idfiesta"
        label="Comenzar"
      >
      </q-btn>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useQuasar } from "quasar";
import { api } from "boot/axios";
import { useRouter, useRoute } from "vue-router";
import { fiestasApi } from "../../api-web/fiestas";

const router = useRouter();
const route = useRoute();
const $q = useQuasar();

const idfiesta = ref(0);
const nomfiesta = ref("");
const codigofi = ref("");
const codigop = ref("");
const fecha = ref("");

const loading = ref(false);

const filter = ref("");
const fiestas = ref([]);
const pagination = ref([]);

onMounted(() => {
  // consultar();
  idfiesta.value = parseInt(route.params.idfiesta);
  cargarinfo();
});

// const consultar = async () => {
//   fiestas.value = [];
//   // loading.value = true;

//   try {
//     const request = await api.get("fiestas.list");
//     // console.log("result", request);
//     if (request.data.result != null) {
//       // console.log("resul", request.result);
//       fiestas.value = request.data.result;
//       loading.value = false;
//       // fiestas.value.avatar = 'https://redleaf.pro/vacaciones/logotienda.png'
//     } else {
//       // fiestas.value = []
//     }
//   } catch (error) {
//     console.warn("Error al tratar de obtener fiestas, " + error.toString());
//   }
// };

const cargarinfo = async () => {
  // console.log(id.value)
  //Hacer consulta para traer datos del trabajador

  await fiestasApi
    .getFiesta(idfiesta.value)
    .then((response) => {
      loading.value = false;
      console.log(response);

      nomfiesta.value = response.data.result.nomfiesta;
      codigofi.value = response.data.result.codigofi;
      // disco.value = response.data.result.disco;
      fecha.value = response.data.result.fecha;
      // cantante.value = response.data.result.cantante;
    })
    .catch((err) => {
      loading.value = false;
      console.log(err);
      $q.notify({
        color: "red",
        position: "bottom",
        message: "Problemas al cargar los datos del evento.",
        icon: "report_problem",
      });
    });
};

// const editar = (evt, row) => {
//   router.push({ path: "codigoinv/" + row.idcancion });
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
