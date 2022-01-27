<template>
  <div v-if="person">
    <div class="profile-container">
      <div>
        <img :src="person.picture.large" alt="" />
        <span>{{ person.name.first }} {{ person.name.last }}</span>
      </div>
      <div>
        <span>
          {{ person.location.street.number }}
          {{ person.location.street.name }}
          , {{ person.location.city }}, {{ person.location.state }}
        </span>
        <span>{{ person.dob.date }} {{ person.phone }} {{ person.cell }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import getPeople from '@/interfaces/random-user';
import IPerson from '@/models/person';
import randomUserQuery from '@/constants/random-user-query-string';

export default defineComponent({
  name: 'person',
  setup() {
    const uuid = ref('');
    const route = useRoute();
    const person = ref<IPerson>();

    uuid.value = route.params.uuid as string;

    getPeople(randomUserQuery).then((response) => {
      person.value = response.results.find(
        (person) => person.login.uuid === uuid.value,
      );
    });

    return { person };
  },
});
</script>

<style></style>
