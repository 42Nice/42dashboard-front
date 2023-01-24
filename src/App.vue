<script setup lang="ts">
  import HeaderVue from './components/Header.vue';
  import FooterVue from './components/Footer.vue';
  import CoalitionsVue from './components/Coalitions.vue';
  import EventsVue from './components/Events.vue';
  import BdeVue from './components/Bde.vue';
  import StoriesVue from './components/Stories.vue';
  import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
  import 'vue3-carousel/dist/carousel.css';
</script>

<template>
  <div class="flex flex-col h-screen bg-cover bg-image">
    <HeaderVue />
    <div class="flex flex-col h-full">
      <div class="border-2 my-6 rounded-xl mx-auto border-light-background w-[80px]" />
      <Carousel ref="myCarousel" :items-to-show="1" :wrap-around="true" :snapAlign="'center'" @init="handleInit" @slide-start="handleSlideStart">
        <Slide key="coals">
          <CoalitionsVue />
        </Slide>
        <Slide key="events">
          <EventsVue />
        </Slide>
        <Slide key="stories">
          <StoriesVue />
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
  <!-- Pause button -->
  <button class="m-4 w-4 h-4 absolute top-12 left-0 cursor-pointer text-white" @click="togglePause">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path v-if="!paused" id="pause-path" strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
      <path v-else id="play-path" strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
    </svg>
  </button>
</template>

<script lang="ts">
const times = [8, 8, 55, 8];

export default {
  name: "App",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      currentTime: 0,
      paused: false,
    };
  },
  methods: {
    updateSlider() {
      let carousel = this.$refs.myCarousel as any;
      if (carousel == null || carousel.data == null) return;
      
      // get the current slide index
      let index = carousel.data.currentSlide.value;
      // get the time for the current slide
      let time: number = times[index];
      // wait for the time
      if (this.currentTime > time) {
        this.currentTime = 0;
        carousel.next();
        this.updateSlider();
        return;
      }
      setTimeout(() => {
        // go to the next slide
        if (!this.paused)
          this.currentTime += 1;
        this.updateSlider();
      }, 1000);
    },
    handleSlideStart() {
      console.log("slide start");
      this.currentTime = 0;
    },
    handleInit() {
      console.log("init");
      this.updateSlider();
    },
    togglePause() {
      let carousel = this.$refs.myCarousel as any;
      if (carousel == null || carousel.data == null) return;
      if (this.paused)
        this.paused = false;
      else
        this.paused = true;
      console.log(this.paused);
    },
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