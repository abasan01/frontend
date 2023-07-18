<template>
  <div v-if="info.book">
    <div class="container border rounded my-2">
      <div class="row">
        <div class="col-md-12 col-lg-3 border-right-custom p-2">
          <div class="d-flex align-items-center justify-content-center">
            <div
              class="image-blurred-edge"
              :style="{ backgroundImage: 'url(' + info.book.imageUrl + ')' }"
            ></div>
          </div>
        </div>
        <div class="col-md-12 col-lg-9">
          <div class="jumbotron jumbotron-fluid">
            <div class="container">
              <span class="title-style"
                >{{ info.book.title }}
                <span class="badge">{{ info.book.genre }}</span></span
              >
              <div class="blockquote-footer mt-1">
                {{ info.book.author }}
                <cite title="Source Title">({{ info.book.year }})</cite>
              </div>
              <span>Napredak:</span>
              <div class="progress">
                <div
                  class="progress-bar"
                  role="progressbar"
                  :style="{
                    width: (info.book.pages / 2 / info.book.pages) * 100 + '%',
                  }"
                >
                  {{ info.book.pages / 2 }}/{{ info.book.pages }}
                </div>
              </div>
              <p class="lead mt-4">{{ info.book.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- za autora -->
    <div class="container border rounded my-2">
      <div class="row">
        <div class="col-md-12 col-lg-3 border-right-custom p-2">
          <div class="d-flex align-items-center justify-content-center">
            <div
              class="image-blurred-edge"
              :style="{ backgroundImage: 'url(' + info.author.authorUrl + ')' }"
            ></div>
          </div>
        </div>
        <div class="col-md-12 col-lg-9">
          <div class="jumbotron jumbotron-fluid">
            <div class="container">
              <span class="title-style">{{ info.author.name }}</span>
              <div class="blockquote-footer mt-1">
                Rođen: {{ info.author.birth }}
              </div>
              <p class="lead mt-4">{{ info.author.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["info"],
  data() {
    return {};
  },
  async mounted() {},
  methods: {
    expand() {},
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
  background-position: center;
  box-shadow: 0 0 4px 4px #fffdeb inset;
}
</style>
