<template>
  <div class="home">
    <transition-group name="list-complete" tag="p" appear>
      <div
        class="person list-complete-item"
        v-for="person in people"
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
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

import personPreview from '@/components/person-preview.vue';
import IPerson from '@/models/person';

import RouteNames from '@/constants/route-names';

export default defineComponent({
  name: 'Home',
  components: {
    personPreview,
  },
  props: {
    people: {
      type: Array as () => IPerson[],
      require: true,
    },
  },
  setup() {
    const router = useRouter();

    function personClick(person: IPerson) {
      router.push({
        name: RouteNames.Person,
        params: { uuid: person.login.uuid },
      });
    }
    return {
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
