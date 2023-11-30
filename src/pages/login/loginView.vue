<template>
  <q-page class="flex-center bg-white">
    <div class="row">
      <div class="col q-mt-md">
        <q-img
          fit="contain"
          height="300px"
          class="rounded-borders q-mt-xl"
          src="../../assets/party2.png"
        />
        <!-- <p>PartyMix</p> -->
        <q-input
          class="q-mx-lg"
          v-model="email"
          ref="inputRef"
          :rules="emailRules"
          label="Correo"
          filled
        ></q-input>

        <q-input
          v-model="password"
          filled
          class="q-mt-md q-mx-lg"
          label="Contraseña"
          :type="isPwd ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <div class="col q-mx-lg q-mt-md">
          <q-btn push @click="consultar" color="indigo" class="full-width"
            >Login</q-btn
          >
          <!-- ADMIN -->
          <!-- <q-btn
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
          > -->
          <!-- INVITADO -->

          <!-- <q-btn
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
          > -->

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
            <p>Version 2.0</p>
          </div>
        </div>
      </div>
    </div>
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
