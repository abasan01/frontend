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
      <span> {{ info.list.name }} </span>
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

export default {
  props: ["info"],
  data() {
    return {
      isExpanded: false,
      shouldExpand: false,
      currentHeight: null,
      setHeight: 500,
    };
  },
  components: {
    Knjiga,
  },
  mounted() {
    console.log(this.info);
    this.currentHeight = this.$el.scrollHeight;
    if (this.currentHeight > this.setHeight) {
      this.shouldExpand = true;
    }
  },
  methods: {
    expand() {
      this.isExpanded = !this.isExpanded;
    },
  },
};
</script>

<style scoped>
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
