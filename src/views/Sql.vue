<template>
  <v-container class="markdown-body">
    <v-row>
      <v-col>
        <div v-if="$store.state.isDbReady">
          <!-- <v-select
            :items="databases"
            filled
            label="Select a database"
            v-model="database"
            v-on:change="selectDatabase()"
          ></v-select> -->
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
            hint="Press Enter to execute query"
            outlined
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

        <div>
          <div
            v-if="queryTime && res && !err"
            style="font-size: 12px"
            class="mr-2 mt-12 d-flex"
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
            class="mt-0 pt-0"
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
let FileSaver = require("file-saver");
function doubleScroll(element) {
  var scrollbar = document.createElement("div");
  scrollbar.appendChild(document.createElement("div"));
  scrollbar.style.overflow = "auto";
  scrollbar.style.overflowY = "hidden";
  scrollbar.style.marginBottom = "15px";
  scrollbar.firstChild.style.width = element.scrollWidth + "px";
  scrollbar.firstChild.style.paddingTop = "1px";

  scrollbar.firstChild.appendChild(document.createTextNode("\xA0"));
  var running = false;
  scrollbar.onscroll = function () {
    if (running) {
      running = false;
      return;
    }
    running = true;
    element.scrollLeft = scrollbar.scrollLeft;
  };
  element.onscroll = function () {
    if (running) {
      running = false;
      return;
    }
    running = true;
    scrollbar.scrollLeft = element.scrollLeft;
  };
  element.parentNode.insertBefore(scrollbar, element);
}

export default {
  name: "Home",
  watch: {},
  data() {
    return {
      res: null,
      err: null,
      sqlStatement: "select * from sqlite_master where type='table'",
      db: null,
      columns: null,
      values: null,
      queryTime: null,
      queryLength: null,
      loading: null,
      ready: false,
      status: null,
      database: "statutes.db",
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
      const messageTop = `${this.metadata.message} | Timestamp: ${this.metadata.timestamp}`;
      return messageTop;
    },
    listTables() {
      this.sqlStatement = "select * from sqlite_master where type='table'";
      this.loading = true;
      this.fetchData();
    },

    trim(val) {
      if (!val) return;
      return val.toString().replace(/^\s+|\s+$/g, "");
    },
    reset() {
      this.sqlStatement = "select * from sqlite_master where type='table'";
      this.res = null;
      this.err = null;
      const el = document.getElementById("results");
      el.innerHTML = "";
      this.metadata.message =
        "This is a custom header message and will appear on exported files";
      //this.fetchData();
    },
    clear() {
      this.sqlStatement = "";
      this.res = null;
      this.err = null;
      const el = document.getElementById("results");
      el.innerHTML = "";
    },
    buildResultsTable() {
      window.NProgress.start();
      window.$("#results").hide();
      this.loading = true;
      const el = document.getElementById("results");

      let columnNames = this.columns.map((col) => {
        return `<th>${col}</th>`;
      });

      // let columnToggles = this.columns.map((col, idx) => {
      //   return `<a class="toggle-vis column" data-column="${idx}">${col}</a>&nbsp;&nbsp;&nbsp;`;
      // });

      let rows = this.values.map((row) => {
        return `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`;
      });

      const table = `
      <div style="overflow-x: auto;" id="doublescroll">
        <table style="font-size: 12px; width: 100% !important;" border="1" class="pt-6 px-3; " id="myTable">
      
          <thead>
            <tr>
              ${columnNames.join("")}
            </tr>
          </thead>
          <tbody>
            
                ${rows.join("")}
              
          </tbody>
        </table>
        </div>
      `;
      el.innerHTML = table;
      console.log("db table built");

      // eslint-disable-next-line no-unused-vars
      let myTable = window.$("#myTable").DataTable({
        responsive: false,
        dom: "iBfrtlp",
        autoWidth: false,
        pageLength: 10,
        aLengthMenu: [
          [5, 10, 25, 50, 250, -1],
          [5, 10, 25, 50, 250, "All"],
        ],

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
              columns: ":visible",
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
          search: "Filter results: ",
          info: "Showing _START_ to _END_ of _TOTAL_ results",
        },
        oLanguage: {
          sLengthMenu: "Show _MENU_ results per page",
        },
      });
      this.loading = false;
      window.$("#results").show();
      doubleScroll(document.getElementById("doublescroll"));

      window.NProgress.done();
    },
    execute() {
      this.loading = true;
      this.metadata.timestamp = new Date().toLocaleString();
      this.fetchData();
    },
    async selectDatabase() {
      this.queryTime = null;
      this.queryLength = null;
      this.res = null;
      const el = document.getElementById("results");
      el.innerHTML = "";
      window.NProgress.start();
      console.log("selected database: ", this.database);

      await this.initialize();
      //this.fetchData();
      window.NProgress.done();
    },
    async fetchData() {
      this.err = null;
      const el = document.getElementById("results");
      el.innerHTML = `Building results table ...`;
      window.NProgress.start();
      if (
        this.sqlStatement.match(/insert|delete|drop|update|replace|create/i)
      ) {
        console.log("SQL not permitted");
        this.err = "SQL not permitted";
        window.NProgress.done();
        el.innerHTML = ``;
        return null;
      }
      const before = Date.now();

      try {
        let db = this.$store.state.db;
        const res = await db.exec(this.sqlStatement);
        console.log("db queried");
        if (!res.length) {
          console.log("no results");
          this.err = "No results";
          window.NProgress.done();
          el.innerHTML = ``;
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
        this.$gtag.event("repl", {
          event_category: "sqlStatement",
          event_label: this.sqlStatement,
        });
        this.buildResultsTable();
      } catch (err) {
        console.log(err);
        this.err = err;
        window.NProgress.done();
        el.innerHTML = "";
        this.loading = false;
        window.NProgress.done();
      }

      window.NProgress.done();
    },
    async initialize() {
      this.sqlStatement = "select * from sqlite_master where type='table'";
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

<style>
.divider {
  border-top: 1px solid #333;
}

#topScroll {
  scrollbar-color: dark;
}
</style>
