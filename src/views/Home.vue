<template>
  <div>
    <InputText
      type="text"
      v-bind:onkeyup="delayedFilter"
      v-model="filter"
      placeholder="Find Someone"
    />
  </div>

  <div class="home">
    <transition-group name="list-complete" tag="p" appear>
      <div
        class="person list-complete-item"
        v-for="person in peopleToDisplay"
        :key="person.login.uuid"
        @click="personClick(person)"
      >
        <personPreview
          :first="person.name.first"
          :last="person.name.last"
          :image="person.picture.large"
        />
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';

import { useRouter } from 'vue-router';
import getPeople from '@/interfaces/random-user';
import personPreview from '@/components/person-preview.vue';
import IPerson from '@/models/person';
import InputText from 'primevue/inputtext';
import randomUserQuery from '@/constants/random-user-query-string';
import RouteNames from '@/constants/route-names';

export default defineComponent({
  name: 'Home',
  components: {
    personPreview,
    InputText,
  },
  setup() {
    const router = useRouter();

    const people: Ref<IPerson[]> = ref([]);
    const peopleToDisplay: Ref<IPerson[]> = ref([]);
    const filter = ref('');
    const filterDelay = 200;
    let currentTimeout = 0;

    getPeople(randomUserQuery).then((result) => {
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
    }

    function delayedFilter(e: KeyboardEvent) {
      if (e.code !== 'Backspace') {
        clearTimeout(currentTimeout);
        currentTimeout = setTimeout(filterPeople, filterDelay);
      } else {
        filterPeople();
      }
    }

    function personClick(person: IPerson) {
      router.push({
        name: RouteNames.Person,
        params: { uuid: person.login.uuid },
      });
    }
    return {
      people,
      filter,
      delayedFilter,
      peopleToDisplay,
      personClick,
    };
  },
});
</script>
<style>
.home {
  overflow-y: scroll;
  scrollbar-width: thin;
  display: flex;
  flex-wrap: wrap;
  max-height: 50em;
  width: 100%;
  justify-content: center;
}
.home .person {
  width: 12em;
  height: 25em;
  margin: 0.33em;
  transition: 0.2s;
}

.p-card-content,
.p-card-body {
  padding-bottom: 0;
}

.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
