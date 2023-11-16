<template>
  <q-page class="bg-indigo">
    <div class="q-pa-md">
      <div class="row">
        <div class="row"></div>
        <div class="row"></div>
      </div>
      <div class="col-12 col-md-12">
        <q-card class="textogeneral roundedcard q-mt-md" flat>
          <q-item>
            <q-item-section>
              <q-item-label class="" style="font-size: 25px"
                >Bienvenido a <b class="text-indigo">Party Mixx!</b>
              </q-item-label>

              <!-- <q-item-label class="" style="font-size: 25px"
                >Hola, Banda MS!
              </q-item-label> -->
              <q-item-label caption lines="2" style="font-size: 14px">
                10/13/30
                <!-- 29 de Junio del 2023 -->
                <q-icon name="today"></q-icon
              ></q-item-label>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
      <!-- <q-card
        @click="irCrear"
        class="my-card bg-indigo roundedcard q-mt-xl"
        flat
        bordered
      >
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
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
      </q-card> -->

      <q-card
        @click="irUnirme"
        class="my-card bg- roundedcard q-mt-md"
        flat
        bordered
      >
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-h5 q-mt-sm q-mb-xs fuente">Elegir canciónes</div>
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

      <!-- <q-card
        @click="irUnirme"
        class="my-card bg-grey-8 roundedcard q-mt-md"
        flat
        bordered
      >
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-h5 q-mt-sm q-mb-xs text-white fuente">Modo DJ</div>
            <div class="text-caption text-white">
              Visualiza y reproduce la playlist de las fiestas.
            </div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-img
              fit="contain"
              height="100px"
              class="rounded-borders"
              src="../assets/dj.png"
            />
          </q-card-section>
        </q-card-section>
      </q-card> -->
      <q-card
        @click="irUnirme"
        class="my-card bg-grey-8 roundedcard q-mt-md"
        flat
        bordered
      >
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-h5 q-mt-sm q-mb-xs text-white fuente">
              Lista de canciones
            </div>
            <div class="text-caption text-white">
              Agrega tus canciones para que la gente vote.
            </div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-img
              fit="contain"
              height="100px"
              class="rounded-borders"
              src="../assets/dj.png"
            />
          </q-card-section>
        </q-card-section>
      </q-card>

      <q-card
        @click="irUnirme"
        class="my-card bg-blue-5 roundedcard q-mt-md"
        flat
        bordered
      >
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-h5 q-mt-sm q-mb-xs text-white fuente">
              Modo Fiesta
            </div>
            <div class="text-caption text-white">
              Entra y ve las canciones que quiere el publico.
            </div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-img
              fit="contain"
              height="100px"
              class="rounded-borders"
              src="../assets/dj.png"
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

const salir = () => {
  router.push({ name: "/" }); // Reemplaza '/otra-vista' con la ruta real de tu vista
};

const irUnirme = () => {
  router.push({ name: "catCanciones" }); // Reemplaza '/otra-vista' con la ruta real de tu vista
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
