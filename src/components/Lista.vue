<template>
  <div
    v-if="info"
    style="width: 90%; overflow-x: hidden"
    class="card my-2"
    :class="{
      expanded: isExpanded,
      'height-check': !isExpanded && shouldExpand,
    }"
  >
    <div class="card-header row">
      <!-- Button trigger modal -->
      <div
        class="col-3"
        v-if="info.list.createdBy == store.currentUser && $route.name == 'home'"
      >
        <button
          type="button"
          class="btn-close"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        ></button>
      </div>
      <div
        class="col-3 offset-6 form-check form-switch mb-1"
        v-if="info.list.createdBy == store.currentUser && $route.name == 'home'"
      >
        <input
          class="form-check-input"
          type="checkbox"
          :disabled="checkSwitch"
          @click="changePublic(info.list._id, info.list.public)"
          :checked="info.list.public"
        />
        <label v-if="currentPublic" class="form-check-label">Javno</label>
        <label v-if="!currentPublic" class="form-check-label">Privatno</label>
      </div>
      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content bg-primary">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Želite li obrisati ovu listu?
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Odustani
              </button>
              <button
                @click="deleteList(info.list._id)"
                type="button"
                class="btn btn-danger"
              >
                Obriši
              </button>
            </div>
          </div>
        </div>
      </div>

      <span class="mb-2"> {{ info.list.name }} </span>
      <span
        v-if="true"
        style="
          font-style: italic;
          font-weight: normal;
          font-size: 14px;
          text-align: right;
        "
        >Lista korisnika: {{ info.list.createdBy }}</span
      >
    </div>
    <div class="p-2 pb-5 list-container">
      <knjiga v-for="book in info.books" :key="book._id" :book="book"></knjiga>
    </div>
    <div class="hide-buttons">
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
</template>

<script>
import Knjiga from "@/components/Knjiga.vue";
import store from "@/store";
import { Liste } from "@/services";

export default {
  props: ["info"],
  data() {
    return {
      isExpanded: false,
      shouldExpand: false,
      currentHeight: null,
      setHeight: 500,
      store,
      checkSwitch: false,
      currentPublic: false,
    };
  },
  components: {
    Knjiga,
  },
  mounted() {
    this.currentPublic = this.info.list.public;
    this.currentHeight = this.$el.scrollHeight;
    if (this.currentHeight > this.setHeight) {
      this.shouldExpand = true;
    }
  },
  methods: {
    expand() {
      this.isExpanded = !this.isExpanded;
    },
    async deleteList(id) {
      console.log(id);
      const currentRoute = this.$route.path;
      this.$router.push({ query: { delete: id } });
      const urlParams = new URLSearchParams(window.location.search);
      const deleteId = urlParams.get("delete");
      await Liste.deleteList(deleteId);
      this.$router.push({ path: currentRoute });
      window.location.reload();
    },
    async changePublic(id, state) {
      this.checkSwitch = true;
      this.currentPublic = !this.currentPublic;
      console.log(id, state);
      await Liste.patchList({ id: id, state: state });
      this.$router.go();
    },
  },
};
</script>

<style scoped>
.form-check-input:checked {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.btn:hover {
  background-color: #c7c08f !important;
}
.card-header {
  font-weight: bold;
  font-size: 20px;
}
.list-container {
  background: #fffdeb;
}
.card {
  --bs-card-cap-color: #424242;
  --bs-card-cap-bg: #dfd9ab;
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
  max-height: 500px;
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
