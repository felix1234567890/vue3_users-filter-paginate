<template>
  <article class="card">
    <img
      :src="photo"
      alt="Preview of Whizzbang Widget"
    />
    <h3 class="user__name">{{ name }}</h3>
    <div class="user__details">
      <P> <strong>Email:</strong> {{ email }} </P>
      <P> <strong>Country:</strong> {{ country }} </P>
      <P> <strong>Gender:</strong> {{ gender }} </P>
      <P> <strong>Age:</strong> {{ age }} </P>
    </div>
  </article>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    name: String,
    email: String,
    country: String,
    photo: String,
    gender: String,
    age: Number
  }
});
</script>
<style>
.card {
  padding: 20px;
  border: 1px solid #c9c9c9;
  border-radius: 7px;
  box-shadow: 2px 2px 4px rgba(255, 255, 255, 0.15);
  height: auto;
  word-wrap: break-word;
  box-sizing: border-box;
  height: 100%;
  text-align: center;
}

.card > img:first-child {
  border-radius: 7px 7px 0 0;
  max-width: 100%;
}

.card h3 {
  color: white;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: start;
}

.card p {
  color: #757575;
  margin: 0.7rem auto;
}
</style>
