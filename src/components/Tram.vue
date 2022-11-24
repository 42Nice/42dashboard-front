<template>
    <div class="flex items-center">
        <div class="rounded-full flex h-fit p-1" :style="{backgroundColor: color}">
            <img src="/assets/tram.svg" alt="icon" class="w-[30px] h-[30px] m-[2px]" />
            <div class="rounded-full bg-white flex items-center ml-1">
                <p class="text-black font text-[22px] mx-2 ny-1">{{line}}</p>
            </div>
        </div>
        <div>
            <p class="text-white font text-[22px] mx-2">{{dir}}</p>
        </div>
        <div class="flex items-center" v-if="realtime">
            <p class="text-[#02B76A] font text-[22px] mr-2">{{peta}}</p>
            <img src="/assets/rt.gif" alt="real_time" class="w-[15px] h-[30px]" />
        </div>
        <div v-else class="flex flex-col items-center">
            <p class="text-white font-bold font text-[18px] mb-2">{{eta_hour}}</p>
            <p class="text-white font text-[14px]">{{peta}}</p>
        </div>
    </div>
</template>

<script lang="ts">
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
        eta: {
            type: Number,
            required: true,
        },
        eta_hour: {
            type: String,
            required: true,
        },
        realtime: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        console.log(this.direction);
        let dir = this.direction;
        if (dir == 'Aéroport Terminal 2')
            dir = 'Aéroport T2';
        else if (dir == 'Saint-Isidore')
            dir = 'St-Isidore';
        else if (dir == 'CADAM Centre Administratif')
            dir = 'CADAM';
        else if (dir == 'Port Lympia / City Center')
            dir = 'Port Lympia';
        let peta = this.eta == 0 ? 'En approche' : this.eta + ' min';
        console.log(this.realtime);
        return {
            dir: dir,
            color: this.line == 'L3'?'#009640':'#004F9F',
            peta: peta,
        }
    }
}
</script>