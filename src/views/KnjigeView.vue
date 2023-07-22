<template>
  <div class="container">
    <div class="row">
      <KnjigaGrid
        v-for="book in books"
        :key="book.id"
        :info="book"
      ></KnjigaGrid>
    </div>
    <img
      src="@/assets/arrow-menu.png"
      v-if="store.list.length"
      class="fixed-box clickable"
      style="width: 50px"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasRight"
      aria-controls="offcanvasRight"
    />
    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div class="offcanvas-header" style="background-color: #dfd9ab">
        <h5 id="offcanvasRightLabel">Vaša lista knjiga:</h5>

        <input
          v-model="listTitle"
          class="form-control mr-sm-2"
          placeholder="Unesite Naziv Liste"
          required
        />
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body bg-custom">
        <p v-for="title in store.listTitles" :key="title">{{ title }}</p>
        <button type="submit" class="btn btn-custom" @click="postList()">
          <strong>Napravi novu listu</strong>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import KnjigaGrid from "@/components/KnjigaGrid.vue";
import { Knjige, Liste } from "@/services/index";
import store from "@/store";

export default {
  data() {
    return {
      store: store,
      books: [],
      listTitle: "",
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
      if (!this.listTitle) {
        this.listTitle = "Lista";
      }
      await Liste.addList({ name: this.listTitle, books: store.list });
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
.bg-custom {
  background: #fffbd8 !important;
}

input::placeholder {
  opacity: 0.5;
}
.btn-custom {
  color: #242424 !important;
  background-color: #dfd9ab !important;
}
.btn:hover {
  background-color: #c7c08f;
}
.fixed-box {
  position: fixed;
  top: 50%;
  right: -1px;
  transform: translateY(-50%);
  z-index: 999;
}
</style>
