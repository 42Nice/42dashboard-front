<template>
    <div class="flex flex-col items-center my-2 gap-1 tv:gap-2">
        <div class="rounded-full flex p-1 mb-1 tv:mb-0" :style="{backgroundColor: color}">
            <img :src="'/assets/'+type+'.svg'" alt="icon" class="w-[18px] h-[18px] tv:w-[30px] tv:h-[30px] m-[2px]" />
            <div class="rounded-full bg-white flex items-center ml-1">
                <p class="text-black font text-[12px] tv:text-[22px] mx-2 ny-1">{{line}}</p>
            </div>
        </div>
        <div v-for="dir in directions" class="flex flex-row items-center">
            <p class="text-white font text-[12px] tv:text-[22px] mx-2">{{dir.name}}</p>
            <div class="flex items-center" v-if="dir.realtime">
                <p class="text-[#02B76A] font text-[12px] tv:text-[22px] mr-2">{{dir.eta}}</p>
                <img src="/assets/rt.gif" alt="real_time" class="w-[8px] h-[16px] tv:w-[15px] tv:h-[30px]" />
            </div>
            <p v-else class="text-white font text-[10px] tv:text-[18px] py-1 tv:py-2">{{dir.eta_hour}}</p>
        </div>
        <div v-if="(directions.length == 0)">
            <p class="text-white font text-[12px] tv:text-[22px] mx-2 mb-1 pt-1 tv:pt-4 text-center">Hors Service</p>
            <p class="text-white font text-[12px] tv:text-[22px] mx-2 mt-1 pt-1 tv:pb-4 text-center">Commercial</p>
        </div>
    </div>
</template>

<script lang="ts">

export class TramDirection {
    name: string;
    eta: string;
    eta_hour: string;
    realtime: boolean;

    constructor(name: string, eta: number, eta_hour: string, realtime: boolean) {
        if (name.includes('Aéroport'))
            this.name = 'Aéroport';
        else if (name == 'Saint-Isidore')
            this.name = 'St-Isidore';
        else if (name.includes('CADAM'))
            this.name = 'CADAM';
        else if (name.includes('Port Lympia'))
            this.name = 'Port Lympia';
        else if (name.includes('STAPS'))
            this.name = 'STAPS';
        else if (name.includes('Giono'))
            this.name = 'Giono';
        else
            this.name = name;
        this.eta = eta == 0 ? 'En approche' : eta + ' min';
        this.eta_hour = eta_hour;
        this.realtime = realtime;
    }
}

export default {
    name: "TramVue",
    props: {
        line: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        stop: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        directions: {
            type: Array<TramDirection>,
            required: true,
        },
    },
}
</script>