<template>
    <div class="h-fit my-auto shadow-xl rounded-lg w-[360px] bg-cover" :style="{backgroundImage: 'linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)), url('+bg+')'}">
        <img :src="'/assets/' + medal" :alt="medal" class="w-[60px] h-auto mx-auto my-5">
        <img :src="logo" alt="logo" class="w-[160px] h-auto mx-auto mb-5">
        <p class="text-[35px] mb-4 uppercase text-center font" :style="{color: color}">{{name}}</p>
        <div class="flex justify-center gap-2 mb-8">
            <img src="/assets/trophy.svg" alt="trophy" class="w-[30px] h-auto">
            <p class="text-white text-[35px] font">{{score}}</p>
        </div>
        <div class="flex flex-col justify-center items-center">
            <div class="w-[80px] h-[80px] relative">
                <img :src="top_image" alt="top_image" class="w-[80px] h-[80px] object-cover mx-auto rounded-full border-4" :style="{borderColor: color }">
                <span class="absolute -right-2 -top-2 rotate-45 text-2xl">👑</span>
            </div>
            <p class="text-white text-[22px] text-center font-bold font mt-2 mb-8">{{top_login}}</p>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "CoalitionVue",
    props: {
        name: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
        bg: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        medal: {
            type: String,
            required: true,
        },
        logo: {
            type: String,
            required: true,
        },
        top_login: {
            type: String,
            required: true,
        },
        top_image: {
            type: String,
            required: true,
        },
    }
}
</script>