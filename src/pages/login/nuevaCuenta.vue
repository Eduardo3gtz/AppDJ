<template>
  <q-page class="flex-center bg-grey-8">
    <div class="row">
      <div class="col q-mt-md">
        <q-card class="q-mx-md roundedcard">
          <div class="row">
            <div class="col q-mx-lg q-mt-md">
              <div class="row justify-center">
                <p style="font-size: 20px">Crea tu cuenta!</p>
              </div>
              <q-input
                class="q-mx- q-mt-md"
                outlined=""
                v-model="nomuser"
                label="Nombre de usuario"
              ></q-input>
              <q-input
                class="q-mx- q-mt-md"
                outlined=""
                v-model="email"
                label="Email"
              ></q-input>
              <q-input
                class="q-mx- q-mt-md"
                outlined=""
                v-model="password"
                label="Contraseña"
              ></q-input>
              <q-select
                v-model="modelnivel"
                :options="niveles"
                label="Nivel"
                dense
                outlined
                class="q-mr-md"
              />

              <q-btn
                push
                @click="crearCuenta"
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
import { sha256 } from "js-sha256";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
import { useLoginStore } from "stores/loginStore";
import { usuarioswebApi } from "../../api-web/usuariosweb";

const loginStore = useLoginStore();
const router = useRouter();
const route = useRoute();
const $q = useQuasar();

// const nivel = ref("");
// const nivel = ref([""]);
const nomuser = ref("");
const email = ref("");
const password = ref("");
// const email = ref("");

const loading = ref(false);
const nmodo = ref(1);

const modelnivel = ref({
  nomnivel: "",
  nivel: 8,
  label: "",
  value: 8,
});

const nivel = ref(15);
const nomnivel = ref("INVIT");

const niveles = ref([
  {
    nomnivel: "CANTA",
    label: "Banda",
    nivel: 5,
    value: 5,
  },
  {
    nomnivel: "INVIT",
    label: "Invitado",
    nivel: 15,
    value: 15,
  },
]);

const validainfo = () => {
  // console.log('ubica', ubica.value)
  if (nivel.value == "") {
    return true;
  } else {
    return false;
  }
};

const crearCuenta = async () => {
  if (validainfo() == true) {
    $q.notify({
      color: "red",
      position: "bottom",
      message: "Debes llenar el correo del usuario",
      icon: "report_problem",
    });
    return;
  }
  // Formar documentoData (payload)
  const payloadData = {
    nomuser: nomuser.value.trim(),
    email: email.value.trim().toLocaleLowerCase(),
    password: sha256(password.value),
    // nivel: "INVIT",
    nivel: modelnivel.value.nomnivel,
    estatus: 2,
  };

  // console.log("payloadData", payloadData);
  loading.value = true;

  /// modo nuevo.
  if (nmodo.value === 1) {
    await usuarioswebApi
      .addUsuariosweb(payloadData)
      .then(() => {
        loading.value = false;
        $q.notify({
          color: "green",
          position: "bottom",
          message: "El usuario ha sido agregado correctamente.",
          icon: "done_outline",
        });

        router.push({ name: "loginView" });
      })
      .catch((err) => {
        loading.value = false;
        console.log(err);
        $q.notify({
          color: "red",
          position: "bottom",
          message: "Problemas al grabar nuevo usuario.",
          icon: "report_problem",
        });
      });
  }

  // if (nmodo.value === 2) {
  //   // console.log("idcancion", idcancion.value);
  //   payloadData.idcancion = idcancion.value;
  //   // payloadData.idusuariosweb = idusuariosweb.value

  //   // this.cargarInfo(this.$route.params);
  //   cargarinfo();

  //   idcancion.value = await cancionesselApi
  //     .updateCancionsel(idcancion.value, payloadData)
  //     .then(() => {
  //       loading.value = false;
  //       $q.notify({
  //         color: "green",
  //         position: "top",
  //         message: "La canción ha sido actualizado correctamente.",
  //         icon: "done_outline",
  //       });
  //       router.push({ name: "catCanciones" });
  //     })
  //     .catch((err) => {
  //       loading.value = false;
  //       $q.notify({
  //         color: "red",
  //         position: "top",
  //         message: "Problemas al actualizar la canción.",
  //         icon: "report_problem",
  //       });
  //     });
  // }
};
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
