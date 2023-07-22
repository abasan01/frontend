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
              <div v-if="!info.progress">
                <div v-show="!hideProgress">
                  Ukupno stranica: {{ info.book.pages }}
                </div>
                <button
                  class="btn btn-custom my-2 my-sm-0"
                  type="submit"
                  @click="hideProgress = true"
                  v-show="!hideProgress"
                >
                  Dodaj napredak čitanja?
                </button>
                <form
                  v-show="hideProgress"
                  class="form-inline my-2 my-lg-0"
                  @submit.prevent="addProgress()"
                >
                  <input
                    class="m-2"
                    v-model="sendPage"
                    type="number"
                    :min="1"
                    :max="info.book.pages"
                    :title="'Unesite na kojoj ste stranici trenutno'"
                    required
                  />
                  <button
                    class="btn btn-custom my-2 my-sm-0"
                    type="submit"
                    @click="addProgress()"
                  >
                    Dodaj napredak
                  </button>
                </form>
              </div>
              <div v-if="info.progress" @submit.prevent="changeProgress()">
                <form v-show="hideProgress" class="form-inline my-2 my-lg-0">
                  <input
                    class="m-2"
                    v-model="sendPage"
                    type="number"
                    :min="1"
                    :max="info.book.pages"
                    :title="'Unesite na kojoj ste stranici trenutno'"
                    required
                  />
                  <button class="btn btn-custom my-2 my-sm-0" type="submit">
                    Dodaj napredak
                  </button>
                </form>
                <div
                  class="clickable"
                  @click="hideProgress = true"
                  v-show="!hideProgress"
                >
                  <span>Napredak (stisni kako bi promijenio):</span>
                  <div class="progress">
                    <div
                      class="progress-bar clickable"
                      role="progressbar"
                      :style="{
                        width:
                          (info.progress.progress / info.book.pages) * 100 +
                          '%',
                      }"
                    >
                      {{ info.progress.progress }}/{{ info.book.pages }}
                    </div>
                  </div>
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
              <p
                class="lead mt-4"
                v-for="desc in info.author.description"
                :key="desc"
              >
                {{ desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Napretci } from "@/services";
import store from "@/store";

export default {
  props: ["info"],
  data() {
    return {
      sendPage: null,
      currentPage: null,
      hideProgress: false,
    };
  },
  async mounted() {},
  methods: {
    async addProgress() {
      if (store.id && this.sendPage && 0 < this.sendPage < this.info.pages) {
        await Napretci.addProgress(store.id, { progress: this.sendPage });
        this.$router.go();
      } else {
        return false;
      }
    },
    async changeProgress() {
      if (store.id && this.sendPage && 0 < this.sendPage < this.info.pages) {
        await Napretci.changeProgress(store.id, { progress: this.sendPage });
        this.$router.go();
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
.btn-custom {
  color: #242424 !important;
  background-color: #dfd9ab !important;
}
.btn:hover {
  background-color: #c7c08f !important;
}
.border {
  border: 1px solid #424242 !important;
}
.border-right-custom {
  border-right: 1px solid #424242;
}

.progress-bar {
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
  background-position: center;
  box-shadow: 0 0 4px 4px #fffdeb inset;
}
</style>
