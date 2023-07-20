<template>
  <div
    class="container d-flex flex-column align-items-center justify-content-center"
  >
    <lista v-for="lista in liste" :key="lista.list._id" :info="lista"></lista>
  </div>
</template>

<script>
import Lista from "@/components/Lista.vue";
import { Liste } from "@/services";

export default {
  data() {
    return {
      liste: null,
    };
  },
  async mounted() {
    this.liste = await Liste.getUserLists();
    console.log(this.liste);
  },
  name: "HomeView",
  components: {
    Lista,
  },
};
</script>
