<template>
  <v-dialog v-model="dialog" width="90%" eager>
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        {{ code }}
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false"
          >CLOSE<v-icon right>close</v-icon></v-btn
        >
      </v-card-title>
      <table id="modal" class="markdown-body" style="width: 100%">
        <thead></thead>
        <tbody>
          <tr>
            <td style="background: #fff">
              <pre>{{ response }}</pre>
            </td>
          </tr>
        </tbody>
      </table>
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
  created() {
    EventBus.$on("show-statute", (payload) => {
      this.dialog = true;
      this.code = payload.code;
      this.response = payload.response[0].values[0][0]
        .replace(/@0@/gi, "\n\n")
        .replace(/@1@/gi, "\n\n&nbsp;&nbsp;&nbsp;&nbsp;")
        .replace(/@2@/gi, "\n\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
        .replace(
          /@3@/gi,
          "\n\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
        );
    });
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
