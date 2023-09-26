<template>
  <q-page class="bg-indigo">
    <q-toolbar class="bg-transparent" elevatio="0">
      <q-btn
        class="text-white"
        to="panelView"
        dense
        flat
        round
        icon="arrow_back"
        aria-label="Menu"
      />
      <q-space></q-space>
      <p class="q-mr-md datos text-white q-mt-md">Playlist:</p>
      <q-space></q-space>
    </q-toolbar>
    <div class="row">
      <div class="col">
        <q-card class="q-ma-md roundedcard">
          <q-item class="bg-white fuente">
            <q-item-section>
              <q-item-label>
                <!-- Fiesta de Fabian -->
                {{ nomplay }}
              </q-item-label>
              <q-item-label caption lines="2">
                <!-- Agrega las canciones que quieras a la lista, para que las ponga
                el dj -->
                {{ desplay }}
              </q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>{{ fecha }}</q-item-label>
              <q-icon name="star" color="yellow" />
            </q-item-section>
          </q-item>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const router = useRouter();
const $q = useQuasar();

const nomplay = ref("");
const desplay = ref("");

const m = new Date(Date.now() - new Date().getTimezoneOffset() * 60000);
const fecha = ref("");
fecha.value =
  m.getUTCFullYear() +
  "/" +
  ("0" + (m.getUTCMonth() + 1)).slice(-2) +
  "/" +
  ("0" + m.getUTCDate()).slice(-2);

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
