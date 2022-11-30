<script setup lang="ts">
  import HeaderVue from './components/Header.vue';
  import FooterVue from './components/Footer.vue';
  import CoalitionsVue from './components/Coalitions.vue';
  import EventsVue from './components/Events.vue';
  import BdeVue from './components/Bde.vue';
  import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
  import 'vue3-carousel/dist/carousel.css';
</script>

<template>
  <div class="flex flex-col h-screen bg-cover bg-image">
    <HeaderVue />
    <div id="content" class="flex-grow">
      <div class="border-2 my-6 rounded-xl mx-auto border-light-background w-[80px]" />
      <Carousel ref="myCarousel" :autoplay="30000" :wrapAround="true" :snapAlign="'center'">
        <Slide key="coals">          
          <CoalitionsVue />
        </Slide>
        <Slide key="events">
          <EventsVue />
        </Slide>
        <Slide key="bde">
          <BdeVue />
        </Slide>
        <template #addons>
          <navigation />
          <pagination />
        </template>
      </Carousel>
    </div>
    <FooterVue />
  </div>
</template>

<script lang="ts">
export default {
  name: "App",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
},
}
</script>

<style scoped>
.bg-image {
  background-image: url('/assets/bg.png');
}
</style>

<style>
.font {
  font-family: 'Inter', sans-serif;
  line-height: 80%;
} 
</style>