<template>
  <div
    v-if="book"
    class="container border rounded my-2 clickable"
    @click="pushRuta(book._id)"
  >
    <div class="row">
      <div class="col-md-12 col-lg-3 border-right-custom p-2">
        <div class="d-flex align-items-center justify-content-center">
          <div
            class="image-blurred-edge"
            :style="{ backgroundImage: 'url(' + book.imageUrl + ')' }"
          ></div>
        </div>
      </div>
      <div class="col-md-12 col-lg-9">
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <span class="title-style"
              >{{ book.title }}
              <span class="badge">{{ book.genre }}</span></span
            >
            <div class="blockquote-footer mt-1">
              {{ book.author }}
              <cite title="Source Title">({{ book.year }})</cite>
            </div>
            <div v-if="book.progress">
              <span>Napredak:</span>
              <div class="progress">
                <div
                  class="progress-bar clickable"
                  role="progressbar"
                  :style="{
                    width: (book.progress / book.pages) * 100 + '%',
                  }"
                >
                  {{ book.progress }}/{{ book.pages }}
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
export default {
  props: ["book"],
  data() {
    return {
      imageUrl: require("@/assets/placeholder.jpg"),
    };
  },
  mounted() {},
  methods: {
    pushRuta(passId) {
      this.$router.push({ name: "knjiga", params: { id: passId } });
    },
  },
};
</script>

<style scoped>
.border {
  border: 1px solid #424242 !important;
}
.border-right-custom {
  border-right: 1px solid #424242;
}
.progress {
  background-color: #dfd9ab !important;
  color: #424242 !important;
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
</style>
