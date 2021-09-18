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
  </div>  
</template>

<script>
import PostList from '@/components/PostList.vue';
import PostForm from '@/components/PostForm.vue';
import usePosts from '@/hooks/usePosts';
import useSortedPosts from '@/hooks/useSortedPosts';
import useSortedAndSearchedPosts from '@/hooks/useSortedAndSearchedPosts';

export default {
  components: {
    PostList,
    PostForm
  },
  data() {
    return {
      isDialogVisible: false,
      sortOptions: [
        {value: 'title', name: 'By title'},
        {value: 'body', name: 'By description'},
      ],
    }
  },
  setup(props) {
    const {posts, isPostsLoading, totalPages} = usePosts(10);
    const {selectedSort, sortedPosts} = useSortedPosts(posts);
    const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts);
  
    return {
      posts, 
      isPostsLoading,
      totalPages, 
      selectedSort, 
      sortedPosts, 
      searchQuery, 
      sortedAndSearchedPosts
    };
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
  },
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
