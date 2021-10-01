<template>
  <v-container class="markdown-body">
    <v-row>
      <v-col>
        <v-textarea
          v-model="sqlStatement"
          name="input"
          class="mt-5"
          ref="sql"
          label="Enter SQL"
          outlined
        ></v-textarea>
        <div class="d-flex">
          <v-btn class="mr-2" @click="listTables()">List all tables</v-btn>
          <v-spacer></v-spacer>
          <v-btn class="mr-2" @click="reset()">Reset</v-btn>
          <v-btn @click="execute()" dark color="blue darken-4"
            >Execute SQL</v-btn
          >
        </div>
        <pre class="error mt-5" v-if="err">{{ err.toString() }}</pre>

        <div>
          <div
            v-if="queryTime && res"
            style="font-size: 12px"
            class="mr-10 mt-10 text-right"
          >
            Time for query: {{ queryTime }}ms / Items: {{ queryLength }}
          </div>
          <div id="results" class="mt-6">Result table here...</div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import initSqlJs from "sql.js";
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";
import sqlDb from "!!file-loader?name=statutes-[contenthash].db!../../public/statutes.db";
// const uInt8Array = new Uint8Array(sqlDb);
console.log(sqlDb);
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
    buildResultsTable() {
      const el = document.getElementById("results");

      //console.log(this.columns);
      let columnNames = this.columns.map((col) => {
        return `<th>${col}</th>`;
      });
      let rows = this.values.map((row) => {
        return `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`;
      });
      //console.log(columnNames);
      const table = `<div style="overflow-y: auto; overflow-x: auto; max-height: 500px" >
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
    },
    execute() {
      this.loading = true;
      this.fetchData();
    },
    async fetchData() {
      // console.log(sqlDb.arrayBuffer());
      this.err = null;
      const el = document.getElementById("results");
      el.innerHTML = `Building results table ...`;
      window.NProgress.start();
      const before = Date.now();
      try {
        const res = await this.db.exec(this.sqlStatement);
        console.log("db queried");
        const after = Date.now();
        this.queryTime = after - before;
        this.res = res[0];
        this.columns = res[0].columns;
        this.values = res[0].values;
        this.queryLength = res[0].values.length;
        this.loading = false;
        this.buildResultsTable();
      } catch (err) {
        console.log(err);
        this.err = err;
        window.NProgress.done();
        this.loading = false;
      }

      window.NProgress.done();
    },
  },
  async mounted() {
    window.NProgress.start();
    try {
      const sqlPromise = await initSqlJs({ locateFile: () => sqlWasm });
      let databasePath;
      if (process.env.NODE_ENV === "development") {
        databasePath = "./statutes.db";
      } else {
        databasePath = "./statutes.db";
      }
      const dataPromise = fetch(databasePath).then((res) => res.arrayBuffer());
      const [SQL, buf] = await Promise.all([sqlPromise, dataPromise]);
      const db = new SQL.Database(new Uint8Array(buf));
      this.db = await db;
    } catch (err) {
      console.log(err);
      this.err = err;
      window.NProgress.done();
    }
    this.sqlStatement = "select * from sqlite_master where type='table'";
    this.loading = true;
    this.fetchData();
    window.NProgress.done();
  },
};
</script>
