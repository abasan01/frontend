<template>
  <div class="container">
    <KnjigaDetail imageurl="knjiga.imageurl" :info="knjiga"></KnjigaDetail>
  </div>
</template>

<script>
import KnjigaDetail from "@/components/KnjigaDetail.vue";
import { Knjige } from "@/services/index";
import store from "@/store";

export default {
  data() {
    return {
      knjiga: [],
    };
  },
  async mounted() {
    store.id = this.$route.params.id;
    this.knjiga = await Knjige.getOne(store.id);
  },
  name: "KnjigeDetailView",
  components: {
    KnjigaDetail,
  },
};
</script>
