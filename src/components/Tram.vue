<template>
    <div class="flex items-center">
        <div class="rounded-full flex h-fit p-1" :style="{backgroundColor: color}">
            <img src="src/assets/tram.svg" alt="icon" class="w-[30px] h-[30px] m-[2px]" />
            <div class="rounded-full bg-white flex items-center ml-1">
                <p class="text-black font text-[22px] mx-2 ny-1">{{line}}</p>
            </div>
        </div>
        <div>
            <p class="text-white font text-[22px] mx-2">{{dir}}</p>
        </div>
        <div class="flex items-center" v-if="realtime">
            <p class="text-[#02B76A] font text-[22px] mr-2">{{peta}}</p>
            <img src="src/assets/rt.gif" alt="real_time" class="w-[15px] h-[30px]" />
        </div>
        <div v-else class="flex flex-col items-center">
            <p class="text-white font-bold font text-[18px] mb-2">{{hour}}</p>
            <p class="text-white font text-[14px]">{{peta}}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
    name: "TramVue",
    props: {
        line: {
            type: String,
            required: true,
        },
        direction: {
            type: String,
            required: true,
        },
        parsedeta: {
            type: String,
            required: true,
        },
        realtime: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        let dir = this.direction;
        if (dir == 'Aéroport Terminal 2')
            dir = 'Aéroport T2';
        else if (dir == 'Saint-Isidore')
            dir = 'St-Isidore';
        let peta;
        let hour = null;
        if (this.realtime) {
            peta = this.parsedeta;
            if (peta == '0') peta = 'En approche';
            else peta += ' min';
        } else {
            hour = this.parsedeta.split('\\n')[0];
            peta = this.parsedeta.split('\\n')[1];
            if (peta == '(0 min.)') peta = "À l'arrêt";
        }
        console.log(this.realtime);
        return {
            dir: dir,
            color: this.line == 'L3'?'#009640':'#004F9F',
            peta: peta,
            hour: hour,
        }
    }
}
</script>