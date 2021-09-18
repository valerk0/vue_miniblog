import axios from 'axios';

export const postModule = {
  state: () => ({
    posts: [],
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
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((a, b) => {
        return a[state.selectedSort]?.localeCompare(b[state.selectedSort]);
      });
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()));
    }
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setIsPostsLoading(state, isPostsLoading) {
      state.isPostsLoading = isPostsLoading;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
    setPage(state, page) {
      state.page = page;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
  },
  actions: {
    createPost({state, commit}, post) {
      commit('setPosts', [...state.posts, post]);
    },
    removePost({state, commit}, post) {
      commit('setPosts', state.posts.filter(pst => pst.id !== post.id));
    },
    async fetchPosts({state, commit}) {
      try {
        commit('setIsPostsLoading', true);
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: state.page,
            _limit: state.limit
        }});
        const totalPages = Math.ceil(response.headers['x-total-count'] / state.limit);
        commit('setTotalPages', totalPages);
        commit('setPosts', response.data);
      } catch(e) {
        console.log(e);
      } finally {
        commit('setIsPostsLoading', false);
      }
    },
    async loadMorePosts({state, commit}) {
      try {
        commit('setPage', state.page + 1);
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: state.page,
            _limit: state.limit
        }});
        const totalPages = Math.ceil(response.headers['x-total-count'] / state.limit);
        commit('setTotalPages', totalPages);
        commit('setPosts', [...state.posts, ...response.data]);
      } catch(e) {
        console.log(e);
      } 
    }
  },
  namespaced: true
};