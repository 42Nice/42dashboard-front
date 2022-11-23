<script setup lang="ts">
  import HeaderVue from './components/Header.vue';
  import FooterVue from './components/Footer.vue';
  import CoalitionsVue from './components/Coalitions.vue';
</script>

<template>
  <div class="flex flex-col h-screen bg-cover bg-image">
    <HeaderVue />
    <div id="content" class="flex-grow">
      <CoalitionsVue />
    </div>
    <FooterVue />
  </div>
</template>

<style scoped>
.bg-image {
  background-image: url('src/assets/bg.png');
}
</style>

<style>
.font {
  font-family: 'Inter', sans-serif;
  line-height: 80%;
}
</style>