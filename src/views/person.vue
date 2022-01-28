<template>
  <div class="profile-container">
    <div class="controls"><Button label="Return" @mouseup="toHome" /></div>
    <div class="profile">
      <Card v-if="person">
        <template #header>
          <div>
            <img :src="person.picture.large" alt="" />
          </div>
        </template>
        <template #title>
          <span>{{ person.name.first }} {{ person.name.last }}</span>
        </template>
        <template #content>
          <div>
            <div>
              {{ person.location.street.number }}
              {{ person.location.street.name }}
            </div>
            <div>{{ person.location.city }}, {{ person.location.state }}</div>
            <div>
              {{ birthDate?.toDateString() }}
            </div>
            <div>
              {{ person.phone }}
            </div>
            <div>{{ person.cell }}</div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import getPeople from '@/interfaces/random-user';
import IPerson from '@/models/person';
import randomUserQuery from '@/constants/random-user-query-string';
import RouteNames from '@/constants/route-names';

export default defineComponent({
  name: 'person',
  setup() {
    const router = useRouter();
    const route = useRoute();

    const uuid = ref('');
    const person = ref<IPerson>();
    const birthDate = ref<Date>();

    uuid.value = route.params.uuid as string;

    getPeople(randomUserQuery).then((response) => {
      person.value = response.results.find(
        (person) => person.login.uuid === uuid.value,
      );
      if (person.value !== undefined) {
        birthDate.value = new Date(person.value.dob.date);
      }
    });

    function toHome() {
      router.push({ name: RouteNames.Home });
    }

    return { person, birthDate, toHome };
  },
});
</script>

<style>
.profile-container {
  padding-top: 5em;
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100%;
}

.profile-container .controls {
  display: block;
  float: left;
}

.profile-container .profile {
  min-width: 20em;
  max-width: 20em;
}
</style>
