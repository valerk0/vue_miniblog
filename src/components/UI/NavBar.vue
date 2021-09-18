<template>
  <div class="navbar">
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Posts</my-button>
      <my-button @click="$router.push('/store')">Posts with store</my-button>
      <my-button @click="$router.push('/composition')">Posts with composition</my-button>
      <my-button @click="$router.push('/about')">About</my-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav-bar'
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  padding: 15px;
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
}

.navbar__btns {
  margin-left: auto;
}

.navbar__btns button:not(:last-child) {
  margin-right: 10px;
}
</style>