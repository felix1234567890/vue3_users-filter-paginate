<template>
  <div class="buttons">
    <transition name="fade">
      <button
        v-if="pageNumber > 1"
        @click="decreaseNumber"
      >Previous</button>
    </transition>
    <transition name="fade">
      <button
        v-if="pageNumber < pageCount"
        @click="increaseNumber"
      >Next</button>
    </transition>
  </div>
</template>
<script>

export default {
  name: 'PaginationComponent',
  props: {
    pageCount: {
      type: Number
    },
    pageNumber: Number,
    increaseNumber: Function,
    decreaseNumber: Function
  }
}
</script>
<style scoped>
.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}
button {
  display: inline-block;
  padding: 12px 38px;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  color: var(--blue);
  background-color: #fff;
  border: 2px solid var(--blue);
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 150px;
  margin: 1rem;
}

button:hover,
button:focus {
  outline: none;
  color: #fff;
  background-color: #3db5eb;
  border-color: #3db5eb;
}

button:active {
  color: #fff;
  background-color: var(--drk-blue);
  border-color: var(--drk-blue);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
