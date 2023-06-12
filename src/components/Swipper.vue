<script lang="ts" setup>
/**
 * @author Z-xiao-tian
 * time:2023-6-9
 * 轮播图组件
 */

import { toRefs } from "vue";

const props = defineProps<{
    carousels: string[];
    fade?: boolean;
}>();
const { carousels, fade } = toRefs(props);
</script>
/** */
<template>
    <a-carousel autoplay :effect="fade ? 'fade' : ''">
        <div v-for="item in carousels" id="index" class="carsoul_item">
            <img :src="item" alt="" />
        </div>
    </a-carousel>
</template>
/** */
<style lang="scss" scoped>
.ant-carousel :deep(),
.ant-carousel :deep(.slick-slider),
.ant-carousel :deep(.slick-list) {
    height: 100%;
}
.carsoul_item {
    & img {
        height: 100%;
        width: 100%;
    }
}
</style>
