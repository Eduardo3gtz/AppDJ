<template>
  <q-page class="bg-blue">
    <q-toolbar class="bg-transparent" elevatio="0">
      <q-btn
        class="text-white"
        to="/catfiestas"
        dense
        flat
        round
        icon="arrow_back"
        aria-label="Menu"
      />
      <q-space></q-space>
      <p class="q-mr-md datos text-white q-mt-md">Agregar evento:</p>
      <q-space></q-space>
    </q-toolbar>
    <div class="row">
      <div class="col">
        <q-card class="q-ma-md roundedcard">
          <q-item class="bg-white fuente">
            <q-item-section>
              <q-item-label>
                <!-- Fiesta de Fabian -->
                {{ nomfiesta }}
              </q-item-label>
              <q-item-label caption lines="2">
                <!-- Agrega las canciones que quieras a la lista, para que las ponga
                el dj -->
                {{ cantante }}
              </q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>{{ fecha }}</q-item-label>
              <q-icon name="star" color="yellow" />
            </q-item-section>
          </q-item>
        </q-card>

        <q-card class="q-mt-md roundedcard2 bg-grey-3">
          <q-separator></q-separator>

          <q-input
            class="q-mx-md q-mt-md"
            outlined
            v-model="nomfiesta"
            label="Descripción del evento"
          ></q-input>

          <q-input
            class="q-mx-md q-mt-md"
            outlined
            readonly
            v-model="codigofi"
            label="Codigo de acceso a playlist"
          ></q-input>

          <!-- <q-input
            class="q-mx-md q-mt-md"
            outlined
            v-model="disco"
            label="Album"
          ></q-input> -->

          <!-- <q-input
            class="q-mx-md q-mt-md"
            outlined
            v-model="cantante"
            label="Cantante / Grupo"
          ></q-input> -->

          <q-input
            outlined
            label="Fecha"
            class="q-mt-md q-mx-md"
            v-model="fecha"
            mask="date"
            :rules="['date']"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="fecha" today-btn="">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <div class="row justify-center">
            <q-btn
              label="Ir a playlist"
              color="black"
              :to="'/votosview/' + idfiesta"
              push
              class="q-mb-md"
            ></q-btn>
          </div>
          <div class="row justify-center q-mx-md">
            <q-btn
              label="Guardar"
              color="indigo-4"
              @click="saveinfo"
              push
              to="catfiestas"
              class="q-mb-md full-width"
            ></q-btn>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
import { fiestasApi } from "../../api-web/fiestas";
import { useLoginStore } from "stores/loginStore";
const loginStore = useLoginStore();

const router = useRouter();
const route = useRoute();
const $q = useQuasar();

const idfiesta = ref(0);
const nomfiesta = ref("");
const codigofi = ref("");
// const disco = ref("");
const loading = ref(false);
const idbanda = ref(0);
const idusuariosweb = ref(0);

const nmodo = ref(1);
const cmodo = ref("");

const m = new Date(Date.now() - new Date().getTimezoneOffset() * 60000);
const fecha = ref("");
fecha.value =
  m.getUTCFullYear() +
  "/" +
  ("0" + (m.getUTCMonth() + 1)).slice(-2) +
  "/" +
  ("0" + m.getUTCDate()).slice(-2);

onMounted(() => {
  idusuariosweb.value = loginStore.getUser.idusuariosweb;
  idbanda.value = loginStore.getUser.idbanda;
  console.log("route: ", route);
  if (route.params.idfiesta === "new" || route.params.idfiesta >= 1) {
    nmodo.value = 1;
    codigofi.value = generarCodigoAleatorio(5);
    cmodo.value = "Nueva";
  }

  if (route.params.idfiesta > 0) {
    nmodo.value = 2;
    cmodo.value = "Editar";
    idfiesta.value = parseInt(route.params.idfiesta);
    cargarinfo();
  } else {
    nmodo.value = 1;
  }
});

const generarCodigoAleatorio = (length) => {
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let codigo = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * caracteres.length);
    codigo += caracteres.charAt(randomIndex);
  }
  return codigo;
};

const validainfo = () => {
  // console.log('ubica', ubica.value)
  if (nomfiesta.value == "") {
    return true;
  } else {
    return false;
  }
};

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

const saveinfo = async () => {
  if (validainfo() == true) {
    $q.notify({
      color: "red",
      position: "bottom",
      message: "Debes llenar la descripción del evento",
      icon: "report_problem",
    });
    return;
  }

  // Formar documentoData (payload)
  const payloadData = {
    nomfiesta: nomfiesta.value,
    codigofi: codigofi.value,
    idbanda: loginStore.getUser.idbanda,
    fecha: fecha.value,
    // cantante: cantante.value,

    // idfiesta: parseInt(idfiesta.value),
  };

  // console.log("payloadData", payloadData);
  loading.value = true;

  /// modo nuevo.
  if (nmodo.value === 1) {
    await fiestasApi
      .addFiesta(payloadData)
      .then(() => {
        loading.value = false;
        $q.notify({
          color: "green",
          position: "bottom",
          message: "El evento ha sido agregado correctamente.",
          icon: "done_outline",
        });

        router.push({ name: "catFiestas" });
      })
      .catch((err) => {
        loading.value = false;
        console.log(err);
        $q.notify({
          color: "red",
          position: "bottom",
          message: "Problemas al grabar nueva evento.",
          icon: "report_problem",
        });
      });
  }

  if (nmodo.value === 2) {
    // console.log("idfiesta", idfiesta.value);
    payloadData.idfiesta = idfiesta.value;
    // payloadData.idusuariosweb = idusuariosweb.value

    // this.cargarInfo(this.$route.params);
    cargarinfo();

    idfiesta.value = await fiestasApi
      .updateFiesta(idfiesta.value, payloadData)
      .then(() => {
        loading.value = false;
        $q.notify({
          color: "green",
          position: "bottom",
          message: "El evento ha sido actualizado correctamente.",
          icon: "done_outline",
        });
        router.push({ name: "catFiestas" });
      })
      .catch((err) => {
        loading.value = false;
        $q.notify({
          color: "red",
          position: "bottom",
          message: "Problemas al actualizar el evento.",
          icon: "report_problem",
        });
      });
  }
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
