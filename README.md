# spac-statute-explorer

> Proof of concept client-side integration of Vue 2.x and https://sql.js.org.

> Loads the Web Assembly (WASM) sqlite3 module, loads a sqlite3 database of (very out of date) Illinois criminal statutes into client memory, and then provides a simple REPL and keyword search.

> Test for the [Illinois Sentencing Policy and Advisory Council](https://spac.illinois.gov/).

> Full Illinois criminal statute query site coming soon.

## Live Demo

- https://statutes.icjia.cloud/

## Project setup

```
git clone https://github.com/ICJIA/spac-statute-explorer
cd spac-statute-explorer
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

> Many optimizations needed.

- https://github.com/ICJIA/spac-statute-explorer/blob/master/src/views/Home.vue

### Keyword query

> Many optimizations needed.

- https://github.com/ICJIA/spac-statute-explorer/blob/master/src/views/Keyword.vue

### Query builder

> Circa 2010. First created in VBA, ported to CFML, now in Vue.js.

> Many optimizations needed.

- https://github.com/ICJIA/spac-statute-explorer/blob/master/src/views/Builder.vue

## References

- https://reposhub.com/javascript/storage/sql-js-sql-js.html

- https://github.com/sql-js/react-sqljs-demo

- https://sql.js.org/#/?id=using-fetch

- https://github.com/vuejs/vue-cli/issues/763
