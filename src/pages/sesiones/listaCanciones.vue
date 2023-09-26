<template>
  <q-page class="bg-indigo">
    <q-toolbar class="bg-transparent" elevatio="0">
      <q-btn
        class="text-white"
        to="panelView"
        dense
        flat
        round
        icon="arrow_back"
        aria-label="Menu"
      />
      <q-space></q-space>
      <p class="q-mr-md datos text-white q-mt-md">Agrega canciones:</p>
      <q-space></q-space>
    </q-toolbar>
    <q-card class="roundedcard q-mx-md">
      <div class="row">
        <div class="col-10">
          <q-input
            dense
            v-model="searchQuery"
            @input="onInputChange"
            class="q-mx-md q-mt-sm q-mb-sm"
            label="Buscar canción"
          >
            <!-- <template v-slot:append>
              <q-icon name="search" @click="searchVideos" />
            </template> -->
          </q-input>
        </div>
        <div class="col-2">
          <q-btn
            class="q-mt-sm"
            @click="searchVideos"
            ro
            color="indigo-4"
            icon="search"
          />
        </div>
      </div>
    </q-card>

    <div class="q-mt-sm">
      <!-- <div>
        <input
          v-model="searchQuery"
          @input="onInputChange"
          placeholder="Buscar videos en YouTube"
        />
        <button @click="searchVideos">Buscar</button>
      </div> -->
      <q-list class="bg-grey-3">
        <q-item
          v-for="video in videos"
          :key="video.id.videoId"
          class="q-mt"
          clickable
          v-ripple
        >
          <q-item-section top avatar>
            <q-avatar rounded>
              <img :src="video.snippet.thumbnails.default.url" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">{{ video.snippet.title }}</q-item-label>
            <q-item-label lines="2" caption>{{
              video.snippet.description
            }}</q-item-label>
          </q-item-section>

          <!-- <q-item-section side top>
            <q-item-label caption>meta</q-item-label>
          </q-item-section> -->
        </q-item>
      </q-list>

      <!-- <li v-for="video in videos" :key="video.id.videoId">
        <a
          :href="'https://www.youtube.com/watch?v=' + video.id.videoId"
          target="_blank"
        >
          <img
            :src="video.snippet.thumbnails.default.url"
            alt="Miniatura del video"
          />
          <h3>{{ video.snippet.title }}</h3>
          <p>Publicado el {{ formatDate(video.snippet.publishedAt) }}</p>
          <p>{{ video.snippet.description }}</p>
        </a>
      </li> -->
      <!-- <button @click="loadMore">Cargar más videos</button> -->
    </div>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchQuery: "",
      videos: [],
      nextPageToken: "", // Para paginación
    };
  },
  // setup() {
  //   return {
  //     contacts,
  //   };
  // },
  methods: {
    onInputChange() {
      // Limpiar los resultados al cambiar la consulta
      this.videos = [];
      this.nextPageToken = "";
    },
    searchVideos() {
      const apiKey = "AIzaSyAFo2GEQvJLVyPht2IsioySstz7XDS3PMQ"; // Reemplaza con tu clave de API
      const apiUrl = "https://www.googleapis.com/youtube/v3/search";

      axios
        .get(apiUrl, {
          params: {
            key: apiKey,
            q: this.searchQuery,
            part: "snippet",
            maxResults: 3, // Cantidad de resultados por página
            type: "video",
            pageToken: this.nextPageToken, // Usar el token de la página siguiente
          },
        })
        .then((response) => {
          this.videos = [...this.videos, ...response.data.items];
          this.nextPageToken = response.data.nextPageToken; // Almacenar el token de la página siguiente
        })
        .catch((error) => {
          console.error("Error en la búsqueda de videos:", error);
        });
    },
    loadMore() {
      const apiKey = "TU_CLAVE_DE_API"; // Reemplaza con tu clave de API
      const apiUrl = "https://www.googleapis.com/youtube/v3/search";

      axios
        .get(apiUrl, {
          params: {
            key: apiKey,
            q: this.searchQuery,
            part: "snippet",
            maxResults: 5, // Cantidad de resultados por página
            type: "video",
            pageToken: this.nextPageToken, // Usar el token de la página siguiente
          },
        })
        .then((response) => {
          this.videos = [...this.videos, ...response.data.items];
          this.nextPageToken = response.data.nextPageToken; // Almacenar el token de la página siguiente
        })
        .catch((error) => {
          console.error("Error en la búsqueda de videos:", error);
        });
    },
    formatDate(dateString) {
      // Esta función podría formatear la fecha en un formato más legible.
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
};
</script>

<style scoped>
.roundedcard {
  border-radius: 15px 15px 15px 15px;
}

.roundedcard2 {
  border-radius: 15px 15px 0px 0px;
}

.fuente {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.datos {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 15px;
}
</style>
