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
        <q-input class="q-mx-lg" label="Correo" filled></q-input>
        <div class="col q-mx-lg q-mt-md">
          <q-btn push color="indigo" to="panelview" class="full-width"
            >Login</q-btn
          >
          <q-btn push class="full-width q-mt-md">Crear cuenta</q-btn>
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

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
});
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
