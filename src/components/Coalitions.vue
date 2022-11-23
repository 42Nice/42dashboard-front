<template>
    <div class="flex flex-col h-full">
        <div class="border-2 my-6 rounded-xl mx-auto border-light-background w-[80px]" />
        <p class="text-white text-[35px] text-center font-bold font">{{enddate}}</p> 
        <div class="h-full flex-grow grid gap-8 grid-flow-col mx-auto">
            <CoalitionVue
                v-for="coalition in coalitions"
                :key="coalition.name"
                :name="coalition.name"
                :score="coalition.score"
                :bg="coalition.bg"
                :color="coalition.color"
                :medal="coalition.medal"
                :logo="coalition.logo"
            />
        </div>
        <div class="flex gap-4 my-6 justify-center">
            <div class="border-2 rounded-xl border-[#999999] w-[1px]" />
            <div class="border-2 rounded-xl border-light-background w-[1px]" />
            <div class="border-2 rounded-xl border-light-background w-[1px]" />
        </div>
    </div>
</template>

<script lang="tsx" setup>
import CoalitionVue from './Coalition.vue';
</script>

<script lang="tsx">
import { Ref, ref } from 'vue';

let coalitions: Ref<any> = ref([]);
let enddate = '';

let today = new Date();
let d = new Date(2023, 4, 31, 23, 42); // TODO get from API
console.log(d.toDateString());
let diff = d.getTime() - today.getTime();
let days = Math.floor(diff / (1000 * 60 * 60 * 24));
console.log(diff);
if (days > 30)
    enddate = "END IN " + Math.round(days / 30) + " MONTHS";
else if (days > 0)
    enddate = "END IN " + days + " DAYS";
else
    enddate = "END IN " + Math.floor(diff / (1000 * 60 * 60)) + " HOURS";

fetch("https://prod.middleware.42dashboard.zenekhan.tech/coalitions", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
})
    .then((response) => response.json())
    .then((data) => {
        // map the coalitions to a component
        let size = data.data.length;
        let ndata = data.data.map((coalition: any, index: number) => {
            let medal: string = "medal" + (size - index) + ".svg";
            return {
                name: coalition.name,
                score: coalition.score,
                bg: coalition.bg,
                color: coalition.color,
                medal: medal,
                logo: coalition.logo,
            };
        });
        if (size == 3)
            coalitions.value = [ndata[1], ndata[2], ndata[0]];
        else
            coalitions.value = ndata;
    });

export default {
    name: "CoalitionsVue",
    data() {
        return {
            coalitions: coalitions,
        };
    }
}
</script>