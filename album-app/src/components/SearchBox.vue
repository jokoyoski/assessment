<template>
  <div class="search-box">
    <input v-model="searchTerm" type="text" placeholder="Search albums...">
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: ''
    };
  },
  watch: {
    searchTerm(newTerm) {
      this.$emit('search', newTerm);
    }
  }
}
</script>

<style src="./SearchBox.css"></style>
