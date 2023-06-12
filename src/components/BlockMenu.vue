<script lang="ts" setup>
/**
 * @author Z-xiao-tian
 * 2023-6-9
 * 方形侧边导航组件，暂未完成
 */

import {
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined
} from "@ant-design/icons-vue";
import { ref } from "vue";
const openKeys = ref([]);
const selectedKeys = ref([]);
function handleClick() {}
</script>
/** */
<template>
    <div class="main_menu">
        <a-menu
            v-model:openKeys="openKeys"
            v-model:selectedKeys="selectedKeys"
            style="width: 256px; height: 100%"
            mode="vertical"
            @click="handleClick"
        >
            <a-menu-item key="1">
                <template #icon>
                    <MailOutlined />
                </template>
                主题旅游
            </a-menu-item>
            <a-menu-item key="2">
                <template #icon>
                    <CalendarOutlined />
                </template>
                周边游
            </a-menu-item>
            <a-sub-menu key="sub1">
                <template #icon>
                    <AppstoreOutlined />
                </template>
                <template #title>国内游</template>
                <a-menu-item key="3">Option 3</a-menu-item>
                <a-menu-item key="4">Option 4</a-menu-item>
                <a-sub-menu key="sub1-2" title="Submenu">
                    <a-menu-item key="5">Option 5</a-menu-item>
                    <a-menu-item key="6">Option 6</a-menu-item>
                </a-sub-menu>
            </a-sub-menu>
            <a-sub-menu key="sub2">
                <template #icon>
                    <SettingOutlined />
                </template>
                <template #title>东南亚</template>
                <a-menu-item key="7">Option 7</a-menu-item>
                <a-menu-item key="8">Option 8</a-menu-item>
                <a-menu-item key="9">Option 9</a-menu-item>
                <a-menu-item key="10">Option 10</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub3">
                <template #icon>
                    <SettingOutlined />
                </template>
                <template #title>欧洲</template>
                <a-menu-item key="11">Option 7</a-menu-item>
                <a-menu-item key="12">Option 8</a-menu-item>
                <a-menu-item key="13">Option 9</a-menu-item>
                <a-menu-item key="14">Option 10</a-menu-item>
            </a-sub-menu>
        </a-menu>
    </div>
</template>
/** */
<style lang="scss" scoped>
.main_menu {
    border: 5px solid #41b883;
    width: fit-content;
}
</style>
