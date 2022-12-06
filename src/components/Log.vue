<script lang="ts">
export default {
    methods: {
        debug(...args: any[]) {
            if (!import.meta.env.DEV) return ;
            console.log(`[DEBUG @${new Date().toTimeString().slice(0, 8)}]`, ...args);
        }
    }
}

</script>