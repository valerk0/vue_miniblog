<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'my-button'  
}
</script>

<style scoped>
.btn {
  padding: 10px 15px;
  border: 1px solid lightseagreen;
  color: lightseagreen;
  background: none;
  cursor: pointer;
}

.btn:hover {
  background: rgba(32, 178, 170, 0.3);
}
</style>