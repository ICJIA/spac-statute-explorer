<template>
  <v-app id="pageTop">
    <v-app-bar app color="grey lighten-4" height="90">
      <div class="d-flex align-center">
        <v-img
          alt="SPAC Logo"
          class="shrink mr-2"
          contain
          :src="require('./assets/spac-purple-default-min.png')"
          transition="scale-transition"
          width="80"
        />
      </div>
      <v-toolbar-title
        class="hover hidden-sm-and-down"
        @click="
          $router.push('/').catch((err) => {
            $vuetify.goTo(0);
          })
        "
        ><span
          style="font-weight: 900 !important; color: #333; font-size: 24px"
          class="agency ml-3"
          >ILLINOIS STATUTE EXPLORER PLAYGROUND</span
        ></v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn dark text to="/" style="color: #333">Query builder</v-btn>
      <v-btn dark text to="/keyword/" style="color: #333">Keyword</v-btn>

      <v-btn dark text to="/sql/" style="color: #333">Raw SQL</v-btn>
      <!-- <v-btn dark text to="/sandbox/" style="color: #333">Sandbox 1</v-btn>
      <v-btn dark text to="/sandbox2/" style="color: #333">Sandbox 2</v-btn> -->
      <v-btn
        class="mr-12"
        text
        dark
        href="https://github.com/ICJIA/spac-statute-explorer"
        rel="noopener"
        target="_blank"
        style="color: #333"
        >GitHub<v-icon right>open_in_new</v-icon></v-btn
      >
    </v-app-bar>

    <v-main class="mt-8">
      <router-view />
    </v-main>
    <StatuteModal></StatuteModal>
  </v-app>
</template>

<script>
// import { EventBus } from "@/event-bus";
import StatuteModal from "@/components/StatuteModal";
export default {
  components: {
    StatuteModal,
  },
  name: "App",
  data() {
    return {
      isReady: false,
      dialog: true,
    };
  },
  watch: {
    isReady(newValue, oldValue) {
      console.log("isReady changed", newValue, oldValue);
    },
  },
  created() {
    console.log("App init");
  },
  mounted() {},
};
</script>
