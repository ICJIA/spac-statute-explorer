<template>
  <v-dialog v-model="dialog" width="90%" eager>
    <v-card>
      <v-card-title class="text-h5 grey lighten-2 px-4">
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="dialog = false"
          style="font-weight: 900"
          >CLOSE<v-icon right>close</v-icon></v-btn
        >
      </v-card-title>
      <div id="modalResults" class="my-3 px-4 pb-10"></div>
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
      const el = document.getElementById("modalResults");
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

      let modalTable = `<table id="modalTable" style="width: 100%">
        <thead style="background: #333; color: #fff">
        <tr><th >${this.code}</th></tr>
        </thead>
        <tbody>
          <tr >
            <td style="background: #fff" >
              <pre class="pb-8 pt-2">${this.response}</pre>
            </td>
          </tr>
        </tbody>
      </table>`;
      el.innerHTML = modalTable;
      this.$nextTick(() => {
        window.$("#modalTable").DataTable({
          dom: "<'toolbar'>Brt",
        });
      });
    });
  },

  methods: {},
};
</script>

<style lang="scss" scoped></style>
