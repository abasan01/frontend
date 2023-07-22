<template>
  <div id="app" style="margin-bottom: 100px">
    <nav
      class="navbar navbar-expand-lg p-2 mb-4 border-bottom border-secondary rounded-bottom"
    >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <router-link class="navbar-brand" to="/"
        ><img style="width: 100px" src="@/assets/knjigogram_logo.png"
      /></router-link>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item active" v-if="authenticated">
            <router-link class="nav-link" to="/">Glavna</router-link>
          </li>
          <li class="nav-item active" v-if="authenticated">
            <router-link class="nav-link" to="/knjige">Knjige</router-link>
          </li>
          <li class="nav-item active" v-if="authenticated">
            <router-link class="nav-link" to="/liste">Liste</router-link>
          </li>
          <li class="nav-item active" v-if="!authenticated">
            <router-link class="nav-link" to="/login">Ulogiraj se</router-link>
          </li>
          <li class="nav-item active" v-if="authenticated">
            <router-link class="nav-link" to="/upload"
              >Dodaj Knjige</router-link
            >
          </li>
          <li class="nav-item active" v-if="authenticated">
            <span @click="logout()" class="nav-link clickable"
              >Odlogiraj se</span
            >
          </li>
        </ul>
        <form
          v-if="authenticated"
          class="form-inline my-2 my-lg-0"
          @submit.prevent="setSearch()"
        >
          <input
            v-model="searchText"
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            @keydown.enter="setSearch()"
          />
          <button
            class="btn btn-primary my-2 my-sm-0"
            type="submit"
            @click="setSearch()"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
    <router-view />
    <div
      class="m-t4 p-4 text-center border border-secondary rounded-top mobile-hidden"
      style="
        position: fixed;
        bottom: 0;
        width: 100%;
        padding: 5px;
        background-color: #dfd9ab;
        color: #424242;
        z-index: 999;
      "
    >
      <p class="m-0">Andrija Bašan, 2023.</p>
    </div>
  </div>
</template>

<script>
import { Auth } from "./services/index.js";
import store from "./store";

export default {
  data() {
    return { searchText: "", authenticated: null };
  },
  async mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    this.searchText = urlParams.get("search");
    this.authenticated = !!Auth.getAuth();
    store.currentUser = JSON.parse(Auth.getAuth()).email;
    console.log("store.currentUser: ", store.currentUser);
  },
  methods: {
    logout() {
      Auth.logout();
      this.$router.go();
    },
    setSearch() {
      const currentRoute = this.$route.path;
      const search = this.searchText.trim();
      if (currentRoute !== "/knjige") {
        console.log("prvi if");
        this.$router.push({ name: "knjige", query: { search: search } });
      } else {
        console.log("else");
        this.$router
          .replace({ query: search ? { search: search } : {} })
          .catch(() => {});
        this.$router.go(0);
      }
    },
  },
  components: {},
};
</script>

<style lang="scss">
input::placeholder {
  opacity: 0.5;
}
:root {
  --bs-nav-link-font-size: 28px;
  --bs-nav-link-font-weight: bold;
}

$primary: #fffbd8;
$secondary: #424242;
$ccream: #dfd9ab;
$cgold: #ffd700;
$cgreen: #4caf50;
$crose: #e91e63;
$cdgray: #424242;
$primaryl: #fffdeb;

.nav-link:focus {
  color: $crose;
}

.form-control {
  background-color: #fffbd8;
  color: #424242;
  border: 1px solid #424242;
}

.btn {
  --bs-btn-bg: #fffbd8;
}

.clickable {
  cursor: pointer;
}

@import "../scss/custom.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  background: #dfd9ab;

  a {
    font-weight: bold;
    color: #424242;

    &.router-link-exact-active {
      color: $crose !important;
    }
  }
}

body {
  background: #fffbd8;
}
</style>
