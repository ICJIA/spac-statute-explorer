<template>
  <div>
    <div v-if="$store.state.isDbReady">
      <v-btn @click="execute()">Execute query</v-btn>
      {{ res }}
    </div>
    <div v-else>Loading</div>
  </div>
</template>

<script>
// import { EventBus } from "@/event-bus";

export default {
  data() {
    return {
      db: null,
      isReady: null,
      res: null,
    };
  },

  methods: {
    execute() {
      let db = this.$store.state.db;
      this.res = db.exec(
        'select id, statute, "Statute Text" from tbl_statutes where "Statute Text" like "%cannabis%"'
      );
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped></style>
