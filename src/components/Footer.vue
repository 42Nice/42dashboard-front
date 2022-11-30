
<template>
    <div class="h-[70px] bg-dark-background grid grid-flow-col justify-center relative" :key="updateList">
        <TramVue class="mx-16" v-for="(tram, i) in trams" :key="i" :color="tram.color" :line="tram.line" :direction="tram.direction" :eta="tram.eta" :eta_hour="tram.eta_hour" :realtime="tram.realtime == 1" />
        <div class="absolute bottom-0 left-0">
            <p class="text-white font text-[8px] mx-2 p-4">bêta {{version}}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import {version} from '../../package.json';
import TramVue from './Tram.vue';
</script>

<script lang="ts">
import { ref, Ref } from 'vue';

let trams: Ref<any> = ref([]);
let updateList: Ref<number> = ref(0);



let updateData = function() {            
    console.log("Fetching new data for trams (at " + new Date().toLocaleTimeString() + ")");
    fetch('https://prod.middleware.42dashboard.zenekhan.tech/tram', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        trams.value = data.data;
        console.log(trams.value);
        updateList.value++;
    });
}

updateData();
setInterval(updateData, 25000);

export default {
    name: "FooterVue",
    data() {
        return {
            trams: trams,
            updateList: updateList,
        }
    }
}
</script>