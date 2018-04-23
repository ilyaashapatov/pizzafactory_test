<template>
  <div id="app">
    <header class="header px-3 py-3 pt-md-5 pb-md-4 text-center">
      <h1 class="display-4">Тестовое задание</h1>
    </header>

    <main class="container mb-5 pb-5">
      <transition name="fade">
        <router-view/>
      </transition>
    </main>

    <footer class="footer">
      <div class="container text-center">
        <small class="text-muted">@ilyaashapatov</small>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Scada:400,700&subset=cyrillic-ext');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import '../node_modules/bootstrap/scss/bootstrap.scss';

#app {
  font-family: 'Scada', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html {
  position: relative;
  min-height: 100%;
}
body {
  margin-bottom: 60px;
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px; /* Set the fixed height of the footer here */
  line-height: 60px; /* Vertically center the text there */
  background-color: #f5f5f5;
}

.material-icons {
  vertical-align: middle;

  &.md-18 {
    font-size: 18px;
  }

  &.md-24 {
    font-size: 24px;
  }

  &.md-36 {
    font-size: 36px;
  }

  &.md-48 {
    font-size: 48px;
  }

  &.md-dark {
    color: rgba(0, 0, 0, 0.54);

    &.md-inactive {
      color: rgba(0, 0, 0, 0.26);
    }
  }

  &.md-light {
    color: rgba(255, 255, 255, 1);

    &.md-inactive {
      color: rgba(255, 255, 255, 0.3);
    }
  }
}
</style>
