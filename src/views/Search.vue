<script lang="ts" setup>
import http from "@/http";
import router from "@/router";
import { ref, toRefs, watch, onUnmounted } from "vue";

const props = defineProps<{
    searchQuery: string;
}>();
const { searchQuery } = toRefs(props);

let data = ref<any>([]);
let isLoading = ref(false);
function getData(searchQuery: string) {
    isLoading.value = true;
    http.get(`/api/touristRoutes?keyword=${searchQuery}`)
        .then((res) => {
            data.value = res.data;
            console.log(`${searchQuery}`, data.value);
            isLoading.value = false;
        })
        .catch((err) => {
            if (err) data.value = [];
            console.log(err);
            isLoading.value = false;
        });
}

let stopWatch = watch(
    searchQuery,
    (searchQuery, PrevsearchQuery) => {
        getData(searchQuery);
    },
    {
        immediate: true
    }
);

onUnmounted(() => {
    stopWatch();
});
</script>
/** */
<template>
    <div class="search">
        <div v-if="!(data.length === 0) && !isLoading">
            <h1>样式就不写了数据都在这了</h1>
            <div v-for="item in data">
                {{ item }}
            </div>
        </div>
        <div v-else-if="isLoading">
            <h1 style="text-align: center;">搜索中</h1>
        </div>
        <div v-else>
            <h1 style="text-align: center;">无搜索结果</h1>
        </div>
    </div>
</template>
/** */
<style lang="scss" scoped>
.search {
    padding: 1em 200px;
}
</style>
