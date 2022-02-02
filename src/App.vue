<template>
  <InputText
    type="text"
    v-bind:onkeyup="delayedFilter"
    v-model="filter"
    placeholder="Find Someone"
  />

  <router-view :people="peopleToDisplay" />
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import getPeople from '@/interfaces/random-user';
import IPerson from '@/models/person';
import InputText from 'primevue/inputtext';
import randomUserQuery from '@/constants/random-user-query-string';
import RouteNames from '@/constants/route-names';

export default defineComponent({
  components: { InputText },
  setup() {
    const router = useRouter();
    const people: Ref<IPerson[]> = ref([]);
    const peopleToDisplay: Ref<IPerson[]> = ref([]);
    const filter = ref('');
    const filterDelay = 200;
    let currentTimeout = 0;

    getPeople(randomUserQuery.previewQuery).then((result) => {
      people.value = result.results as IPerson[];
      peopleToDisplay.value = people.value;
    });

    function filterPeople() {
      if (filter.value === '') {
        peopleToDisplay.value = people.value;
        return;
      }
      const lowercaseFilter = filter.value.toLowerCase();
      peopleToDisplay.value = people.value.filter((person: IPerson) => {
        if (
          person.name.first.toLowerCase().indexOf(lowercaseFilter) > -1 ||
          person.name.last.toLowerCase().indexOf(lowercaseFilter) > -1
        ) {
          return true;
        }
        return false;
      });

      router.push({
        name: RouteNames.Home,
      });
    }

    function delayedFilter(e: KeyboardEvent) {
      if (e.code !== 'Backspace') {
        clearTimeout(currentTimeout);
        currentTimeout = setTimeout(filterPeople, filterDelay);
      } else {
        filterPeople();
      }
    }

    return {
      people,
      filter,
      delayedFilter,
      peopleToDisplay,
    };
  },
});
</script>

<style>
html,
body {
  height: 100%;
  overflow: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
