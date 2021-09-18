<template>
  <div>
    <h1 class="app__title">Posts page</h1>
    <my-input 
      v-focus 
      :model-value="searchQuery" 
      @update:model-value="setSearchQuery"
      placeholder="Search..." 
    />
    <div class="app__btns">
      <my-button @click="showDialog">Create a post</my-button>
      <my-select 
        :model-value="selectedSort" 
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      ></my-select>
    </div>
    <my-dialog v-model:show="isDialogVisible">
      <post-form @create="createPost1" />
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
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
import PostList from '@/components/PostList.vue';
import PostForm from '@/components/PostForm.vue';

export default {
  components: {
    PostList,
    PostForm
  },
  data() {
    return {
      isDialogVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort'
    }),
    ...mapActions({
      fetchPosts: 'post/fetchPosts',
      loadMorePosts: 'post/loadMorePosts',
      createPost: 'post/createPost',
      removePost: 'post/removePost'
    }),
    createPost1(post) {
      this.createPost(post);
      this.isDialogVisible = false;
    },
    showDialog() {
      this.isDialogVisible=true;
    },
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
      sortOptions: state => state.post.sortOptions,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    })
  },
  mounted() {
    this.fetchPosts();
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
