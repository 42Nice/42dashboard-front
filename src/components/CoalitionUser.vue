<template>
  <div class="flex flex-col">
    <div class="relative">
      <img :src="image" alt="top_image" class="object-cover mx-auto rounded-full border-4" :class="index == 0 ? 'w-20 h-20' : 'w-16 h-16'" :style="{ borderColor: color }">
      <img :src="'/assets/medal' + (index + 1) + '.svg'" alt="medal" class="w-[32px] h-auto absolute -bottom-3 right-1">
    </div>
    <p class="text-white text-[16px] text-center font-bold font mt-6 mb-8">{{ login }}</p>
  </div>
</template>

<script lang="ts">
export default {
  name: "CoalitionUser",
  props: {
    login: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      size: this.index == 0 ? 80 : 60,
    };
  },
}
</script>