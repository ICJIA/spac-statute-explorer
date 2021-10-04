<template>
  <v-container class="markdown-body">
    <v-row>
      <v-col>
        <div v-if="$store.state.isDbReady">
          <v-text-field
            v-model="keyword"
            filled
            label="Keyword search (Must be more than 3 characters)"
            v-on:keyup="buildSqlStatement(keyword)"
            style="font-weight: bold !important"
          ></v-text-field>
          <v-container fluid style="padding: 0; margin: 0; margin-top: 0px"
            ><v-row>
              <v-col cols="12" md="8">
                <v-text-field
                  v-model="metadata.message"
                  hint="Must (re)execute query in order to apply updated header"
                  label="Header message for exports"
                  style="font-size: 12px; font-weight: bold"
                ></v-text-field> </v-col
              ><v-col cols="12" md="4">
                <v-text-field
                  v-model="metadata.timestamp"
                  disabled
                  label="Query timestamp"
                  style="font-size: 12px; font-weight: bold"
                ></v-text-field> </v-col></v-row
          ></v-container>

          <v-textarea
            v-model="sqlStatement"
            name="input"
            class="mt-10"
            ref="sql"
            label="Enter SQL here"
            outlined
            hint="Press 'Enter' to execute SQL"
          ></v-textarea>
        </div>

        <div
          v-if="!$store.state.isDbReady"
          style="height: 200px"
          class="text-center"
        >
          <div>
            <img
              :src="require('../assets/spac-purple-default-min.png')"
              alt="SPAC logo"
              width="200"
            />
          </div>
          <div style="margin-top: -20px">
            <img
              :src="require('../assets/spac-loader.gif')"
              alt="Loading indicator"
            />
          </div>

          <div class="mt-4" style="font-size: 12px; font-weight: bold">
            Initializing. Please wait...
          </div>
        </div>
        <div class="d-flex mt-4" v-if="$store.state.isDbReady">
          <v-btn small class="mr-2" @click="listTables()"
            >Show all tables</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn small outlined class="mr-2" @click="clear()">Clear</v-btn>
          <v-btn small class="mr-2" @click="reset()">Reset</v-btn>
          <v-btn small @click="execute()" dark color="purple darken-4"
            >Execute SQL<v-icon right large>arrow_right</v-icon></v-btn
          >
        </div>

        <pre
          class="error mt-5"
          v-if="err && $store.state.isDbReady"
          style="width: 100%"
          >{{ err.toString() }}</pre
        >
        <pre
          class="error mt-5"
          v-if="status && $store.state.isDbReady"
          style="width: 100%"
        >
No results</pre
        >

        <pre class="error mt-5" v-if="$store.state.error" style="width: 100%">{{
          $store.state.error.toString()
        }}</pre>

        <div>
          <div
            v-if="queryTime && res && !err"
            style="font-size: 12px"
            class="mr-2 mt-12 d-flex"
          >
            <span v-if="keyword.length">
              Keyword
              <strong
                ><span style="color: purple">&nbsp;{{ keyword }}</span></strong
              ></span
            >
            <v-spacer></v-spacer>
            Database
            <strong>&nbsp;{{ database }}</strong
            >&nbsp;/&nbsp;Query
            <strong>&nbsp;{{ queryTime }}ms</strong>&nbsp;/&nbsp;Rows returned
            <strong>&nbsp;{{ queryLength }}</strong>
          </div>

          <div
            id="results"
            class="mt-6 pt-6"
            :class="{ divider: $store.state.isDbReady && res }"
          ></div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import initSqlJs from "sql.js";
