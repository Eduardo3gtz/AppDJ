<template>
  <q-page class="fondo">
    <div class="row justify-center">
      <div class="col-12 col-md-5 col-sm-11 col-xs-11 q-mt-xl">
        <q-card class="q-mt-xl q-pa-md">
          <q-toolbar>
            <!-- <q-avatar size="300px" class="q-ml-xl"> -->
            <q-img :src="imageUrl" />
            <!-- </q-avatar> -->
          </q-toolbar>

          <p>Iniciar el proceso de cambio de contraseña</p>
          <q-input v-model="email" outlined rounded label="Correo electrónico">
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <!-- <q-input
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
        </q-input> -->

          <div class="row q-mt-md">
            <q-btn
              :loading="loading"
              @click="consultar"
              color="primary"
              class="full-width"
              label="Cambiar contraseña"
            />
            <q-btn
              to="/"
              color="green"
              glossy
              class="q-mt-md full-width"
              label=" Login"
            />
          </div>

          <div class="row q-mt-md justify-end">
            <q-separator></q-separator>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
// import { trabajApi } from '../../api-web/trabaj'
import { useRouter, useRoute } from "vue-router";
import { useLoginStore } from "../../stores/loginStore";

// import imageUrl from '../../assets/logovacaciones.jpg'

//notify
import { useQuasar } from "quasar";
const $q = useQuasar();
const loginStore = useLoginStore();
//router
const router = useRouter();
const route = useRoute();

const email = ref("");
const loading = ref(false);

const validainfo = computed(() => {
  return email.value == "" ? true : false;
});

const consultar = async () => {
  if (validainfo.value) {
    $q.notify({
      color: "red",
      position: "top",
      message: "Debe registrar el correo.",
      icon: "report_problem",
    });
    return;
  }

  const userPayload = { email: email.value.trim().toLowerCase() };
  loading.value = true;
  loginStore
    .olvidaContra(userPayload)
    .then((response) => {
      console.log("olvidacontra response", response);
      const id = response.idusuariosweb.toString();

      // https://recar.mx/apiv3/api/v3/
      const curlbase = process.env.VITE_BASE_URL;
      const curl = curlbase.replace("/apiv3/api/v3/", "");

      let urlcambio = curl + "/vacaciones/#/cambiacontra/" + id;
      const logourl = curl + "/logovacaciones.jpg";
      // console.log('urlcambio', urlcambio)

      // console.log();
      const payload = {
        layout: "olvida.html",
        subject: "Modificar contraseña ",
        idusuariosweb: response.idusuariosweb,
        nomuser: response.nomuser,
        email: response.email,
        logo: logourl,
        color: "#1976D2",
        ruta: urlcambio,
        info1: "Plataforma de Control de Días de Vacaciones. Sait Software",
      };

      console.log(payload);
      enviarCorreoApi(payload);
    })
    .catch((err) => {
      console.log(err);
      $q.notify({
        color: "red",
        position: "top",
        message: "No se encontró el usuario o la contraseña es incorrecta",
        icon: "report_problem",
      });
      loading.value = false;
      loginStore.setLoguado(false);
    });
};

const enviarCorreoApi = async (payload) => {
  loading.value = true;
  loginStore
    .enviarcorreo(payload)
    .then((response) => {
      console.log("olvidacontra enviarcorreo", response);
      if (response) {
        $q.notify({
          color: "green",
          position: "top",
          message: "Correo enviado correctamente",
          icon: "report_problem",
        });

        loading.value = false;
        router.push("/");
      } else {
        $q.notify({
          color: "red",
          position: "top",
          message: "Falla al enviar correo.",
          icon: "report_problem",
        });
      }
    })
    .catch((error) => {
      $q.notify({
        color: "red",
        position: "top",
        message: "error al enviar correo.",
        icon: "report_problem",
      });
      console.log("error", error);
    });
};
</script>

<style scoped>
.fondo {
  background-size: 100%;
  background-image: url("https://fondosmil.com/fondo/465.jpg");
}
</style>
