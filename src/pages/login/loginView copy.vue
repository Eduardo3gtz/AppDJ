<template>
  <q-page class="fondo">
    <div class="row justify-center">
      <div class="col-12 col-md-5 col-sm-11 col-xs-11 q-mt-xl">
        <q-card class="q-mt-xl q-pa-md">
          <div>V 1.3.0</div>

          <q-toolbar>
            <!-- <q-avatar size="300px" class="q-ml-xl"> -->
            <q-img :src="imageUrl" />
            <!-- </q-avatar> -->
          </q-toolbar>

          <q-input
            class="q-mt-md"
            v-model="email"
            ref="inputRef"
            :rules="emailRules"
            outlined
            rounded
            label="Email"
          >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>

          <q-input
            v-model="password"
            outlined
            rounded
            class="q-mt-md"
            label="Contraseña"
            :type="isPwd ? 'password' : 'text'"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>

            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div class="row q-mt-md justify-end">
            <div class="col-8">
              <q-btn
                color="orange"
                class="q-mr-xs full-width"
                to="olvidacontra"
                label="Cambiar contraseña"
                push
              />
            </div>
            <div class="col-4">
              <q-btn
                color="blue"
                @click="consultar"
                glossy
                class="full-width"
                push
                label="Login"
              />
            </div>

            <!-- <q-separator></q-separator> -->
          </div>

          <!-- <q-btn
            to="registrarse"
            push
            color="indigo"
            class="full-width q-mt-md"
            label="Registrarse"
          /> -->
        </q-card>
      </div>
    </div>
  </q-page>

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
import { ref } from "vue";
import { sha256 } from "js-sha256";
import imageUrl from "../../assets/party2.png";
import { useLoginStore } from "../../stores/loginStore";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
const router = useRouter();

const $q = useQuasar();
const loginStore = useLoginStore();
const email = ref("");
const password = ref("");
const isPwd = ref(true);
const loading = ref(false);

const emailRules = ref([
  (v) => !!v || "E-mail es requerido",
  (v) => /.+@.+/.test(v) || "E-mail debe ser válido",
]);

const consultar = () => {
  const usuario = {
    email: email.value.trim().toLocaleLowerCase(),
    password: sha256(password.value),
  };
  loading.value = true;

  loginStore
    .iniciarSesion(usuario)
    .then((result) => {
      loading.value = false;

      // console.log('result', result)

      if (result) {
        // $q.notify("Some other message");
        loginStore
          .buscarUsuario(usuario)
          .then(() => {
            // console.log('buscarusuario', reponse)
            // $q.notify({
            //   color: 'green',
            //   position: 'top',
            //   message: 'Bienvenido ',
            //   icon: 'report_problem'
            // })
            loading.value = false;
            router.push("/panelview");
          })
          .catch(() => {
            $q.notify({
              color: "red",
              position: "top",
              message:
                "No se encontró el usuario o la contraseña es incorrecta",
              icon: "report_problem",
            });
            loading.value = false;
            loginStore.setLoguado(false);
          });
      } else {
        $q.notify({
          color: "red",
          position: "top",
          message: "No se encontró el usuario o la contraseña es incorrecta",
          icon: "report_problem",
        });
        loading.value = false;
        loginStore.setLoguado(false);
      }
    })
    .catch(() => {
      loading.value = false;
      $q.notify({
        color: "red",
        position: "top",
        message: "Falla al consultar",
        icon: "report_problem",
      });
      console.log("Error");
    });
};
</script>

<style scoped>
.fondo {
  background-size: 100%;
  background-image: url("https://fondosmil.com/fondo/465.jpg");
}
</style>
