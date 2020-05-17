<template>
  <div class="sortBy">
    <span>Sort by </span>
    <Select @input="sort($event)" :options="options" class="select-filter" />
  </div>
</template>
<script>
import Select from './Select';
import { defineComponent } from 'vue';
export default defineComponent({
  components: {
    Select,
  },
  props: {
    sort: Function,
  },
  setup() {
    const options = [
      { value: '', label: 'None' },
      { value: 'asc', label: 'Age - ascending' },
      { value: 'desc', label: 'Age -descending' },
      { value: 'under40', label: 'Age - under 40' },
      { value: 'over40', label: 'Age -over 40' },
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
    ];
    return { options };
  },
});
</script>
<style scoped>
.sortBy span {
  color: white;
  font-weight: 700;
  text-align: center;
  display: block;
}
</style>
