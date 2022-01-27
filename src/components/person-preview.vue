<template>
  <div class="person-preview">
    <div class="person-card">
      <Card>
        <template #header>
          <img class="thumbnail" sizes="" :src="image" alt="" />
        </template>
        <template class="person-name" #content>
          <h4>{{ first }} {{ last }}</h4>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Person Preview',
  props: {
    first: {
      type: String,
      require: true,
    },
    last: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
  },
});
</script>

<style>
.person-preview .person-card:hover {
  filter: brightness(90%);
}
</style>
