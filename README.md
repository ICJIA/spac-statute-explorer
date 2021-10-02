# spac-statute-explorer

> Proof of concept REPL integrating Vue and https://sql.js.org. Uses Webpack's file-loader to load the Web Assembly (WASM) sqlite3 module, loads into client memory a sqlite3 database of the (very out of date) Illinois criminal statutes, and provides a REPL for raw SQL queries.

> Test for the [Illinois Sentencing Policy and Advisory Council](https://spac.illinois.gov/).

> Full Illinois criminal statute query site coming soon.

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

## Examples

### SQL query

- https://github.com/ICJIA/spac-statute-explorer/blob/master/src/views/Home.vue

### Keyword query

- https://github.com/ICJIA/spac-statute-explorer/blob/master/src/views/Keyword.vue

### Live Demo

- https://statutes.icjia.cloud/

### References

- https://reposhub.com/javascript/storage/sql-js-sql-js.html

- https://github.com/sql-js/react-sqljs-demo

- https://sql.js.org/#/?id=using-fetch

- https://github.com/vuejs/vue-cli/issues/763
