<template>
<div>
  <nav-bar></nav-bar>
  <div class="app">
    <router-view></router-view>
  </div>  
</div>  
</template>

<script>

</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

ul {
  list-style: none;
}

.app {
  padding: 20px;
}
</style>
