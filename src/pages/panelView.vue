<template>
  <q-page class="">
    <div class="q-pa-md">
      <div></div>
      <q-card
        @click="irCrear"
        class="my-card bg-indigo roundedcard q-mt-xl"
        flat
        bordered
      >
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <!-- <div class="text-overline">Overline</div> -->
            <div class="text-h5 q-mt-sm q-mb-xs text-white fuente">
              Crear playlist
            </div>
            <div class="text-caption text-grey-4">
              Crea una nueva sesion de musica para tu fiesta o reunion, pasa el
              codigo de la reunion a tus invitados!.
            </div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-img
              fit="contain"
              height="100px"
              class="rounded-borders"
              src="../assets/siguiente.png"
            />
          </q-card-section>
        </q-card-section>
      </q-card>

      <q-card
        @click="irUnirme"
        class="my-card bg- roundedcard q-mt-md"
        flat
        bordered
      >
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <!-- <div class="text-overline">Overline</div> -->
            <div class="text-h5 q-mt-sm q-mb-xs fuente">
              Unirme a una playlist
            </div>
            <div class="text-caption text-grey">
              Unete a la sesión de un amigo y agrega tus canciones favoritas!.
            </div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-img
              fit="contain"
              height="100px"
              class="rounded-borders"
              src="../assets/sonido-de-onda.png"
            />
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const router = useRouter();

const $q = useQuasar();

const irCrear = () => {
  router.push({ name: "newSesion" }); // Reemplaza '/otra-vista' con la ruta real de tu vista
};

const irUnirme = () => {
  router.push({ name: "catSesiones" }); // Reemplaza '/otra-vista' con la ruta real de tu vista
};
</script>
<style scoped>
.center-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centrar horizontalmente */
  justify-content: center; /* Centrar verticalmente */
  height: 100vh; /* Establecer la altura al 100% de la ventana */
}

.center-element {
  margin: 10px; /* Agregar margen entre los elementos */
}

.roundedcard {
  border-radius: 15px 15px 15px 15px;
}

.fuente {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
