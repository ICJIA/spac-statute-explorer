<template>
  <hello-world />
</template>

<script>
import initSqlJs from "sql.js";
import HelloWorld from "../components/HelloWorld";
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";

export default {
  name: "Home",
  async mounted() {
    console.log(sqlWasm);
    try {
      const SQL = await initSqlJs({ locateFile: () => sqlWasm });
      const db = await new SQL.Database();
      const res = await db.exec("select sqlite_version()");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  },
  components: {
    HelloWorld,
  },
};
</script>
