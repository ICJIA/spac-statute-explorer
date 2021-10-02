<template>
  <v-container class="markdown-body">
    <v-row>
      <v-col>
        <div v-if="ready">
          <v-select
            :items="databases"
            filled
            label="Select a database"
            v-model="database"
            v-on:change="selectDatabase()"
          ></v-select>
          <v-textarea
            v-model="sqlStatement"
            name="input"
            class="mt-5"
            ref="sql"
            label="Enter SQL"
            outlined
          ></v-textarea>
        </div>

        <div v-if="!ready" style="height: 200px" class="text-center">
          <v-progress-circular
            indeterminate
            color="purple darken-4"
            size="100"
            class="mt-4"
          ></v-progress-circular>
          <div class="mt-3" style="font-size: 12px; font-weight: bold">
            Initializing Application ...
          </div>
        </div>
        <div class="d-flex" v-if="ready">
          <v-btn small class="mr-2" @click="listTables()"
            >Show all tables</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn small outlined class="mr-2" @click="clear()">Clear</v-btn>
          <v-btn small class="mr-2" @click="reset()">Reset</v-btn>
          <v-btn small @click="execute()" dark color="blue darken-4"
            >Execute SQL<v-icon right large>arrow_right</v-icon></v-btn
          >
        </div>
        <pre class="error mt-5" v-if="err && ready">{{ err.toString() }}</pre>
        <pre class="error mt-5" v-if="status && ready">No results</pre>

        <div>
          <div
            v-if="queryTime && res && !err"
            style="font-size: 12px"
            class="mr-2 mt-12 text-right"
          >
            Database
            <strong>{{ database }}</strong> / Query
            <strong>{{ queryTime }}ms</strong> / Rows
            <strong>{{ queryLength }}</strong>
          </div>
          <div
            id="results"
            class="mt-6 pt-6"
            style=""
            :class="{ divider: ready && res }"
          ></div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import initSqlJs from "sql.js";
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";
export default {
  name: "Home",
  watch: {},
  data() {
    return {
      databases: ["statutes.db", "chinook.db"],
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
    };
  },

  methods: {
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
      const el = document.getElementById("results");

      let columnNames = this.columns.map((col) => {
        return `<th>${col}</th>`;
      });

      let rows = this.values.map((row) => {
        return `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`;
      });

      const table = `
      <div style="overflow-y: auto; overflow-x: auto;" >
        <table style="font-size: 12px" border="1" class="pt-6 px-3" id="myTable">
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
      window.$("#myTable").DataTable({
        responsive: true,
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
      console.log("selected database: ", this.database);
      this.$gtag.event("selectDatabase", {
        event_category: "database",
        event_label: this.database,
      });
      await this.initialize();
      this.fetchData();
      window.NProgress.done();
    },
    async fetchData() {
      this.err = null;
      const el = document.getElementById("results");
      el.innerHTML = `Building results table ...`;
      window.NProgress.start();

      const before = Date.now();

      this.$nextTick(async () => {
        try {
          const res = await this.db.exec(this.sqlStatement);
          console.log("db queried");
          if (!res.length) {
            console.log("no results");
            this.err = "No results";
            el.innerHTML = ``;
            return;
          }
          this.res = res[0];

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
        }
      });

      window.NProgress.done();
    },
    async initialize() {
      this.ready = false;
      const el = document.getElementById("results");
      try {
        const sqlPromise = await initSqlJs({ locateFile: () => sqlWasm });
        let databasePath = `/${this.database}`;
        const dataPromise = fetch(databasePath).then((res) =>
          res.arrayBuffer()
        );
        const [SQL, buf] = await Promise.all([sqlPromise, dataPromise]);
        const db = new SQL.Database(new Uint8Array(buf));
        this.db = await db;
      } catch (err) {
        console.log(err);
        this.err = err;
        window.NProgress.done();
        el.innerHTML = "";
        this.loading = false;
      }
      this.sqlStatement = "select * from sqlite_master where type='table'";
      this.ready = true;
    },
  },

  async mounted() {
    this.selectDatabase();
  },
};
</script>

<style>
.divider {
  border-top: 1px solid #333;
}
</style>
