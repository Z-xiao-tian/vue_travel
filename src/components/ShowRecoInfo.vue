<script lang="ts" setup>
/**
 * @author Z-xiao-tian
 * 2023-6-9
 * 单个推荐旅游路线展示组件
 * ！展示图片的组件为轮播图组件，可以传入一个或多个图片
 */

import Swipper from "./Swipper.vue";
import { toRefs } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{
    /** 展示的图片，载体为轮播图组件，传入的必须为数组，可以传入一个或多个图片 */
    carousels: string[];
    /** title文字  */
    title: string;
    /** title颜色 */
    price: number;
}>();

/** 使用tRefs结构props，方便使用。 */
const { carousels, title, price } = toRefs(props);
// const siderShowPictures = ref<string[]>([]);
// carousels.value.forEach((item) => {
//     siderShowPictures.value.push(item.url);
// });
</script>
/** */
<template>
    <div class="box">
        <div class="swipper_box">
            <Swipper :carousels="carousels" fade />
        </div>
        <div class="info">
            <span class="title" @click="$attrs.handleClickTitle">{{ title }}</span>
            <span class="price">￥{{ price }} {{ t("home_page.start_from") }}</span>
        </div>
    </div>
</template>
/** */
<style lang="scss" scoped>
$info_height: 35px;
.box {
    width: 100%;
    height: 100%;
}
.swipper_box {
    height: calc(100% - $info_height);
}
.info {
    height: $info_height;
}

.title {
    background: linear-gradient(120deg, #393939 0%, #41b883 100%) no-repeat;
    background-size: 0 2px;
    background-position: right bottom;
    transition: background-size 1200ms;
    cursor: default;
    display: inline;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    overflow: hidden;
    display: -webkit-box;
    /*! autoprefixer:off */
    -webkit-box-orient: vertical;
    width: fit-content;
}
.title:hover {
    background-position-x: left;
    background-size: 100% 1px;
    color: #41b883;
}
.price {
    color: red;
    white-space: nowrap;
}
</style>
