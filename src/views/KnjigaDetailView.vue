<template>
  <div class="container">
    <KnjigaDetail :info="knjiga"></KnjigaDetail>
  </div>
</template>

<script>
import KnjigaDetail from "@/components/KnjigaDetail.vue";
import { Knjige } from "@/services/index";

export default {
  data() {
    return {
      knjiga: [],
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    this.knjiga = await Knjige.getOne(id);
  },
  name: "KnjigeDetailView",
  components: {
    KnjigaDetail,
  },
};
</script>
