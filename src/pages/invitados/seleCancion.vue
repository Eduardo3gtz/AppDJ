<template>
  <q-page class="bg-indigo">
    <q-toolbar class="bg-transparent" elevatio="0">
      <q-btn
        class="text-white"
        to="/panelview"
        dense
        flat
        round
        icon="arrow_back"
        aria-label="Menu"
      />
      <q-space></q-space>
      <p class="q-ml-md datos text-white q-mt-md">Catalogo de canciones</p>
      <q-space></q-space>
      <!-- <q-typography>
        Tiempo restante: {{ formatTime(timeRemaining) }}
      </q-typography> -->
      <!-- <q-btn @click="iniciarContador" :disable="contadorEnMarcha"
        >Iniciar Contador</q-btn
      > -->
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
        <q-card class="q-ma-md roundedcard">
          <q-input class="q-mx-md" v-model="filter" label="Buscar canción">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <!-- <q-input label="Buscar playlist" class="q-mx-md"></q-input> -->
        </q-card>

        <div class="row justify-center q-mx-md q-mb-md">
          <q-btn
            class="bg-black full-width text-white"
            @click="guardarCancion"
            label="Guardar"
          ></q-btn>
        </div>

        <q-table
          :filter="filter"
          separator="cell"
          style="height: auto"
          title="Playlist"
          :rows="canciones"
          :columns="columns"
          row-key="idcancion"
          flat
          dense
          v-model:pagination="pagination"
          :rows-per-page-options="[0]"
          :selected-rows-label="getSelectedString"
          selection="multiple"
          v-model:selected="selected"
        />

        <!-- <div class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div> -->
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useQuasar } from "quasar";
import { api } from "boot/axios";
import { useRouter, useRoute } from "vue-router";
import { cancionesselApi } from "../../api-web/cancionessel";
import { fiestasApi } from "../../api-web/fiestas";
import { useLoginStore } from "stores/loginStore";

const loginStore = useLoginStore();
const router = useRouter();
const route = useRoute();
const $q = useQuasar();
const idfiesta = ref(0);
const idbanda = ref(0);
const nmodo = ref(1);
// const disco = ref("");
//CANCION SEL
const idcancion = ref(0);
const nomcancion = ref("");
const cantante = ref("");
const disco = ref("");
const idusuariosweb = ref(0);

//TRAER FIESTA
const idplaylist = ref(0);
const nomfiesta = ref(0);
const codigofi = ref(0);
const fecha = ref(0);

const loading = ref(false);

const filter = ref("");
const canciones = ref([]);
const pagination = ref([]);
const selected = ref([]);
const payload2 = ref([]);
// const row = ref([]);

//TIEMPO DE ESPERA
const tiempoTotal = 900; // 15 minutos en segundos
const timeRemaining = ref(tiempoTotal);
const contadorEnMarcha = ref(false);

const iniciarContador = () => {
  if (!contadorEnMarcha.value) {
    contadorEnMarcha.value = true;
    startCountdown();
  }
};

const startCountdown = () => {
  const intervalId = setInterval(() => {
    timeRemaining.value -= 1;

    if (timeRemaining.value <= 0) {
      clearInterval(intervalId);
      contadorEnMarcha.value = false;
    }
  }, 1000);
};

const formatTime = (seconds) => {
  const minutos = Math.floor(seconds / 60);
  const segundos = seconds % 60;
  return `${minutos}:${segundos < 10 ? "0" : ""}${segundos}`;
};
////////////////////////////7

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
  idfiesta.value = parseInt(route.params.idfiesta);
  cargarinfo();
  consultar();
  watch(contadorEnMarcha, (newValue) => {
    if (!newValue) {
      // Reiniciar el tiempo cuando el contador se detiene
      timeRemaining.value = tiempoTotal;
    }
  });
});

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
      idplaylist.value = response.data.result.idplaylist;
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

const getSelectedString = () => {
  return selected.value.length === 0
    ? ""
    : `${selected.value.length} record${
        selected.value.length > 1 ? "s" : ""
      } selected of ${canciones.value.length}`;
};

const guardarCancion = async () => {
  let payload = {};
  let cancionessel = [];
  selected.value.forEach((element) => {
    let row = {};
    row = {
      idcancion: parseInt(element.idcancion),
      nomcancion: element.nomcancion,
      cantante: element.cantante,
      disco: element.disco,

      idplaylist: idplaylist.value,
      idfiesta: idfiesta.value,
      // idbanda: idbanda.value,
    };

    cancionessel.push(row);
  });

  payload = {
    cancionessel: cancionessel,
  };

  console.log("payload", payload);
  loading.value = true;

  /// modo nuevo.
  if (nmodo.value === 1) {
    await cancionesselApi
      .addCancionsel(payload)
      .then(() => {
        loading.value = false;
        $q.notify({
          color: "green",
          position: "top",
          message: "La canción ha sido agregada correctamente.",
          icon: "done_outline",
        });

        router.push({ name: "vistaTiempo" });
      })
      .catch((err) => {
        loading.value = false;
        console.log(err);
        $q.notify({
          color: "red",
          position: "top",
          message: "Problemas al grabar nueva zona.",
          icon: "report_problem",
        });
      });
  }

  // if (nmodo.value === 2) {
  //   // console.log("idcancion", idcancion.value);
  //   payloadData.idcancion = idcancion.value;
  //   // payloadData.idusuariosweb = idusuariosweb.value

  //   // this.cargarInfo(this.$route.params);
  //   cargarinfo();

  //   idcancion.value = await cancionesselApi
  //     .updateCancionsel(idcancion.value, payloadData)
  //     .then(() => {
  //       loading.value = false;
  //       $q.notify({
  //         color: "green",
  //         position: "top",
  //         message: "La canción ha sido actualizado correctamente.",
  //         icon: "done_outline",
  //       });
  //       router.push({ name: "catCanciones" });
  //     })
  //     .catch((err) => {
  //       loading.value = false;
  //       $q.notify({
  //         color: "red",
  //         position: "top",
  //         message: "Problemas al actualizar la canción.",
  //         icon: "report_problem",
  //       });
  //     });
  // }
};

// const getSelectedString = async () => {
//   return selected.value.length === 0
//     ? ""
//     : `${selected.value.length} record${
//         selected.value.length > 1 ? "s" : ""
//       } selected of ${rows.length}`;
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
