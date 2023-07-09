<template>
  <div class="container">
    <div class="row">
      <KnjigaGrid></KnjigaGrid>
      <KnjigaGrid></KnjigaGrid>
      <KnjigaGrid></KnjigaGrid>
      <KnjigaGrid></KnjigaGrid>
      <KnjigaGrid></KnjigaGrid>
      <KnjigaGrid></KnjigaGrid>
      <KnjigaGrid></KnjigaGrid>
    </div>
  </div>
</template>

<script>
import KnjigaGrid from "@/components/KnjigaGrid.vue";

export default {
  data() {
    return {};
  },
  name: "KnjigeView",
  components: {
    KnjigaGrid,
  },
};
</script>
