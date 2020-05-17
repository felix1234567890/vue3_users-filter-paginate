import { createStore } from 'vuex';

const shuffleUsers = (users) => {
  for (let i = users.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [users[i], users[j]] = [users[j], users[i]];
  }
};
export default createStore({
  state: {
    users: [],
    sortedUsers: [],
    shownUsers: [],
    loading: false,
  },
  actions: {
    async loadUsers({ commit }) {
      try {
        this.state.loading = true;
        const response = await fetch('./users.json');
        const users = await response.json();
        shuffleUsers(users);
        commit('setUsers', users);
        commit('setSortedUsers', users);
        this.dispatch('paginateData');
        this.state.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    filterUsers({ commit, state }, text) {
      const filteredUsers = state.users.filter((user) => {
        if (user.country.toLowerCase().startsWith(text.toLowerCase())) return true;
        return false;
      });
      filteredUsers.sort((a, b) => a.country - b.country);
      commit('setSortedUsers', filteredUsers);
      this.dispatch('paginateData');
    },
    sortUsers({ commit, state }, sortOrder) {
      const users = [...state.users];
      let sortedUsers;
      switch (sortOrder) {
        case 'desc':
          sortedUsers = users.sort((a, b) => {
            return b.age - a.age;
          });
          break;
        case 'asc':
          sortedUsers = users.sort((a, b) => {
            return a.age - b.age;
          });
          break;
        case 'under40':
          sortedUsers = users.filter((user) => user.age < 40).sort((a, b) => a.age - b.age);
          break;
        case 'over40':
          sortedUsers = users.filter((user) => user.age > 40).sort((a, b) => a.age - b.age);
          break;
        case 'female':
          sortedUsers = users.filter((user) => user.gender === 'female');
          break;
        case 'male':
          sortedUsers = users.filter((user) => user.gender === 'male');
          break;
        default:
          sortedUsers = state.users;
      }
      commit('setSortedUsers', sortedUsers);
      this.dispatch('paginateData');
    },
    paginateData({ commit, state }, pageNumber = 1, itemsPerPage = 6) {
      const skip = (pageNumber - 1) * itemsPerPage;
      if (state.sortedUsers.length > 0) {
        const shownUsers = state.sortedUsers.slice(skip, skip + itemsPerPage);
        commit('setShownUsers', shownUsers);
      }
    },
  },
  mutations: {
    setUsers(state, data) {
      state.users = data;
    },
    setSortedUsers(state, data) {
      state.sortedUsers = data;
    },
    setShownUsers(state, data) {
      state.shownUsers = data;
    },
  },
});
