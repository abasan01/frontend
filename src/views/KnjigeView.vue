<template>
  <div class="container">
    <div class="row">
      <KnjigaGrid
        v-for="book in books"
        :key="book.id"
        :info="book"
      ></KnjigaGrid>
    </div>
  </div>
</template>

<script>
import KnjigaGrid from "@/components/KnjigaGrid.vue";
import { Service, Knjige } from "@/services/index";
import store from "@/store";

export default {
  data() {
    return {
      books: [],
    };
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get("search");

    this.getPosts(searchTerm);
  },
  methods: {
    async getPosts(searchTerm) {
      if (!searchTerm) {
        searchTerm = "";
      }
      let response = await Knjige.getAll(searchTerm);
      this.books = response;
      console.log(this.books);
    },
  },
  name: "KnjigeView",
  components: {
    KnjigaGrid,
  },
};
</script>
