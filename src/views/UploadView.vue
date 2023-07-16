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

      <div v-if="propLoaded">
        <div class="container border rounded my-2">
          <div class="row">
            <div class="col-md-12 col-lg-3 border-right-custom p-2">
              <div class="d-flex align-items-center justify-content-center">
                <div
                  class="image-blurred-edge"
                  :style="{ backgroundImage: 'url(' + prop.imageUrl + ')' }"
                ></div>
              </div>
            </div>
            <div class="col-md-12 col-lg-9">
              <div class="jumbotron jumbotron-fluid">
                <div class="container">
                  <span class="title-style"
                    >{{ prop.title }}
                    <span class="badge">{{ prop.genre }}</span></span
                  >
                  <div class="blockquote-footer mt-1">
                    {{ prop.author }}
                    <cite title="Source Title">({{ prop.year }})</cite>
                  </div>
                  <p class="lead mt-4">{{ prop.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Knjige } from "@/services";
import KnjigaDetailViewVue from "./KnjigaDetailView.vue";

export default {
  data: function () {
    return {
      errorMessage: "",
      errorState: false,
      bookName: "",
      prop: [],
      propLoaded: false,
    };
  },
  components: { KnjigaDetailViewVue },
  name: "Upload",
  async mounted() {},
  methods: {
    async addBook() {
      const knjiga = {
        title: this.bookName,
      };
      console.log(knjiga);
      let response = await Knjige.setBook(knjiga);
      this.prop = response;
      this.propLoaded = true;
      console.log("prop: ", this.prop);
    },
  },
};
</script>

<style scoped>
.border {
  --bs-border-color: #424242;
}
.border-right-custom {
  border-right: 1px solid #424242;
}
.progress {
  --bs-progress-bar-bg: #dfd9ab;
  --bs-progress-bar-color: #424242;
}
.badge {
  color: #424242;
  background: #dfd9ab;
  font-size: 10px;
}
.jumbotron {
  background: none;
  color: #424242;
  padding: 1rem 0 0 0;
  text-align: left;
}
.title-style {
  font-size: 2rem;
}
.lead {
  font-size: 1rem;
}

.image-blurred-edge {
  width: 200px;
  height: 200px;
  background-size: cover;
  box-shadow: 0 0 4px 4px #fffdeb inset;
}
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
