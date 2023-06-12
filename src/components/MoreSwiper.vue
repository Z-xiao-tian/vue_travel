<script lang="ts" setup>
import { toRefs } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import "swiper/scss/pagination";

const props = defineProps<{
    imgArr: any[];
}>();

const { imgArr } = toRefs(props);
</script>
/** */
<template>
    <swiper :slides-per-view="3" :space-between="0" loop>
        <swiper-slide v-for="item in imgArr" :key="item.id">
            <a-image :src="item.url" />
        </swiper-slide>
        <template #pagination>
            <div class="swiper-pagination" slot="pagination"></div>
        </template>
    </swiper>
</template>
/** */
<style lang="scss" scoped>
.swiper {
    width: 100%;
    height: 100%;
}
</style>
