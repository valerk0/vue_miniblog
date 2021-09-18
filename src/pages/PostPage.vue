<template>
  <div>
    <h1 class="app__title">Posts page</h1>
    <my-input v-focus v-model="searchQuery" placeholder="Search..." />
    <div class="app__btns">
      <my-button @click="showDialog">Create a post</my-button>
      <my-select v-model="selectedSort" :options="sortOptions"></my-select>
    </div>
    <my-dialog v-model:show="isDialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list 
      v-if="!isPostsLoading" 
      :posts="sortedAndSearchedPosts" 
      @remove="removePost" 
    />
    <div v-else>Loading...</div>
    <div v-intersection="loadMorePosts"></div>
  </div>  
</template>

<script>
import axios from 'axios';
import PostList from '@/components/PostList.vue';
import PostForm from '@/components/PostForm.vue';

export default {
  components: {
    PostList,
    PostForm
  },
  data() {
    return {
      posts: [],
      isDialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      sortOptions: [
        {value: 'title', name: 'By title'},
        {value: 'body', name: 'By description'},
      ],
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.isDialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(pst => pst.id !== post.id);
    },
    showDialog() {
      this.isDialogVisible=true;
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
        }});
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = response.data;
      } catch(e) {
        console.log(e);
      } finally {
        this.isPostsLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
        }});
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...response.data];
      } catch(e) {
        console.log(e);
      } finally {
      }
    }
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((a, b) => {
        return a[this.selectedSort]?.localeCompare(b[this.selectedSort]);
      });
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  }
}
</script>

<style>
.app__title {
  margin-bottom: 15px;
}

.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}
</style>
