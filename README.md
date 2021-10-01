# spac-statute-explorer

> Proof of concept test integrating Vue and https://sql.js.org

> Uses Webpack's [file-loader](https://v4.webpack.js.org/loaders/file-loader/) and loads the Web Assembly (WASM) sqlite3 module, creates a new in-memory database, and makes a raw SQL query.

All client-side.

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

### Move files

`./`

```
cp node_modules/sql.js/dist/sql-wasm.js ./public
cp node_modules/sql.js/dist/sql-wasm.wasm ./public
```

### Imports

`./views/Home.vue`

```
import initSqlJs from "sql.js";
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";
```

### Create a new in-memory database and make a simple query

`./views/Home.vue`

```
try {
      const SQL = await initSqlJs({ locateFile: () => sqlWasm });
      const db = new SQL.Database();
      const res = await db.exec("select sqlite_version()");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
```

### Webpack config

`./vue.config.js`

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

- https://reposhub.com/javascript/storage/sql-js-sql-js.html

- https://github.com/sql-js/react-sqljs-demo

- https://sql.js.org/#/?id=using-fetch

- https://github.com/vuejs/vue-cli/issues/763
