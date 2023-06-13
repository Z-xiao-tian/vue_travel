<script lang="ts" setup>
/**
 * @author Z-xiao-tian
 * 2023-6-9
 * Home页面，会承载其他二级页面
 */

import MenuHeader from "@/components/MenuHeader.vue";

import { ref } from "vue";
import { RouterView } from "vue-router";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

/* 头部菜单栏，元素为i18n中对应的字段 */
let menuList = ref([
    "header.home_page",
    "header.weekend",
    "header.group",
    "header.backpack",
    "header.private",
    "header.cruise",
    "header.hotel",
    "header.theme",
    "header.custom",
    "header.study",
    "header.visa",
    "header.enterprise",
    "header.high_end",
    "header.outdoor",
    "header.insurance"
]);
</script>
/** */
<template>
    <header>
        <!-- 顶部内容-包含切换语言、登录注册按钮，搜索 -->
        <MenuHeader></MenuHeader>
        <!-- 头部菜单 -->
        <div class="menu">
            <span v-for="(item, index) in menuList" :key="index">{{ t(item) }}</span>
        </div>
    </header>
    <main>
        <!-- 二级路由出口 -->
        <RouterView />
    </main>
    <footer>
        <h2 style="text-align: center; padding: 1em 0 0; box-sizing: border-box">
            <!-- 此处在i18n语言文件中使用了HTML实体字符，所以使用v-hmtl指令渲染内容 -->
            <b v-html="t(`footer.detail`)"></b>
        </h2>
        <a-divider orientation="left">
            <h2><b>合作企业</b></h2>
        </a-divider>
        <div class="footer_icons">
            <img src="@/assets/images/microsoft-80658_640.png" alt="" />
            <img src="@/assets/images/icon-720944_640.png" alt="" />
            <img src="@/assets/images/follow-826033_640.png" alt="" />
            <img src="@/assets/images/facebook-807588_640.png" alt="" />
        </div>
    </footer>
</template>
/** */
<style lang="scss" scoped>
.menu {
    width: 100%;
    background: #41b883;
    padding: 0.8em 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
footer {
    padding: 0 100px;
    & .footer_icons {
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        & img {
            width: calc(100% / 4 - 50px);
        }
    }
}
</style>
