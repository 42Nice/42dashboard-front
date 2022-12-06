<template>
    <div class="grid grid-cols-2 scale-[150%]">
        <div class="flex flex-col h-full mr-8">
            <p class="text-white font font-thin text-[30px] mb-4">UPCOMING EVENTS</p>
            <div class="bg-dark-background h-full flex flex-col gap-3 p-2 w-[500px] rounded-xl">
                <EventVue v-if="(events[0].length > 0)" v-for="event in events[0]" :key="event.id" :name="event.name" :begin="new Date(event.begin)"
                    :type="event.type" :location="event.location" :color="event.color" :duration="event.duration" :reserved="event.reserved" :max="event.max" />
                <div v-if="(events[0].length > 0)" v-for="n in (5 - events[0].length)" class="bg-background h-[72px] rounded-xl" />
                <div class="my-auto py-8" v-if="(events[0].length == 0)">
                    <img class="m-auto" src="/assets/no_event.png" />
                    <p class="font text-[30px] text-center text-white mt-8 mx-16">There is no event scheduled for now</p>
                </div>
            </div>
        </div>
        <div class="flex flex-col h-full ml-8">
            <p class="text-white font font-thin text-[30px] mb-4">UPCOMING EXAMS</p>
            <div class="bg-dark-background h-full flex flex-col gap-3 p-2 w-[500px] rounded-xl">
                <EventVue v-if="(events[1].length > 0)" v-for="event in events[1]" :key="event.id" :name="event.name" :begin="new Date(event.begin)"
                    :type="event.type" :location="event.location" :color="event.color" :duration="event.duration" :reserved="event.reserved" :max="event.max"/>
                <div v-if="(events[1].length > 0)" v-for="n in (5 - events[1].length)" class="bg-background h-[72px] rounded-xl" />
                <div class="my-auto py-8" v-if="(events[1].length == 0)">
                    <img class="m-auto" src="/assets/no_exam.png" />
                    <p class="font text-[30px] text-center text-white mt-8 mx-16">There is no exam scheduled for now</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import EventVue from "./Event.vue";
</script>

<script lang="ts">
import { Ref, ref } from 'vue';

let events: Ref<any> = ref([[], []]);

let updateData = function () {
    console.log("Fetching new data for events (at " + new Date().toLocaleTimeString() + ")");
    fetch("https://prod.middleware.42dashboard.zenekhan.tech/event", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(function (response) {
            return (response.json());
        })
        .then((data) => {
            if (data.data == null)
                return;
            events.value = data.data;
            if (events.value[0].length > 5)
                events.value[0] = events.value[0].slice(0, 5);
            if (events.value[1].length > 5)
                events.value[1] = events.value[1].slice(0, 5);
        });
}

setTimeout(() => {
    updateData();
    setInterval(updateData, 300000);
}, 2000);

export default {
    name: "EventsVue",
    data() {
        return {
            events: events,
        };
    }
}
</script>