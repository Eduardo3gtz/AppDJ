<template>
  <q-page class="flex-center bg-white">
    <div class="row">
      <div class="col q-mt-md">
        <q-img
          fit="contain"
          height="300px"
          class="rounded-borders q-mt-xl"
          src="../assets/party2.png"
        />
        <!-- <p>PartyMix</p> -->
        <q-input
          class="q-mx-lg"
          v-model="correo"
          label="Correo"
          filled
        ></q-input>
        <div class="col q-mx-lg q-mt-md">
          <q-btn
            push
            @click="errorCorreo"
            color="indigo"
            v-if="
              correo != 'eduardo3gtz@gmail.com' &&
              correo != 'neftali_03@outlook.es' &&
              correo != 'vemiliogro@hotmail.com' &&
              correo != 'vanessay.hdzc@gmail.com' &&
              correo != 'leoge03@outlook.com'
            "
            class="full-width"
            >Login</q-btn
          >
          <!-- ADMIN -->
          <q-btn
            push
            @click="bienvenida"
            color="indigo"
            v-if="
              correo === 'eduardo3gtz@gmail.com' ||
              correo === 'neftali_03@outlook.es'
              // correo === 'vemiliogro@hotmail.com' ||
              // correo === 'vanessay.hdzc@gmail.com' ||
              // correo === 'leoge03@outlook.com'
            "
            to="panelgrupo"
            class="full-width"
            >Login</q-btn
          >
          <!-- INVITADO -->

          <q-btn
            push
            @click="bienvenida"
            color="indigo"
            v-if="
              // correo === 'eduardo3gtz@gmail.com' ||
              // correo === 'neftali_03@outlook.es'
              correo === 'vemiliogro@hotmail.com' ||
              correo === 'vanessay.hdzc@gmail.com' ||
              correo === 'leoge03@outlook.com'
            "
            to="panelinv"
            class="full-width"
            >Login</q-btn
          >

          <!-- <q-btn
            push
            @click="bienvenida"
            color="indigo"
            v-if="
              correo === 'eduardo3gtz@gmail.com' ||
              correo === 'neftali_03@outlook.es' ||
              correo === 'vemiliogro@hotmail.com' ||
              correo === 'vanessay.hdzc@gmail.com' ||
              correo === 'leoge03@outlook.com'
            "
            to="panelview"
            class="full-width"
            >Login</q-btn
          > -->

          <q-btn push to="nuevacuenta" class="full-width q-mt-md">
            Crear cuenta
          </q-btn>

          <div class="row justify-center q-mt-md">
            <p>Version 1.1</p>
          </div>
        </div>

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
//notify
import { useQuasar } from "quasar";
const $q = useQuasar();
const niveles = ref(["DJ", "Usuario"]);

// const nivel = ref("");
const correo = ref("");

const errorCorreo = () => {
  $q.notify({
    message: "Correo no encontrado.",
    color: "yellow-10",
    icon: "announcement",
    timeout: 1500,
  });
};

const bienvenida = () => {
  $q.notify({
    message: "Bienvenido.",
    color: "green",
    icon: "home",

    timeout: 1500,
  });
};
</script>

<style scoped>
.titulo {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 20px;
}

.roundedcard {
  border-radius: 30px 30px 30px 30px;
}
</style>
