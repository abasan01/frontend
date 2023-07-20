<template>
  <div class="container">
    <div class="row">
      <KnjigaGrid
        v-for="book in books"
        :key="book.id"
        :info="book"
      ></KnjigaGrid>
    </div>
    <button
      v-if="store.list.length"
      class="btn btn-primary fixed-box"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasRight"
      aria-controls="offcanvasRight"
    >
      <strong>Lista</strong>
    </button>
    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div class="offcanvas-header">
        <h5 id="offcanvasRightLabel">Vaša lista knjiga:</h5>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <p v-for="title in store.listTitles" :key="title">{{ title }}</p>
        <button type="button" @click="postList()">
          <strong>Napravi novu listu</strong>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import KnjigaGrid from "@/components/KnjigaGrid.vue";
import { Service, Knjige, Liste } from "@/services/index";
import store from "@/store";

export default {
  data() {
    return {
      store: store,
      books: [],
    };
  },
  mounted() {
    store.list = [];
    store.listTitles = [];
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get("search");

    this.getPosts(searchTerm);
  },
  methods: {
    async postList() {
      await Liste.addList({ name: "test", books: store.list });
      this.$router.go();
    },
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

<style scoped>
.fixed-box {
  position: fixed;
  top: 50%;
  right: -1px;
  transform: translateY(-50%);
  background-color: #dfd9ab;
  border: 1px solid #424242;
  z-index: 999;
}
</style>
