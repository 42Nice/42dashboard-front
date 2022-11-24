<template>
    <div class="flex flex-col h-full">
        <p class="text-white text-[35px] text-center font-bold font mb-8">{{ enddate }}</p>
        <div class="h-full flex-grow grid gap-8 grid-flow-col mx-auto">
            <CoalitionVue v-for="coalition in coalitions" :key="coalition.name" :name="coalition.name"
                :score="coalition.score" :bg="coalition.bg" :color="coalition.color" :medal="coalition.medal"
                :logo="coalition.logo" />
        </div>
    </div>
</template>

<script lang="tsx" setup>
import CoalitionVue from './Coalition.vue';
</script>

<script lang="tsx">
import { Ref, ref } from 'vue';

let updateData = function () {
    let today = new Date();
    let d = new Date(2023, 4, 31, 23, 42); // TODO get from API
    let diff = d.getTime() - today.getTime();
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days > 30)
        enddate.value = "END IN " + Math.round(days / 30) + " MONTHS";
    else if (days > 0)
        enddate.value = "END IN " + days + " DAYS";
    else
        enddate.value = "END IN " + Math.floor(diff / (1000 * 60 * 60)) + " HOURS";

    console.log("Fetching coalitions");
    fetch("https://prod.middleware.42dashboard.zenekhan.tech/coalitions", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            console.log("response from coalitions:", response);
            return (response.json());
        })
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
};

let coalitions: Ref<any> = ref([]);
let enddate = ref('');

updateData();
setInterval(updateData, 300000);

export default {
    name: "CoalitionsVue",
    data() {
        return {
            coalitions: coalitions,
            enddate: enddate,
        };
    }
}
</script>