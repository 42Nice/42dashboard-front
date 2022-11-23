<template>
    <div class="h-[70px] bg-dark-background grid grid-flow-col justify-center">
        <TramVue class="mx-16" v-for="tram in trams" :name="tram.name" :color="tram.color" :line="tram.line" :direction="tram.direction" :parsedeta="tram.parsedeta.toString()" :realtime="tram.realtime == 1" />
    </div>
</template>

<script setup lang="ts">
import TramVue from './Tram.vue';
</script>

<script lang="ts">
import { ref, Ref } from 'vue';

let lastFetch = new Date(1970, 1, 1);
let trams: Ref<any> = ref([]);

export default {
    name: "FooterVue",
    data() {
        return {
            trams: trams
        }
    },
    methods: {
        updateData() {
            if ((new Date().getTime() - lastFetch.getTime()) <= 60000)
                return;
            
            console.log("Fetching new data for trams");
            lastFetch = new Date();
            fetch('https://prod.middleware.42dashboard.zenekhan.tech/tram', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                trams.value = data.data[0].concat(data.data[1]);
            });
        },
    },
    mounted() {
        this.updateData();
        setInterval(this.updateData, 1000); 
    }
}
</script>