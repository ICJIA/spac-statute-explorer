<template>
  <v-container class="markdown-body">
    <v-row>
      <v-col>
        <div v-if="ready">
          <v-text-field
            v-model="keyword"
            filled
            label="Keyword search (Must be more than 3 characters)"
            v-on:keyup="buildSqlStatement(keyword)"
          ></v-text-field>
          <v-textarea
            v-model="sqlStatement"
            name="input"
            class="mt-5"
            ref="sql"
            label="SQL"
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
            class="mr-2 mt-12 d-flex"
          >
            <span v-if="keyword.length">
              Keyword
              <strong
                ><span style="color: red">&nbsp;{{ keyword }}</span></strong
              ></span
            >
            <v-spacer></v-spacer>
            Database
            <strong>&nbsp;{{ database }}</strong
            >&nbsp;/&nbsp;Query
            <strong>&nbsp;{{ queryTime }}ms</strong>&nbsp;/&nbsp;Rows
            <strong>&nbsp;{{ queryLength }}</strong>
          </div>
          <div id="results" class="mt-6"></div>
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
    };
  },

  methods: {
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
      this.sqlStatement = this.buildSqlStatement(this.keyword);
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

      //console.log(this.columns);
      let columnNames = this.columns.map((col) => {
        return `<th>${col}</th>`;
      });
      //console.log(columnNames);
      let rows = this.values.map((row) => {
        return `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`;
      });
      //console.log(rows);

      const table = `
      <div style="overflow-y: auto; overflow-x: auto; max-height: 500px" >
        <table style="font-size: 12px" border="1" class="mt-6 px-3">
          <thead>
            <tr>
              ${columnNames.join("")}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                ${rows.join("")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>`;
      el.innerHTML = table;
      console.log("db table built");
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
        const res = await this.db.exec(this.sqlStatement);
        console.log("db queried");
        if (!res.length) {
          console.log("no results");
          this.err = "No results";
          el.innerHTML = ``;
          window.NProgress.done();
          return;
        }
        this.res = res[0];

        this.columns = res[0].columns;
        this.values = res[0].values;
        this.queryLength = res[0].values.length;
        this.loading = false;
        const after = Date.now();
        this.queryTime = after - before;
        // this.$gtag.event("repl", {
        //   event_category: "sqlStatement",
        //   event_label: this.sqlStatement,
        // });
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
      this.buildSqlStatement(this.defaultKeyword);
      this.ready = true;
    },
    buildSqlStatement(keyword) {
      if (keyword.length < 4) return;

      this.$nextTick(() => {
        let sqlStatement = `select mandatoryMinimums, "Statute Text" from tbl_statutes where "Statute Text" like "%${keyword}%"`;
        this.sqlStatement = sqlStatement;
        console.log(this.sqlStatement);
        this.res = null;
        this.err = null;
        const el = document.getElementById("results");
        el.innerHTML = "";
        this.loading = true;
        this.fetchData();
      });
    },
  },

  async mounted() {
    this.selectDatabase();
  },
};
</script>