// import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";
const FileSaver = require("file-saver");
// import { saveAs } from "file-saver";
export default {
  name: "Home",
  watch: {},
  data() {
    return {
      databases: ["statutes.db", "chinook.db"],
      res: null,
      err: null,
      sqlStatement: null,
      db: null,
      columns: null,
      values: null,
      queryTime: null,
      queryLength: null,
      loading: null,
      ready: false,
      status: null,
      defaultKeyword: "cannabis",
      keyword: "cannabis",
      database: "statutes.db",
      defaultSelect: ` `,

      metadata: {
        message:
          "This is a custom header message and will appear on exported files",
        timestamp: null,
      },
      messageTop: null,
    };
  },

  methods: {
    buildMessageTop() {
      this.metadata.timestamp = new Date().toLocaleString();
      const messageTop = `${this.metadata.message} | Timestamp: ${this.metadata.timestamp}`;
      return messageTop;
    },
    listTables() {
      this.sqlStatement = "select * from sqlite_master where type='table'";
      this.loading = true;
      this.fetchData();
      this.keyword = "";
    },

    trim(val) {
      if (!val) return;
      return val.toString().replace(/^\s+|\s+$/g, "");
    },
    reset() {
      this.res = null;
      this.err = null;
      const el = document.getElementById("results");
      el.innerHTML = "";
      this.keyword = "cannabis";
      this.metadata.message =
        "This is a custom header message and will appear on exported files";
      this.sqlStatement = this.buildSqlStatement(this.keyword);
      this.$store.commit("setClearError");
    },
    clear() {
      this.sqlStatement = "";
      this.res = null;
      this.err = null;
      const el = document.getElementById("results");
      this.keyword = "";
      el.innerHTML = "";
    },
    buildResultsTable() {
      window.NProgress.start();

      const el = document.getElementById("results");

      let columnNames = this.columns.map((col) => {
        return `<th >${col}</th>`;
      });
      // let columnToggles = this.columns.map((col, idx) => {
      //   return `<a class="toggle-vis column" data-column="${idx}">${col}</a>&nbsp;&nbsp;&nbsp;`;
      // });

      //console.log(columnNames);
      let rows = this.values.map((row) => {
        return `<tr style="display: relative !important;">${row
          // eslint-disable-next-line no-unused-vars
          .map((cell, idx) => {
            let col = columnNames[idx].replace(new RegExp("<[^>]*>", "g"), "");
            let result;
            if (col === "StatuteText") {
              let text = cell;
              let formattedText = text
                .replace(/@0@/gi, "\n\n")
                .replace(/@1@/gi, "\n\n&nbsp;&nbsp;&nbsp;&nbsp;")
                .replace(
                  /@2@/gi,
                  "\n\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                );

              result = `<td class="px-4 py-2"><pre>${formattedText}</pre></td>`;
            } else {
              result = `<td class="px-4 py-6"><strong>${cell}</strong></td>`;
            }
            return result;
          })
          .join("")}</tr>`;
      });

      const table = `
      <div style="" >
        <div style="font-size: 12px; background: #fff; padding: 3px; margin-top: -23px; padding: 5px;" class="mb-12">
          
        <table style="font-size: 12px; width: 100% !important;" class="pt-6 px-3; " id="myTable">
          <thead>
            <tr>
              ${columnNames.join("")}
            </tr>
          </thead>
          <tbody>
              ${rows.join("")}
          </tbody>
        </table>
      </div>`;
      el.innerHTML = table;
      console.log("db table built");

      // eslint-disable-next-line no-unused-vars
      let myTable = window.$("#myTable").DataTable({
        responsive: true,
        dom: "iBfrtlp",
        fixedHeader: true,
        pageLength: 25,
        lengthMenu: [10, 25, 50, 100, 250],
        buttons: [
          {
            extend: "copyHtml5",
            text: "Copy",
            titleAttr: "Copy to clipboard",
          },
          {
            extend: "excel",
            text: "Excel",
            messageTop: window.$vue.buildMessageTop(),
            titleAttr: "Save as Excel",
          },
          {
            extend: "pdfHtml5",
            text: "PDF",
            messageTop: window.$vue.buildMessageTop(),
            titleAttr: "Save as PDF",
          },

          {
            text: "JSON",
            titleAttr: "Save as JSON",
            action: function () {
              let filename = `statute-explorer-${Date.now()}.json`;
              let file = new File([JSON.stringify(window.$vue.res)], filename, {
                type: "application/json;charset=utf-8",
              });
              FileSaver.saveAs(file);
            },
          },
          {
            extend: "print",
            text: "Print",
            titleAttr: "Show Print friendly version",
            autoPrint: false,
            messageTop: window.$vue.messageTop,
            exportOptions: {
              stripHtml: true,
            },
          },
          {
            extend: "colvis",

            titleAttr: "Toggle table columns on or off",
          },
          {
            text: "Reload&nbsp;&nbsp;<i class='fa fa-refresh'></i>",
            titleAttr: "Reload SQL query",
            action: function () {
              window.$vue.execute();
            },
          },
        ],
        language: {
          search: "Filter: ",
          info: "Showing _START_ to _END_ of _TOTAL_ results  ",
        },
        oLanguage: {
          sLengthMenu: "Show _MENU_ results per page",
        },
      });
      window.$("a.toggle-vis").on("click", function (e) {
        e.preventDefault();

        // Get the column API object
        var column = myTable.column(window.$(this).attr("data-column"));

        // Toggle the visibility
        column.visible(!column.visible());
      });
      window.NProgress.done();
    },
    execute() {
      this.loading = true;
      this.fetchData();
    },
    async selectDatabase() {
      this.queryTime = null;
      this.queryLength = null;
      this.res = null;
      const el = document.getElementById("results");
      el.innerHTML = "";
      window.NProgress.start();

      await this.initialize();
      // this.fetchData();
      window.NProgress.done();
    },
    async fetchData() {
      this.err = null;
      const el = document.getElementById("results");
      el.innerHTML = `Building results table ...`;
      window.NProgress.start();
      const before = Date.now();
      try {
        let db = this.$store.state.db;
        const res = await db.exec(this.sqlStatement);
        console.log("db queried");
        if (!res.length) {
          console.log("no results");
          this.err = "No results";
          el.innerHTML = ``;
          window.NProgress.done();
          return;
        }
        this.res = res[0];
        this.metadata.timestamp = new Date().toLocaleString();
        this.res.metadata = this.metadata;
        this.messageTop = this.buildMessageTop();
        this.columns = res[0].columns;
        this.values = res[0].values;
        this.queryLength = res[0].values.length;
        this.loading = false;
        const after = Date.now();
        this.queryTime = after - before;

        this.buildResultsTable();
      } catch (err) {
        console.log(err);
        this.err = err;
        window.NProgress.done();
        el.innerHTML = "";
        this.loading = false;
      }
      window.NProgress.done();
    },
    async initialize() {
      this.buildSqlStatement(this.defaultKeyword);
    },
    buildSqlStatement(keyword) {
      if (keyword.length < 4) return;
      this.$gtag.event("keywordSearch", {
        event_category: "sqlStatement",
        event_label: keyword,
      });
      //console.log(keyword);
      this.$nextTick(() => {
        let sqlStatement = `select id, statute, StatuteText from tbl_statutes where StatuteText like "%${keyword}%"`;
        this.sqlStatement = sqlStatement;
        //console.log(this.sqlStatement);
        this.res = null;
        this.err = null;
        const el = document.getElementById("results");
        el.innerHTML = "";
        this.loading = true;
        //this.fetchData();
      });
    },
  },

  async mounted() {
    this.selectDatabase();
    window.$vue = this;
    document.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        this.execute();
      }
    });
  },
  beforeDestroy() {
    document.removeEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        this.execute();
      }
    });
  },
};
</script>

<style></style>
