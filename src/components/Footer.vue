<template>
    <div class="flex justify-center bg-dark-background gap-16">
        <div class="grid grid-cols-2 justify-center my-auto gap-x-2 gap-y-4">
            <Cluster v-for="(cluster, i) in clusters" :key="i" :name="cluster.name" :color="cluster.color" :current="cluster.current" :total="cluster.total" />
        </div>
        <div v-if="(trams.length > 0 && clusters.length > 0)" class="w-1 h-auto my-6 bg-background rounded-full"></div>
        <div class="grid grid-flow-col justify-center relative gap-8" :key="updateList">
            <TramVue v-for="(tram, i) in trams" :key="i" :line="tram.line" :type="tram.type" :stop="tram.stop" :color="tram.color" :directions="tram.directions" />
        </div>
        <div class="absolute left-0 bottom-0 p-4">
            <p class="text-gray-400 font text-[10px] mb-1 text-center">preview {{version}}<br/></p>
            <p class="text-gray-400 font text-[8px]">Made with ❤️ by alopez and lvolland</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import {version} from '../../package.json';
import TramVue, { TramDirection } from './Tram.vue';
import Cluster from './Cluster.vue';
</script>

<script lang="ts">
import { capitalize, ref, Ref } from 'vue';

let trams: Ref<any> = ref([]);
let clusters: Ref<any> = ref([]);
let updateList: Ref<number> = ref(0);

let updateTrams = function() {            
    console.log("Fetching new data for trams (at " + new Date().toLocaleTimeString() + ")");
    fetch('https://prod.middleware.42dashboard.zenekhan.tech/tram', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        let newTrams: any = [];
        for (let tram in data.data)
        {
            let directions: TramDirection[] = [];
            for (let dir in data.data[tram].directions)
            {
                let direction = data.data[tram].directions[dir];
                directions.push(new TramDirection(direction.name, direction.eta, direction.eta_hour, direction.realtime));
            }
            newTrams.push({
                line: data.data[tram].line,
                type: data.data[tram].type,
                stop: data.data[tram].stop,
                color: data.data[tram].color,
                directions: directions
            });
        }
        trams.value = newTrams;
        updateList.value++;
    });
}

let switchClusters = function(name: string, current: any) {
    console.log("Switching cluster " + name + " to " + current);
    switch (name) {
        case "c1":
            return {name: name.toUpperCase(), color: "#66F6FF", current: current, total: 48};
        case "c2":
            return {name: name.toUpperCase(), color: "#02B76A", current: current, total: 72};
        case "c3":
            return {name: name.toUpperCase(), color: "#FF6666", current: current, total: 12};
        case "c4":
            return {name: name.toUpperCase(), color: "#FFE766", current: current, total: 12};
        case "bocal":
            return {name: capitalize(name), color: "#A061D1", current: current, total: 6};
        default:
            break;
    }
}

let updateClusters = function() {
    console.log("Fetching new data for clusters (at " + new Date().toLocaleTimeString() + ")");
    fetch('https://prod.middleware.42dashboard.zenekhan.tech/cluster', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        clusters.value = [];
        console.log(Object.entries(data.data));
        for (let resp of Object.entries(data.data)) {
            clusters.value.push(switchClusters(resp[0], resp[1]));
        }
        updateList.value++;
    });
}

updateTrams();
setTimeout(updateClusters, 5000);
setInterval(updateTrams, 25000);
setInterval(updateClusters, 180000);

export default {
    name: "FooterVue",
    data() {
        return {
            trams: trams,
            clusters: clusters,
            updateList: updateList,
        }
    }
}
</script>