<template>
  <q-page class="flex-center bg-grey-8">
    <div class="row">
      <div class="col q-mt-md">
        <q-card class="q-mx-md roundedcard">
          <div class="row">
            <div class="col q-mx-lg q-mt-md">
              <q-input
                class="q-mx- q-mt-md"
                outlined=""
                v-model="correo"
                label="Correo"
              ></q-input>
              <q-select
                v-model="nivel"
                outlined=""
                class="q-mt-md"
                :options="niveles"
                label="Rol"
              />
              <q-btn
                push
                color="indigo"
                to="panelview"
                class="full-width q-mt-md"
                >Continuar</q-btn
              >
              <q-btn push class="full-width q-mt-md q-mb-md" to="/"
                >Ya tengo cuenta</q-btn
              >
            </div>
          </div>
        </q-card>
        <!-- <q-img
          fit="contain"
          height="300px"
          class="rounded-borders q-mt-xl"
          src="../../assets/party2.png"
        /> -->
        <!-- <p>PartyMix</p> -->

        <!-- <q-card class="my-card roundedcard" flat bordered>
          <q-card-section horizontal>
            <q-img
              class="col-5"
              src="https://cdn.quasar.dev/img/parallax2.jpg"
            />
            <q-card-section>
              <P class="titulo">Entrar como <b>INVITADO</b></P>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
              debitis a, eaque repudiandae praesentium aliquam facere delectus
              earum possimus,
            </q-card-section>
          </q-card-section>
        </q-card> -->
      </div>
    </div>
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    > -->
  </q-page>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
const niveles = ref(["DJ", "Usuario"]);

const nivel = ref("");
const correo = ref("");
</script>

<style scoped>
.titulo {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 20px;
}

.roundedcard {
  border-radius: 15px 15px 15px 15px;
}
</style>
