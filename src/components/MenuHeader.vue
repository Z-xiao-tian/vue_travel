<script lang="ts" setup>
/**
 * @author Z-xiao-tian
 * 2023-6-9
 * 头部组件
 */

/* antd-vue中的地球icon组件 */
import { GlobalOutlined } from "@ant-design/icons-vue";
import logo from "@/assets/logo.svg";
/* i18n pinia仓库, router, axios */
import { useLanguageStore } from "@/stores/counter";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const languageStore = useLanguageStore();
/** 语言切换 */
const { language: languageValue, languages } = storeToRefs(languageStore);
function handleChange(value: string) {
    languageStore.changeLanguage(value);
}
const { t } = useI18n();

const router = useRouter();

/** 搜索功能 */
let searchQuery = ref("");
function onSearch(value: string) {
    router.push({ path: "/search", query: { searchQuery: value } });
}

onMounted(() => {});
</script>
/** */
<template>
    <header class="header">
        <div>
            <span class="header_title">{{ t("header.slogan") }}</span>
            <!-- 切换语言 -->
            <a-select
                ref="select"
                :value="languageValue"
                style="width: 100px"
                @change="handleChange"
            >
                <template #suffixIcon><global-outlined class="selectBtn" /></template>
                <a-select-option
                    v-for="(item, index) in languages"
                    :key="index"
                    :value="item.value"
                    :disabled="item.disabled"
                >
                    {{ item.lable }}
                </a-select-option>
            </a-select>
        </div>
        <div>
            <!-- 登录注册按钮组 -->
            <a-button-group>
                <a-button>{{ t("header.register") }}</a-button>
                <a-button @click="router.push('/login')">{{ t("header.signin") }}</a-button>
            </a-button-group>
        </div>
    </header>
    <div style="background: #ffffff">
        <div class="logo_search">
            <div class="logo" @click="router.push(`/`)">
                <img :src="logo" alt="" />
                <span>{{ t("header.title") }}</span>
            </div>
            <!-- 搜索 -->
            <a-input-search
                v-model:value="searchQuery"
                placeholder="请输入目的地、主题、或关键字"
                style="width: 400px"
                @search="onSearch"
            />
        </div>
    </div>
</template>
/** */
<style lang="scss" scoped>
.header {
    display: flex;
    padding: 10px 160px;
    justify-content: space-between;
}
.header_title {
    margin-right: 2em;
}
.selectBtn {
    font-size: 1.3em;
    color: #3b3b3b;
}

.logo_search {
    padding: 10px 160px;
    display: flex;
    align-items: center;
    cursor: default;
}
.logo {
    width: 200px;
    height: 40px;
    img {
        height: 100%;
    }
    span {
        font-weight: bolder;
        font-size: 24px;
        color: #41b883;
        margin-left: 0.5em;
    }
}
</style>
