<template>
  <div class="col-12 col-md-6 col-lg-3 p-2">
    <div
      class="container border rounded clickable"
      :class="{
        expanded: isExpanded,
        'height-check': !isExpanded && shouldExpand,
        selected: isSelected,
      }"
      @click="addList(info._id, info.title)"
    >
      <div class="row">
        <div class="col-12 p-2">
          <div class="d-flex align-items-center justify-content-center">
            <div
              v-if="info.imageUrl"
              class="image-blurred-edge"
              :style="{ backgroundImage: 'url(' + info.imageUrl + ')' }"
            ></div>
          </div>
        </div>
        <div class="col-12">
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
              <div>
                <button
                  type="submit"
                  style="width: 80%"
                  class="btn btn-lg btn-custom ml-2"
                  @click="pushRuta(info._id)"
                >
                  Više o knjizi
                </button>
              </div>
              <p class="lead mt-4">{{ info.description }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="hide-buttons mt-3">
        <span
          v-show="!isExpanded && shouldExpand"
          class="toggle-button start-50 translate-middle clickable"
          @click="expand"
        >
          Vidi više
        </span>
        <span
          v-show="isExpanded"
          class="toggle-button start-50 translate-middle clickable"
          @click="expand"
        >
          Sakrij
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import store from "@/store";
export default {
  props: ["info"],
  data() {
    return {
      list: [],
      isSelected: false,
      isExpanded: false,
      shouldExpand: false,
      currentHeight: null,
      setHeight: 1000,
    };
  },
  mounted() {
    this.currentHeight = this.$el.scrollHeight;
    if (this.currentHeight > this.setHeight) {
      this.shouldExpand = true;
    }
  },
  methods: {
    expand() {
      this.isExpanded = !this.isExpanded;
    },
    pushRuta(passId) {
      this.$router.push({ name: "knjiga", params: { id: passId } });
    },
    addList(id, bookTitle) {
      if (store.list.includes(id)) {
        const index = store.list.indexOf(id);
        store.list.splice(index, 1);
        store.listTitles.splice(index, 1);
        this.isSelected = !this.isSelected;
      } else {
        store.list.push(id);
        store.listTitles.push(bookTitle);
        this.isSelected = !this.isSelected;
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
  --bs-border-color: #424242;
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

.selected {
  border: 2px solid rgb(44, 143, 255) !important;
}

.image-blurred-edge {
  width: 200px;
  height: 250px;
  background-size: cover;
  background-position: center;
  box-shadow: 0 0 4px 4px #fffdeb inset;
}

.hide-buttons {
  font-size: 25px;
  font-weight: bold;
  transition: color 275ms linear;
}

.hide-buttons:hover {
  color: #e91e63;
}

.height-check {
  max-height: 1000px;
  overflow: hidden;
  position: relative;
}

.height-check::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(0, 0, 0, 0));
  pointer-events: none;
}

.height-check.expanded {
  max-height: none;
}
.toggle-button {
  position: absolute;
  bottom: 0;
  z-index: 1;
}
</style>
