<template>
  <div id="app">
    <SearchBox @search="handleSearch" />
    <AlbumGrid :albums="albums" :search-term="searchTerm" />
  </div>
</template>

<script>
import axios from 'axios';
import SearchBox from './components/SearchBox.vue';
import AlbumGrid from './components/AlbumGrid.vue';

export default {
  name: 'App',
  components: {
    SearchBox,
    AlbumGrid
  },
  data() {
    return {
      albums: [],
      searchTerm: ''
    };
  },
  methods: {
    async fetchAlbums() {
      try {
        const response = await axios.get(`http://localhost:3000/albums/coldplay`);
        this.albums = response.data;
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    },
    handleSearch(searchTerm) {
      this.searchTerm = searchTerm;
    }
  },
  mounted() {
    this.fetchAlbums();
  }
}
</script>
