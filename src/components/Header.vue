<template>
    <div class="h-[80px] bg-dark-background flex">
        <!-- 42 Logo -->
        <div class="bg-background z-10">
            <img src="/assets/42Nice_Logo.svg" alt="42 logo" class="w-[80px] h-full mx-4">
        </div>

        <!-- Annonce text -->
        <div class="flex flex-grow justify-center overflow-hidden relative items-center">
            <span class="marqueetxt absolute text-white text-[35px] my-auto whitespace-nowrap font">{{ msg }}</span>
        </div>

        <!-- Hour -->
        <div class="flex bg-background z-10">
            <span class="text-white text-[35px] px-4 my-auto font">{{ hour }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import Log from './Log.vue';

const hour = ref('');
const msg = ref('');
let lastFetch = new Date(1970, 1, 1);

let updateData = function () {
    let today = new Date();
    let h = today.getHours().toString().padStart(2, '0') + ":" + today.getMinutes().toString().padStart(2, '0');
    hour.value = h;

    if ((today.getTime() - lastFetch.getTime()) <= 60000)
        return;

    Log.methods?.debug("Fetching new data for staff message");
    lastFetch = today;
    fetch('https://prod.middleware.42dashboard.zenekhan.tech/message', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        msg.value = "     " + data.data + "     ";
    });
}

updateData();
setInterval(updateData, 1000);

export default {
    name: "HeaderVue",
    data() {
        return {
            hour: hour,
            msg: msg
        }
    }
}
</script>

<style scoped>
.marqueetxt {
    -moz-animation: marquee 45s linear infinite;
    -webkit-animation: marquee 45s linear infinite;
    animation: marquee 45s linear infinite;
}

@-moz-keyframes marquee {
    0% {
        transform: translateX(100%);
    }

    100% {
        transform: translateX(-100%);
    }
}

@-webkit-keyframes marquee {
    0% {
        transform: translateX(100%);
    }

    100% {
        transform: translateX(-100%);
    }
}

@keyframes marquee {
    0% {
        -moz-transform: translateX(100%);
        -webkit-transform: translateX(100%);
        transform: translateX(100%)
    }

    100% {
        -moz-transform: translateX(-100%);
        -webkit-transform: translateX(-100%);
        transform: translateX(-100%);
    }
}
</style>