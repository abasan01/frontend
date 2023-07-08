<template>
  <div id="app">
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
      <a class="navbar-brand" href="#"
        ><img style="width: 100px" src="@/assets/knjigogram_logo.png"
      /></a>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Glavna</router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/knjige">Knjige</router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/liste">Liste</router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/login">Ulogiraj se</router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/upload"
              >Dodaj Knjige</router-link
            >
          </li>
          <li class="nav-item active">
            <span @click="logout()" class="nav-link clickable"
              >Odlogiraj se</span
            >
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-primary my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      console.log("test");
    },
  },
  components: {},
};
</script>

<style lang="scss">
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

.nav-link:focus {
  color: $crose;
}

.form-control {
  --bs-body-bg: #fffbd8;
  --bs-body-color: #424242;
  --bs-border-color: #424242;
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
  background: $ccream;

  a {
    font-weight: bold;
    color: $secondary;

    &.router-link-exact-active {
      color: $crose !important;
    }
  }
}

body {
  background: $primary;
}
</style>
