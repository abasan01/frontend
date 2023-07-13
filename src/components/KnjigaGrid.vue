<template>
  <div class="col-12 col-md-6 col-lg-3 p-2">
    <div class="container border rounded clickable" @click="pushRuta(info._id)">
      <div class="row">
        <div class="col-12 p-2">
          <div class="d-flex align-items-center justify-content-center">
            <div
              class="image-blurred-edge"
              :style="{ backgroundImage: 'url(' + info.imageUrl + ')' }"
            ></div>
          </div>
        </div>
        <div class="col-12">
          <div class="jumbotron jumbotron-fluid">
            <div class="container">
              <span class="title-style"
                >{{ info.naslov }}
                <span class="badge">{{ info.žanr }}</span></span
              >
              <div class="blockquote-footer mt-1">
                {{ info.autor }}
                <cite title="Source Title">({{ info.godina }})</cite>
              </div>
              <span>Napredak:</span>
              <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 50%">
                  120/240
                </div>
              </div>
              <p class="lead mt-4">OPIS KNJIGE KAO TAKVE</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
export default {
  props: ["info"],
  data() {
    return {
      imageUrl: require("@/assets/placeholder.jpg"),
    };
  },
  mounted() {},
  methods: {
    pushRuta(passId) {
      console.log(passId);
      //router.push({ name: "knjiga" });
    },
  },
};
</script>

<style scoped>
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

.image-blurred-edge {
  width: 200px;
  height: 250px;
  background-size: cover;
  background-position: center;
  box-shadow: 0 0 4px 4px #fffdeb inset;
}
</style>
