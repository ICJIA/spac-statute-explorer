<template>
  <v-app>
    <v-app-bar app color="blue darken-4" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>
      <v-toolbar-title
        class="hover hidden-sm-and-down"
        @click="
          $router.push('/').catch((err) => {
            $vuetify.goTo(0);
          })
        "
        ><span style="font-weight: 900 !important" class="agency ml-3"
          >ILLINOIS STATUTE EXPLORER TEST</span
        ></v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://github.com/ICJIA/spac-statute-explorer"
        target="_blank"
        >GitHub<v-icon right>open_in_new</v-icon></v-btn
      >
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
