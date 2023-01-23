<template>
  <div v-if="!isClone" class="flex flex-col h-full w-full">
    <div class="flex flex-row justify-center items-center my-8 h-full gap-32">
      <div class="flex flex-col gap-4 justify-center items-center">
        <div class="flex flex-row gap-4">
          <img src="/assets/qrcodes/instagram-logo.png" height="32" width="32"/>
          <p class="text-white text-xl">@42nice</p>
        </div>
        <img src="/assets/qrcodes/qrinsta.png" height="256" width="256"/>
      </div>
      <div v-if="stories.length > 0" class="relative rounded-lg" style="width: 350px; height: 580px">
        <div class="bg-cover bg-no-repeat h-full rounded-lg">
          <div class="h-full">
            <img v-if="stories[key].type == 'image'" :src="stories[key].url" class="h-full w-full rounded-lg object-contain" />
            <video v-else-if="stories[key].type == 'video'" :src="stories[key].url" class="h-full w-full rounded-lg" autoplay muted />
          </div>
          <div class="w-full pt-4 absolute top-0">
            <div class="w-11/12 flex m-auto">
              <div v-for="(elm, index) in stories.length" class="w-full rounded-lg mr-2 relative h-auto" :key="index">
                <!-- length slide -->
                <div
                  class="absolute w-full rounded-lg"
                  style="height: 4px; background-color: rgba(255, 255, 255, 0.35);"
                ></div>
                <!-- end length -->
                <div
                  class="absolute w-full rounded-lg"
                  style="height: 4px; background-color: white"
                  :style="
                    index == key
                      ? `width: ${percentage}%`
                      : key > index
                      ? `width:100%`
                      : `width:0%`
                  "
                ></div>
              </div>
            </div>
            <div class="flex w-11/12 mt-4 m-auto">
              <div class="flex justify-start items-center w-1/2">
                <div class="flex justify-center" style="width: 35px; height: 35px">
                  <img src="/assets/insta-logo.jpg" class="rounded-full my-auto" />
                </div>
                <div class="ml-4">
                  <p class="text-sm text-white font-semibold">
                    42 Nice
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="absolute top-1/2 -left-11">
          <i
            @click="prev()"
            class="
              fas
              fa-chevron-circle-left
              text-gray-500
              cursor-pointer
              hover:text-gray-300
              transition-colors
              duration-150
              ease-linear
            "
          />
        </div>
        <div class="absolute top-1/2 -right-11">
          <i
            @click="next()"
            class="
              fas
              fa-chevron-circle-right
              text-gray-500
              cursor-pointer
              hover:text-gray-300
              transition-colors
              duration-150
              ease-linear
            "
          ></i>
        </div>
      </div>
      <div class="flex flex-col gap-4 justify-center items-center">
        <div class="flex flex-row gap-4">
          <img src="/assets/qrcodes/linkedin-logo.png" height="32" width="32"/>
          <p class="text-white text-xl">42 Nice</p>
        </div>
        <img src="/assets/qrcodes/qrlinkedin.png" height="256" width="256"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import Log from './Log.vue';

class Story {
  id: number;
  type: string;
  url: string;
  duration: number;

  constructor(id: number, type: string, url: string, duration: number) {
    this.id = id;
    this.type = type;
    this.url = url;
    this.duration = duration;
  }
}

const stories = ref([] as Story[]);

const key = ref(0);
const percentage = ref(0);
const timer = ref(0);
const progress = ref(0);
const interval = ref(0);

const next = () => {
  key.value = (key.value + 1) % stories.value.length;
  reset();
}
const prev = () => {
  key.value = (key.value - 1 + stories.value.length) % stories.value.length;
  reset();
}
const play = () => {
  timer.value = new Date().getTime();
  if (key.value == null || stories.value[key.value] == null)
    return;
  let duration = stories.value[key.value].duration * 1000;
  progress.value = setInterval(() => {
    let time = new Date().getTime();
    percentage.value = Math.floor((100 * (time - timer.value)) / duration);
  }, duration / 100);
  interval.value = setInterval(next, duration);
}

const reset = () => {
  percentage.value = 0;
  clearInterval(interval.value);
  clearInterval(progress.value);
  play();
}

const updateData = async () => {
  Log.methods?.debug("Fetching new data for stories");
  let response = await fetch("https://prod.middleware.42dashboard.zenekhan.tech/stories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await response.json();
  if (data.data == null)
    return;
  stories.value = [];
  for (let i = 0; i < data.data.length; i++) {
    stories.value.push(new Story(data.data[i].id, data.data[i].type, data.data[i].url, data.data[i].duration));
  }
  if (key.value >= stories.value.length)
    key.value = 0;
}

export default {
  name: 'Stories',
  data() {
    let props: any = this.$parent?.$props;
    return {
      isClone: props.isClone,
      stories: stories,
      next: next,
      prev: prev,
      key: key,
      percentage: percentage,
    }
  },
  async mounted() {
    if (this.isClone)
      return;
    await updateData();
    play();
    setInterval(updateData, 10000);
  },
}
</script>