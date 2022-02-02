<template>
  <div class="profile-container">
    <div class="profile">
      <Card v-if="person">
        <template #header>
          <div>
            <img id="profile-image" :src="person.picture.large" alt="" />
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
            <div class="address">
              {{ person.location.city }}, {{ person.location.state }}
            </div>
            <div>
              <h4>Date of Birth</h4>
              {{ birthDate?.toDateString() }}
            </div>
            <div>
              <h4>Phone</h4>
              {{ person.phone }}
            </div>
            <div>
              <h4>Cellular</h4>
              {{ person.cell }}
            </div>
          </div>
        </template>
        <template #footer>
          <div class="controls">
            <Button icon="pi pi-arrow-left" @mouseup="toHome" />
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

    getPeople(randomUserQuery.fullInfoQuery).then((response) => {
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
  flex-wrap: wrap;
}

.profile-container .controls {
  display: flex;
  justify-content: start;
  width: 100%;
}

.profile-container .profile {
  min-width: 20em;
  max-width: 20em;
}

.profile .address {
  margin-bottom: 10%;
}

.profile h4 {
  margin-top: 0.33em;
  margin-bottom: 0;
  text-align: start;
  text-indent: 3em;
}

#profile-image {
  border-radius: 50%;
  padding:1em;
}
</style>
