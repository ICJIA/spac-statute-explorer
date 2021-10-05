<template>
  <v-dialog v-model="dialog" width="90%">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        {{ code }}
      </v-card-title>

      <v-card-text class="mt-5 pb-12 pt-2" style="color: #111">
        <pre v-html="response"></pre>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { EventBus } from "@/event-bus";
export default {
  data() {
    return {
      dialog: false,
      code: null,

      response: null,
    };
  },
  mounted() {
    EventBus.$on("show-statute", (payload) => {
      this.dialog = true;
      this.code = payload.code;
      this.response = payload.response[0].values[0][0]
        .replace(/@0@/gi, "\n\n")
        .replace(/@1@/gi, "\n\n&nbsp;&nbsp;&nbsp;&nbsp;")
        .replace(/@2@/gi, "\n\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
    });
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
