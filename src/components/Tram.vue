<template>
    <div class="flex flex-col items-center my-4 gap-2">
        <div class="rounded-full flex p-1" :style="{backgroundColor: color}">
            <img :src="'/assets/'+type+'.svg'" alt="icon" class="w-[30px] h-[30px] m-[2px]" />
            <div class="rounded-full bg-white flex items-center ml-1">
                <p class="text-black font text-[22px] mx-2 ny-1">{{line}}</p>
            </div>
        </div>
        <div v-for="dir in directions" class="flex flex-row items-center">
            <p class="text-white font text-[22px] mx-2">{{dir.name}}</p>
            <div class="flex items-center" v-if="dir.realtime">
                <p class="text-[#02B76A] font text-[22px] mr-2">{{dir.eta}}</p>
                <img src="/assets/rt.gif" alt="real_time" class="w-[15px] h-[30px]" />
            </div>
            <p v-else class="text-white font text-[18px] py-2">{{dir.eta_hour}}</p>
        </div>
        <div v-if="(directions.length == 0)">
            <p class="text-white font text-[22px] mx-2 mb-1 pt-4 text-center">Hors Service</p>
            <p class="text-white font text-[22px] mx-2 mt-1 pb-4 text-center">Commercial</p>
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
        if (name == 'Aéroport Terminal 2')
            this.name = 'Aéroport T2';
        else if (name == 'Saint-Isidore')
            this.name = 'St-Isidore';
        else if (name == 'CADAM Centre Administratif')
            this.name = 'CADAM';
        else if (name == 'Port Lympia / City Center')
            this.name = 'Port Lympia';
        else if (name.includes('STAPS'))
            this.name = 'STAPS';
        else if (name == 'Giono / Les Pugets')
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