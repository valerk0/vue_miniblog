<template>
  <form class="form" @submit.prevent>
    <h4 class="form-title">Create post</h4>
    <my-input v-focus
      v-model="post.title" 
      placeholder="Title"
    />
    <my-input 
      v-model="post.body" 
      placeholder="Description"
    />
    <my-button 
      @click="createPost" 
      class="form-btn"
    >
      Create
    </my-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit('create', this.post);
      this.post = {
        title: '',
        body: ''
      };
    }
  }
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}

.form-title {
  margin-bottom: 15px;
}

.form-btn {
  align-self: flex-end;
}
</style>