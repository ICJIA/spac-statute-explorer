<template>
  <v-dialog v-model="dialog" width="90%" eager>
    <v-card>
      <v-card-title class="text-h5 grey lighten-2 px-4">
        <span class="hidden-sm-and-down"> SPAC Statute Explorer </span>

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
let FileSaver = require("file-saver");
export default {
  data() {
    return {
      dialog: false,
      code: null,
      windowTop: null,
      response: null,
      json: null,
    };
  },
  mounted() {
    EventBus.$on("show-statute", (payload) => {
      const el = document.getElementById("modalResults");
      this.dialog = true;
      this.code = payload.code;
      this.messageTop = payload.messageTop;
      this.response = payload.response.values[0][0]
        .replace(/@0@/gi, "\n\n")
        .replace(/@1@/gi, "\n\n&nbsp;&nbsp;&nbsp;&nbsp;")
        .replace(/@2@/gi, "\n\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
        .replace(
          /@3@/gi,
          "\n\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
        );

      let modalTable = `<table id="modalTable" style="width: 100%">
        <thead style="background: #333; color: #fff">
        <tr><th style="font-size: 22px !important">${this.code}</th></tr>
        </thead>
        <tbody>
          <tr >
            <td style="background: #fff;" >
              <pre class="pb-8 pt-2" style="font-size: 16px !important; color: #000 !important">${this.response}</pre>
            </td>
          </tr>
        </tbody>
      </table>`;
      el.innerHTML = modalTable;
      this.$nextTick(() => {
        window.$("#modalTable").DataTable({
          dom: "<'toolbar'>Brt",
          buttons: [
            {
              extend: "copyHtml5",
              text: "Copy",
              titleAttr: "Copy to clipboard",
              messageTop: payload.messageTop,
            },
            {
              extend: "excel",
              text: "Excel",
              messageTop: payload.messageTop,
              titleAttr: "Save as Excel",
            },
            {
              extend: "csv",
              text: "CSV",
              messageTop: payload.messageTop,
              titleAttr: "Save as CSV",
            },
            {
              extend: "pdfHtml5",
              text: "PDF",
              messageTop: payload.messageTop,
              titleAttr: "Save as PDF",
            },

            {
              extend: "print",
              text: "Print",
              titleAttr: "Show Print friendly version",
              autoPrint: false,
              messageTop: payload.messageTop,
              exportOptions: {
                columns: ":visible",
              },
            },
            {
              text: "JSON",
              titleAttr: "Save as JSON",
              action: function () {
                console.log(payload);
                let filename = `statute-explorer-${Date.now()}.json`;
                let file = new File(
                  [JSON.stringify(payload.response)],
                  filename,
                  {
                    type: "application/json;charset=utf-8",
                  }
                );
                FileSaver.saveAs(file);
              },
            },
          ],
        });
      });
    });
  },

  methods: {},
};
</script>

<style lang="scss" scoped></style>
