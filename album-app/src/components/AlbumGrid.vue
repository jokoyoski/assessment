<template>
  <div class="album-grid">
    <div v-for="album in filteredAlbums" :key="album.collectionId" class="album">
      <img :src="album.artworkUrl100" alt="Album Artwork">
      <p>{{ album.collectionName }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    albums: {
      type: Array,
      required: true
    },
    searchTerm: {
      type: String,
      default: ''
    }
  },
  computed: {
    filteredAlbums() {
      return this.albums?.data?.filter(album => album.collectionName.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
  }
}
</script>
<style src="./AlbumGrid.css"></style>
