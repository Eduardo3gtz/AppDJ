<template>
  <q-page class="bg-grey-4 q-pa-md">
    <div class="row q-mt-xl">
      <div class="col-12 q-mt-xl">
        <q-input v-model="correo" outlined rounded label="Correo electronico">
          <template v-slot:prepend>
            <q-icon name="person" />
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

        <div class="row q-mt-md">
          <q-btn color="primary" class="full-width" label="Registrarse" />
        </div>
        <div class="row q-mt-md justify-end">
          <q-btn color="orange" class="q-mr-xs" label="Cambiar contraseña" />
          <q-separator></q-separator>
          <q-btn color="blue" glossy label="Login" />
        </div>
      </div>
    </div>
  </q-page>
</template>
  
  <script>
import { ref } from "vue";

export default {
  name: "PartidAS",
  data() {
    return {
      cantidad: 0,
      // leftDrawerOpen: false,
    };
  },
  setup() {
    return {
      password: ref(""),
      isPwd: ref(true),
      date: ref("2019/02/01"),
    };
  },
};
</script>
  