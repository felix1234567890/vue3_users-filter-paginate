<template>
  <header class="header">
    <div class="header__title">User Search App</div>
    <div class="header__search">
      <input type="search" placeholder="Search users by country" @input="search" />
    </div>
  </header>
</template>
<script>

export default {
  name: 'HeaderComponent',
  props: {
    search: Function,
  },
};
</script>
