# spac-statute-explorer

> Proof of concept simple test integrating Vue and https://sql.js.org

> Uses Webpack's [file-loader](https://v4.webpack.js.org/loaders/file-loader/) to load the Web Assembly (WASM) sqlite3 module, creating a new database, and then making a raw SQL query.

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

## Sample setup

### Import

```
import initSqlJs from "sql.js";
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";
```

### Create a new database in memory and make a simple query.

```
try {
      const SQL = await initSqlJs({ locateFile: () => sqlWasm });
      const db = await new SQL.Database();
      const res = await db.exec("select sqlite_version()");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
```

### Webpack config

`vue.config.js:`

```
module.exports = {
 ...
  chainWebpack: (config) => {
    config.module
      .rule("wasm")
      .test(/\.wasm$/)
      .type("javascript/auto");
  },
  ...
};
```

### References

- https://github.com/sql-js/react-sqljs-demo

- https://sql.js.org/#/?id=using-fetch

- https://github.com/vuejs/vue-cli/issues/763
