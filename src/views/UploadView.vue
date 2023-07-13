<template>
  <div class="container">
    <div class="p-4">
      <form @submit.prevent="" class="mb-5 row d-flex justify-content-center">
        <div class="form-group m-2" style="width: 75%">
          <label for="bookName">Naslov knjige: </label>
          <input
            v-model="bookName"
            type="text"
            class="form-control m-2"
            placeholder="Naslov knjige"
            id="bookName"
            :title="'Unesite naslov knjige'"
          />

          <div>
            <label class="authorName">Naziv autora: </label>
            <multiselect
              v-model="authorName"
              :options="options"
              placeholder="Unesite autora ovdje"
              label="name"
              track-by="name"
            ></multiselect>
          </div>

          <label for="bookName">Žanr knjige: </label>
          <input
            v-model="genreName"
            type="text"
            class="form-control m-2"
            placeholder="Žanr knjige"
            id="žanrName"
            :title="'Unesite žanr knjige'"
          />

          <label for="quantity">Godina izdanja:</label>

          <input
            class="m-2"
            v-model="year"
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            max="2024"
            :title="'Unesite godinu izdanja'"
          />
        </div>
        <div v-show="errorState" class="alert alert-danger" role="alert">
          <b>
            <p>Greška: {{ errorMessage }}</p>
          </b>
        </div>

        <button
          type="submit"
          style="width: 25%"
          class="btn btn-lg btn-custom ml-2"
          @click="addBook()"
        >
          Post image
        </button>
      </form>

      <div class="row p-2"></div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import { Knjige } from "@/services";

export default {
  data: function () {
    return {
      errorMessage: "",
      errorState: false,
      bookName: "",
      authorName: "",
      genreName: "",
      year: 0,
      options: [
        { name: "Albert Camus" },
        { name: "J. R. R. Tolkien" },
        { name: "Agatha Christie" },
        { name: "William Shakespeare" },
      ],
    };
  },
  components: {},
  name: "Upload",
  mounted() {},
  methods: {
    addBook() {
      let knjiga = {
        naslov: this.bookName,
        autor: this.authorName,
        žanr: this.genreName,
        godina: this.year,
      };

      Knjige.setBook(knjiga);
    },
  },
};
</script>

<style scoped>
.btn-custom {
  --bs-btn-color: #242424;
  --bs-btn-bg: #dfd9ab;
}
.btn:hover {
  background-color: #c7c08f;
}

input {
  background-color: #dfd9ab !important;
  color: #424242;
}
input::placeholder {
  opacity: 0.5;
}
</style>
