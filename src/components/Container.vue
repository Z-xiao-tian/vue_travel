<script lang="ts" setup>
import { toRefs } from "vue";

const props = withDefaults(
    defineProps<{
        /** title文字 */
        title: string;
        /** title颜色(可选,不传默认为#000000) */
        titleColor?: string;
    }>(),
    {
        titleColor:"#000000"
    }
);

const { title, titleColor } = toRefs(props);
</script>
/** */
<template>
    <div class="container">
        <div class="title">
            <h3>{{ title }}</h3>
        </div>
        <div>
            <slot name="main"></slot>
        </div>
    </div>
</template>
/** */
<style lang="scss" scoped>
.container {
    width: calc(100% - 200px);
    background: #ffffff;
    margin: 20px auto 0;
    padding: 20px 40px;
    box-sizing: border-box;
}
.title {
    padding: 30px 60px;
    & h3 {
        font-size: 26px;
        font-weight: bolder;
        color: v-bind(titleColor);
    }
}
</style>
