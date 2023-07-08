<template>
  <div
    style="width: 18rem"
    class="card height-check"
    :class="{ expanded: isExpanded }"
  >
    <div class="card-header">Featured</div>
    <div class="gradient-custom">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Cras justo odio</li>
        <li class="list-group-item">Dapibus ac facilisis in</li>
        <li class="list-group-item">
          V Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in ex
          et metus bibendum tincidunt. Aenean nibh nulla, sagittis id varius
          eget, interdum sed odio. Phasellus nec ultrices arcu, a vestibulum
          nisl. Phasellus ac ornare quam. Donec quis magna scelerisque, bibendum
          purus a, finibus ex. Aenean ac tincidunt quam. Cras volutpat nibh
          pharetra, dictum felis a, tristique orci. Morbi ligula metus, posuere
          vel dictum eu, rutrum ac ante. Vestibulum dui arcu, rutrum eget ligula
          maximus, sagittis tempor erat. Nullam a risus bibendum, bibendum urna
          sed, pretium purus. Donec auctor ornare bibendum. Suspendisse ut
          luctus mi, id suscipit eros. Sed ligula tellus, efficitur nec turpis
          quis, dictum viverra libero. Pellentesque iaculis hendrerit neque,
          vitae sagittis ni
        </li>
      </ul>
    </div>
    <button
      v-show="!isExpanded"
      class="toggle-button start-50 translate-middle"
      @click="expand"
    >
      Vidi više
    </button>
    <button
      v-show="isExpanded"
      class="toggle-button start-50 translate-middle"
      @click="expand"
    >
      Sakrij
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isExpanded: false,
      shouldShowExpandButton: false,
    };
  },
  mounted() {},
  methods: {
    expand() {
      this.isExpanded = !this.isExpanded;
    },
  },
};
</script>

<style scoped>
.fading-bottom {
}
.height-check {
  max-height: 300px;
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
  background: linear-gradient(
    to top,
    rgba(241, 241, 241, 0.75),
    rgba(255, 215, 216, 0)
  );
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
