<template>
  <q-page class="fondo">
    <div class="row justify-center">
      <div class="col-12 col-md-5 col-sm-11 col-xs-11 q-mt-xl">
        <q-card class="q-mt-xl q-pa-md">
          <q-toolbar class="bg-blue text-white">
            <!-- <q-avatar size="300px" class="q-ml-xl"> -->
            <q-toolbar-title> Cambiar Contraseña </q-toolbar-title>

            <!-- </q-avatar> -->
          </q-toolbar>
          <q-img :src="imageUrl" />

          <!-- <p>Iniciar el proceso de cambio de contraseña</p> -->
          <q-input
            v-model="nomuser"
            readonly
            outlined
            rounded
            label="Bienvenido"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-input
            class="q-mt-md"
            v-model="email"
            readonly
            outlined
            rounded
            label="Correo electrónico"
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
              <q-icon name="lock" />
            </template>

            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <div class="row q-mt-md">
            <q-btn
              :loading="loading"
              @click="cambiacontra"
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
import { sha256 } from "js-sha256";
import { ref, computed, onMounted } from "vue";
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

const nomuser = ref("");
const email = ref("");
const emailOrg = ref("");
const password = ref("");
const id = ref("");
const isPwd = ref(true);

const loading = ref(false);

const validainfo = computed(() => {
  // return email.value == '' ? true : false
  return email.value !== "" && password.value !== "";
});

onMounted(() => {
  id.value = route.params.id;
  console.log("id", id.value);
  getdatosuser();
});

const getdatosuser = async () => {
  const payload = { Idusuariosweb: parseInt(id.value) };
  // const userPayload = { email: email.value.trim().toLowerCase() }
  loading.value = true;
  loginStore
    .getUsarxId(payload)
    .then((response) => {
      loading.value = false;
      console.log(response);
      email.value = response.email;
      nomuser.value = response.nomuser;
      emailOrg.value = response.email;
    })
    .catch((err) => {
      console.log(err);
      $q.notify({
        color: "red",
        position: "top",
        message: "No se encontró el usuario",
        icon: "report_problem",
      });
      loading.value = false;
      loginStore.setLoguado(false);
    });
};

const cambiacontra = async () => {
  // if (validainfo.value) {
  //   $q.notify({
  //     color: 'red',
  //     position: 'top',
  //     message: 'Debe registrar el correo.',
  //     icon: 'report_problem'
  //   })
  //   return
  // }

  if (emailOrg.value != email.value) {
    $q.notify({
      color: "red",
      position: "top",
      message: "No debes cambiar el correo.",
      icon: "report_problem",
    });
    return;
  }

  const payload = { password: sha256(password.value) };

  // const payload = { Idusuariosweb: parseInt(id.value) }
  // const userPayload = { email: email.value.trim().toLowerCase() }

  loading.value = true;
  loginStore
    .cambiarcontra(id.value, payload)
    .then((response) => {
      $q.notify({
        color: "green",
        position: "top",
        message: "Contraseña actualizada correctamente",
        icon: "done",
      });
      console.log("OK response", response);
      loading.value = false;
      router.push("/");
    })
    .catch((err) => {
      console.log("error response", err);
      $q.notify({
        color: "red",
        position: "top",
        message: "Falla al cambiar contraseña",
        icon: "report_problem",
      });
      loading.value = false;
      loginStore.setLoguado(false);
    });
};
</script>

<style scoped>
.fondo {
  background-size: 100%;
  background-image: url("https://fondosmil.com/fondo/465.jpg");
}
</style>
