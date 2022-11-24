<template>
    <div class="rounded-xl bg-background border-2 flex" :style="{borderColor: color}">
        <div class="w-[90px] flex-none p-2 flex-col rounded-l-[0.5rem]" :style="{backgroundColor: color}">
            <p class="text-dark-background text-[20px] font my-auto">{{date_day}}</p>
            <p class="text-dark-background text-[14px] font">{{date_month}}</p>
            <p class="text-dark-background text-[16px] font mt-3 my-auto">{{date_time}}</p>
        </div>
        <div class="flex flex-col flex-grow relative">
            <div class="grid grid-cols-3 p-1">
                <p class="font font-bold text-[16px] mx-1 my-auto truncate" :style="{color: color}">
                    {{capitalizeFirstLetter(type)}}
                </p>
                <div class="flex gap-0 mx-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} :stroke="color" class="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p class="font text-[14px] my-auto truncate" :style="{color: color}">{{duration}} hours</p>
                </div>
                <div class="flex gap-0 mx-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} :stroke="color" class="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <p class="font text-[14px] my-auto truncate" :style="{color: color}">{{location}}</p>
                </div>
            </div>
            <p class="text-[14px] text-left text-white mx-2 line-clamp-2">{{capitalizeFirstLetter(name)}}</p>
            <div class="absolute right-0 bottom-0">
                <p class="font text-[18px] p-1 text-right text-white rounded-xl bg-[#222222dd]">
                    {{reserved}} / {{(max ?? "∞")}}
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "EventVue",
    props: {
        name: {
            type: String,
            required: true,
        },
        begin: {
            type: Date,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: false,
        },
        duration: {
            type: String,
            required: true,
        },
        reserved: {
            type: Number,
            required: true,
        },
        max: {
            type: Number,
            required: false,
        },
    },
    methods: {
        capitalizeFirstLetter(string: string) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        },
    },
    data() {
        let color = null;
        switch (this.type) {
        case "association":
            color = "#a2b3e5";
            break;
        case "extern":
            color = "#c0c0c0";
            break;
        case "challenge":
            color = "#39d88f";
            break;
        case "exam":
            color = "#ed8179";
            break;
        default:
            color = "#dddddd";
        }
        return {
            color: color,
            date_day: this.begin.toLocaleString('en-US', { weekday: 'short' }) + " " + this.begin.getDate(),
            date_month: this.begin.toLocaleString('en-US', { month: 'long' }),
            date_time: this.begin.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' }),
        };
    }
}
</script>