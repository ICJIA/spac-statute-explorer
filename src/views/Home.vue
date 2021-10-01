<template>
  <v-container>
    <v-row>
      <v-col>
        {{ res }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import initSqlJs from "sql.js";
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";

export default {
  name: "Home",
  data() {
    return {
      res: null,
    };
  },
  async mounted() {
    //console.log(sqlWasm);
    try {
      const SQL = await initSqlJs({ locateFile: () => sqlWasm });
      const db = await new SQL.Database();
      const res = await db.exec("select sqlite_version()");
      this.res = res;
    } catch (err) {
      console.log(err);
    }
  },
};
</script>
