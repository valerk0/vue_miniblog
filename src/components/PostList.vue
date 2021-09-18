<template>
  <div v-if="posts.length > 0">
    <h3 class="post-title">Posts list</h3>
    <ul>
      <transition-group name="post-list">
        <post-item 
          v-for="post in posts" 
          :post="post" 
          :key="post.id" 
          @remove="$emit('remove', post)"
        />
      </transition-group>
    </ul>
  </div>
  <h2 v-else style="color: red;">
    Post list is empty!
  </h2>
</template>

<script>
import PostItem from '@/components/PostItem';

export default {
  components: {
    PostItem
  },
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.post-title {
  margin-bottom: 15px;
}

.post-list-item {
  display: inline-block;
  margin-right: 10px;
}

.post-list-enter-active,
.post-list-leave-active {
  transition: all .5s ease;
}

.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

.post-list-move {
  transition: transform .4s ease;
}
</style>