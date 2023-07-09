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
import Lista from "@/components/Lista.vue";

export default {
  data() {
    return {
      test: "test",
    };
  },
  name: "ListeView",
  components: {
    Lista,
  },
};
</script>
