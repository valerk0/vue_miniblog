<template>
  <li class="post">
    <div>
      <div><strong>Title: </strong>{{ post.title }}</div>
      <div><strong>Description: </strong>{{ post.body }}</div>
    </div>
    <div class="post__btns">
      <my-button @click="$router.push(`/posts/${post.id}`)" >
        Open
      </my-button>
      <my-button @click="$emit('remove', post)" >
        Delete
      </my-button>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
  
}
</script>

<style scoped>

.post {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 2px solid lightseagreen;
  margin-bottom: 15px;
}

.post__btns {
  display: flex;
}
</style>