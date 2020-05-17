<template>
  <div class="container">
    <section v-if="users.length > 0" class="card-row">
      <div v-for="(user, index) in users" :key="index">
        <UserItem v-bind="user" />
      </div>
    </section>
    <div v-else>
      <div v-if="loading">
        <h1>Loading...</h1>
      </div>
      <h1 v-else>No users from country you entered😮</h1>
    </div>
  </div>
</template>
<script>
import UserItem from './UserItem';
import { useStore } from 'vuex';
import { computed, ref, defineComponent } from 'vue';

export default defineComponent({
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  components: {
    UserItem,
  },
  setup() {
    const store = useStore();
    const loading = ref(computed(() => store.state.loading));

    return {
      loading,
    };
  },
});
</script>
<style lang="scss">
.container {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding: 24px;

  h1 {
    text-align: center;
  }
}
.card-row {
  display: grid;
  grid-template-columns: repeat(2, 49%);
  justify-content: space-between;
  row-gap: 1.5rem;
}
</style>
