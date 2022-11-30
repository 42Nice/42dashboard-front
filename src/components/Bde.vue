<template>
    <div class="flex flex-col h-full">
        <p class="text-white text-[35px] text-center font-bold font mb-8">BDE ANNOUNCEMENTS</p>
        <img v-if="imgUrl != ''" :src="imgUrl" class="mx-auto max-h-[400px]">
    </div>
</template>

<script lang="ts">
import { Ref, ref } from 'vue'; 

let imgUrl: Ref<string> = ref('');

let updateData = function () {
    fetch('https://prod.middleware.42dashboard.zenekhan.tech/bde', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        imgUrl.value = data.data.bde_pic_url;
    });
}

updateData();
setInterval(updateData, 180000);

export default {
    name: "BdeVue",
    data() {
        return {
            imgUrl: imgUrl
        }
    }
}
</script>