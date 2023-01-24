<script setup lang="ts">
import CoalitionUser from "./CoalitionUser.vue";
</script>

<template>
    <div class="h-fit my-auto shadow-xl rounded-lg w-[360px] bg-cover" :style="{backgroundImage: 'linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)), url('+bg+')'}">
        <img :src="'/assets/' + medal" :alt="medal" class="w-[60px] h-auto mx-auto my-5">
        <img :src="logo" alt="logo" class="w-[160px] h-auto mx-auto mb-5">
        <p class="text-[35px] mb-4 uppercase text-center font" :style="{color: color}">{{name}}</p>
        <div class="flex justify-center gap-2 mb-8">
            <img src="/assets/trophy.svg" alt="trophy" class="w-[30px] h-auto">
            <p class="text-white text-[35px] font">{{score}}</p>
        </div>
        <div class="flex flex-row justify-center items-center gap-8">
            <CoalitionUser :login="(tops[1] as any).login" :image="(tops[1] as any).image" :index="1" :color="color"/>
            <CoalitionUser :login="(tops[0] as any).login" :image="(tops[0] as any).image" :index="0" :color="color"/>
            <CoalitionUser :login="(tops[2] as any).login" :image="(tops[2] as any).image" :index="2" :color="color"/>
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
        tops: {
            type: Array,
            required: true,
        },
    }
}
</script>