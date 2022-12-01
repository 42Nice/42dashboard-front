<template>
    <div class="flex items-center justify-center gap-x-2 my-auto font">
        <p class="text-[28px] font" :style="{color: color}">{{name}}</p>
        <div class="text-[36px] text-white">
            <a class="font font-bold">{{current.toString().padStart(2, "0")}}</a>
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