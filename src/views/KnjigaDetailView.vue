<template>
  <div class="container">
    <KnjigaDetail :info="knjiga"></KnjigaDetail>
  </div>
</template>

<script>
import KnjigaDetail from "@/components/KnjigaDetail.vue";
import { Service, Knjige } from "@/services/index";

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
  name: "KnjigeView",
  components: {
    KnjigaDetail,
  },
};
</script>
