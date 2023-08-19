<template>
  <div id="app">
    <header-component :search="handleSearch" />
    <Filters :sort="handleSortByAge" />
    <UsersList :users="shownUsers" />
    <Pagination
      :pageCount="pageCount"
      :pageNumber="pageNumber"
      :increaseNumber="increaseNumber"
      :decreaseNumber="decreaseNumber"
    />
  </div>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";
import Header from "./components/Header.vue";
import Filters from "./components/Filters.vue";
import Pagination from "./components/Pagination.vue";
import UsersList from "./components/UsersList";

export default {
  name: "App",
  components: {
    HeaderComponent: Header,
    Filters,
    UsersList,
    Pagination
  },
  setup() {
    const store = useStore();
    const state = reactive({
      sortedUsers: computed(() => store.state.sortedUsers),
      shownUsers: computed(() => store.state.shownUsers),
      pageCount: computed(() =>
        Math.ceil(state.sortedUsers.length / state.itemsPerPage)
      ),

      pageNumber: 1,
      itemsPerPage: 6
    });
    const debounce = (callback, time) => {
      let interval;
      return (...args) => {
        clearTimeout(interval);
        interval = setTimeout(() => {
          interval = null;
          callback(...args);
        }, time);
      };
    };

    const handleSearch = event => {
      debounce(() => {
        store.dispatch("filterUsers", event.target.value);
      }, 800)();
    };
    const handleSortByAge = sortOrder => {
      store.dispatch("sortUsers", sortOrder.value);
    };
    const increaseNumber = () => {
      state.pageNumber += 1;
      store.dispatch("paginateData", state.pageNumber);
    };
    const decreaseNumber = () => {
      state.pageNumber -= 1;
      store.dispatch("paginateData", state.pageNumber);
    };

    return {
      ...toRefs(state),
      handleSearch,
      handleSortByAge,
      increaseNumber,
      decreaseNumber
    };
  }
};
</script>
