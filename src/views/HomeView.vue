<template>
  <div
    class="container d-flex flex-column align-items-center justify-content-center"
  >
    <lista></lista>
    <lista></lista>
    <lista></lista>
  </div>
</template>

<script>
// @ is an alias to /src
import Lista from "@/components/Lista.vue";

export default {
  data() {
    return {
      test: "test",
    };
  },
  name: "HomeView",
  components: {
    Lista,
  },
};
</script>
