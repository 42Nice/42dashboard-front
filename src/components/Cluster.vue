<template>
    <div class="flex bg-dark-background rounded-full">
        <p class="my-auto mx-2 text-[28px] mr-1 font" :style="{color: color}">{{name}}</p>
        <div class="mx-2 text-[36px] text-white">
            <a class="font font-bold">{{current}}</a>
            <a class="font">/</a>
            <a class="font font-bold">{{total}}</a>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "Cluster",
    props: {
        name: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        current: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        }
    }
}
</script>