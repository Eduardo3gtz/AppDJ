<template>
  <q-page class="fondo">
    <div class="row justify-center">
      <div class="col-12 col-md-5 col-sm-11 col-xs-11 q-mt-xl">
        <q-card class="q-mt-xl q-pa-md">
          <q-toolbar class="bg-blue text-white">
            <q-toolbar-title> Activar Usuario </q-toolbar-title>
            <!-- <q-avatar size="300px" class="q-ml-xl"> -->
            <!-- </q-avatar> -->
          </q-toolbar>
          <q-img :src="imageUrl" />

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

          <div class="row q-mt-md">
            <q-btn
              :loading="loading"
              @click="activar"
              color="primary"
              class="full-width"
              label="Activar Usuarios"
            />
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
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
const id = ref("");

const loading = ref(false);

const validainfo = computed(() => {
  return email.value == "" ? true : false;
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
      // email.value = response.email
      nomuser.value = response.nomuser;
      // emailOrg.value = response.email
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

const activar = async () => {
  loading.value = true;
  loginStore
    .activarusuario(id.value)
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
      console.log(err);
      $q.notify({
        color: "red",
        position: "top",
        message: "Falla al activar el usuario",
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
