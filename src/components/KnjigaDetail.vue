<template>
  <div>
    <div class="container border rounded my-2">
      <div class="row">
        <div class="col-md-12 col-lg-3 border-right-custom p-2">
          <div class="d-flex align-items-center justify-content-center">
            <div
              v-if="info.imageUrl"
              class="image-blurred-edge"
              :style="{ backgroundImage: 'url(' + info.imageUrl + ')' }"
            ></div>
          </div>
        </div>
        <div class="col-md-12 col-lg-9">
          <div class="jumbotron jumbotron-fluid">
            <div class="container">
              <span class="title-style"
                >{{ info.title }}
                <span class="badge">{{ info.genre }}</span></span
              >
              <div class="blockquote-footer mt-1">
                {{ info.author }}
                <cite title="Source Title">({{ info.year }})</cite>
              </div>
              <span>Napredak:</span>
              <div class="progress">
                <div
                  class="progress-bar"
                  role="progressbar"
                  :style="{ width: (info.pages / 2 / info.pages) * 100 + '%' }"
                >
                  {{ info.pages / 2 }}/{{ info.pages }}
                </div>
              </div>
              <p class="lead mt-4">{{ info.description }}</p>
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
              :style="{ backgroundImage: 'url(' + authorUrl + ')' }"
            ></div>
          </div>
        </div>
        <div class="col-md-12 col-lg-9">
          <div class="jumbotron jumbotron-fluid">
            <div class="container">
              <span class="title-style">{{ info.author }}</span>
              <div class="blockquote-footer mt-1">GODINA ROĐENJA</div>
              <p class="lead mt-4">BIOGRAFIJA AUTORA</p>
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
    return {
      authorUrl: require("@/assets/author-placeholder.png"),
    };
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
  box-shadow: 0 0 4px 4px #fffdeb inset;
}
</style>
