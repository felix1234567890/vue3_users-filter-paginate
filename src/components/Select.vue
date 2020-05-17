<template>
  <div class="custom-select" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        class="item"
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option.label;
          open = false;
          $emit('input', option);
        "
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, computed, toRefs, onMounted, onUnmounted } from 'vue';

export default defineComponent({
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit, attrs }) {
    const state = reactive({
      selected: computed(() => (props.options.length > 0 ? props.options[0].label : null)),
      open: false,
    });
    onMounted(() => {
      emit('input', state.selected);
      window.addEventListener('click', (event) => {
        const el = document.getElementsByClassName(attrs.class)[0];
        if (!el.contains(event.target)) {
          state.open = false;
        }
      });
    });
    onUnmounted(() => {
      window.removeEventListener('click', (event) => {
        const el = document.getElementsByClassName(attrs.class)[0];
        if (!el.contains(event.target)) {
          state.open = false;
        }
      });
    });

    return { ...toRefs(state) };
  },
});
</script>
<style scoped lang="scss">
$body-background-color: #212a38;
$body-color: #949ca5;
$border-color: #080a0e;
.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 47px;
  line-height: 47px;
}

.selected {
  background-color: $body-background-color;
  border-radius: 6px;
  border: 1px solid #566273;
  color: #ffffff;
  padding-left: 8px;
  cursor: pointer;
  user-select: none;
}

.selected.open {
  border: 1px solid #566273;
  border-radius: 6px 6px 0px 0px;
}

.selected:after {
  position: absolute;
  content: '';
  top: 22px;
  right: 10px;
  width: 0;
  height: 0;

  //border: 4px solid transparent;
}

.items {
  color: #ffffff;
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  border: 1px solid #566273;
  position: absolute;
  background-color: $body-background-color;
  left: 0;
  right: 0;
}

.item {
  color: #ffffff;
  padding-left: 8px;
  cursor: pointer;
  user-select: none;
}

.item:hover {
  background-color: #b68a28;
}

.selectHide {
  display: none;
}
</style>
