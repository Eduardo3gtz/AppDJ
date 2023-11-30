<template>
  <q-page class="bg-grey-8">
    <q-toolbar class="bg-transparent" elevatio="0">
      <q-btn
        class="text-white"
        to="/catcanciones"
        dense
        flat
        round
        icon="arrow_back"
        aria-label="Menu"
      />
      <q-space></q-space>
      <p class="q-mr-md datos text-white q-mt-md">Agregar canción:</p>
      <q-space></q-space>
    </q-toolbar>
    <div class="row">
      <div class="col">
        <q-card class="q-ma-md roundedcard">
          <q-item class="bg-white fuente">
            <q-item-section>
              <q-item-label>
                <!-- Fiesta de Fabian -->
                {{ nomcancion }}
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
            v-model="nomcancion"
            label="Nombre de la canción"
          ></q-input>

          <q-input
            class="q-mx-md q-mt-md"
            outlined
            v-model="disco"
            label="Album"
          ></q-input>

          <q-input
            class="q-mx-md q-mt-md"
            outlined
            v-model="cantante"
            label="Cantante / Grupo"
          ></q-input>

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
                  <q-date v-model="fecha">
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
              label="Guardar"
              color="indigo-4"
              @click="saveinfo"
              push
              to="listaCanciones"
              class="q-mb-md"
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
import { cancionesApi } from "../../api-web/canciones";

const router = useRouter();
const route = useRoute();
const $q = useQuasar();

const idcancion = ref(0);
const nomcancion = ref("");
const disco = ref("");
const loading = ref(false);
const cantante = ref("");

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
  console.log("route: ", route);
  if (route.params.idcancion === "new" || route.params.idcancion >= 1) {
    nmodo.value = 1;
    cmodo.value = "Nueva";
  }

  if (route.params.idcancion > 0) {
    nmodo.value = 2;
    cmodo.value = "Editar";
    idcancion.value = parseInt(route.params.idcancion);
    cargarinfo();
  } else {
    nmodo.value = 1;
  }
});

const validainfo = () => {
  // console.log('ubica', ubica.value)
  if (nomcancion.value == "") {
    return true;
  } else {
    return false;
  }
};

const cargarinfo = async () => {
  // console.log(id.value)
  //Hacer consulta para traer datos del trabajador

  await cancionesApi
    .getCancion(idcancion.value)
    .then((response) => {
      loading.value = false;
      console.log(response);

      nomcancion.value = response.data.result.nomcancion;
      disco.value = response.data.result.disco;
      fecha.value = response.data.result.fecha;
      cantante.value = response.data.result.cantante;
    })
    .catch((err) => {
      loading.value = false;
      console.log(err);
      $q.notify({
        color: "red",
        position: "top",
        message: "Problemas al cargar los datos del cliente.",
        icon: "report_problem",
      });
    });
};

const saveinfo = async () => {
  if (validainfo() == true) {
    $q.notify({
      color: "red",
      position: "top",
      message: "Debes llenar el nombre de la canción",
      icon: "report_problem",
    });
    return;
  }

  // Formar documentoData (payload)
  const payloadData = {
    nomcancion: nomcancion.value,
    disco: disco.value,
    fecha: fecha.value,
    cantante: cantante.value,

    // idcancion: parseInt(idcancion.value),
  };

  // console.log("payloadData", payloadData);
  loading.value = true;

  /// modo nuevo.
  if (nmodo.value === 1) {
    await cancionesApi
      .addCancion(payloadData)
      .then(() => {
        loading.value = false;
        $q.notify({
          color: "green",
          position: "top",
          message: "La canción ha sido agregada correctamente.",
          icon: "done_outline",
        });

        router.push({ name: "catCanciones" });
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

  if (nmodo.value === 2) {
    // console.log("idcancion", idcancion.value);
    payloadData.idcancion = idcancion.value;
    // payloadData.idusuariosweb = idusuariosweb.value

    // this.cargarInfo(this.$route.params);
    cargarinfo();

    idcancion.value = await cancionesApi
      .updateCancion(idcancion.value, payloadData)
      .then(() => {
        loading.value = false;
        $q.notify({
          color: "green",
          position: "top",
          message: "La canción ha sido actualizado correctamente.",
          icon: "done_outline",
        });
        router.push({ name: "catCanciones" });
      })
      .catch((err) => {
        loading.value = false;
        $q.notify({
          color: "red",
          position: "top",
          message: "Problemas al actualizar la canción.",
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
