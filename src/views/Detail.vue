<script lang="ts" setup>
/**
 * @author Z-xiao-tian
 * 2023-6-9
 * 详情页
 */

import VertiaclTable from "@/components/VertiaclTable.vue";
import MoreSwiper from "@/components/MoreSwiper.vue";

/* 导入ant-vue-icon 购物车图标组件 */
import { ShoppingCartOutlined } from "@ant-design/icons-vue";

/* 引入dayjs日期类型，对ant-vue日期选择器value定义类型 */
import type { Dayjs } from "dayjs";
import http from "@/http";
import { ref, reactive, toRefs, onMounted, computed } from "vue";

const props = defineProps<{
    /** 当前页面展示旅游路线id */
    id: string;
}>();

const { id: travelRoadId } = toRefs(props);

/** 接收api接口的数据 */
let detail = reactive<any>({});
/** 接口调用是否完成,数据是否已返回 */
const dataIsResult = ref<boolean>(false);

/** 添加到购物车按钮是否为loading状态 */
let addShopCarBtnIsLoading = ref(false);
/** 点击添加到购物车按钮处理事件 */
function addShopCar() {
    addShopCarBtnIsLoading.value = true;
    setTimeout(() => {
        addShopCarBtnIsLoading.value = false;
    }, 2000);
}
/**表格数据 */
let tableData = computed(() => [
    {
        id: 0,
        key: "路线名称",
        value: detail.title
    },
    {
        id: 1,
        key: "价格",
        value: detail.originalPrice
    },
    {
        id: 2,
        key: "限时优惠抢购",
        value: detail.price
    },
    {
        id: 3,
        key: "领取优惠",
        value: null
    },
    {
        id: 4,
        key: "路线评价",
        value: detail.rating
    }
]);

/** 选择的日期事件 */
let selectedDate = ref<[Dayjs, Dayjs]>();

/**
 * 检测字符串是否为HTML
 * @param {string} text - 检测的字符串
 * @returns {boolean} 是HTML则返回true，反之false
 */
function isHTML(text: string): boolean {
    try {
        const fragment = new DOMParser().parseFromString(text, "text/html");
        return fragment.body.children.length > 0;
    } catch (error) {}
    return false;
}

/** 接口返回的数据中如果有html格式字符串就会添加到此计算属性中 */
let info = computed(() => {
    let obj: any = {};
    Object.keys(detail).forEach((item) => {
        if (isHTML(detail[item])) {
            obj[item] = detail[item];
        }
    });
    return obj;
});
/** info对象的键名，用在中间的导航栏中 */
let infoArr = computed(() => {
    return Object.keys(info.value);
});

/* 获取数据 */
async function init() {
    const { data } = await http.get(`/api/touristRoutes/${travelRoadId.value}`);
    detail = data;
    dataIsResult.value = true;
    console.log(detail);
}

onMounted(() => {
    init();
});
</script>
/** */
<template>
    <div class="detail">
        <div v-if="dataIsResult">
            <header class="card">
                <a-row>
                    <!-- 标题和描述 -->
                    <a-col :span="12">
                        <a-typography-title :level="4">{{ detail.title }}</a-typography-title>
                        <a-typography-text>{{ detail.description }}</a-typography-text>
                    </a-col>
                    <!-- 添加到购物车按钮 -->
                    <a-col :span="12">
                        <div class="add_shop_car">
                            <a-button
                                type="primary"
                                :loading="addShopCarBtnIsLoading"
                                @click="addShopCar"
                                danger
                            >
                                <template #icon><shopping-cart-outlined /></template>
                                放入购物车
                            </a-button>
                        </div>
                    </a-col>
                </a-row>
                <div>
                    <a-row>
                        <!-- 左边价格，图片，表格数据 -->
                        <a-col :span="12">
                            <div class="price_rating">
                                <div class="box">
                                    <span>￥</span>
                                    <span class="number">{{ detail.originalPrice }}</span>
                                    <span>/人起</span>
                                </div>
                                <div class="box">
                                    <span class="number">{{ detail.rating }}</span>
                                    <span>分</span>
                                </div>
                            </div>
                            <div class="collapse_img">
                                <MoreSwiper :img-arr="detail.touristRoutePictures"></MoreSwiper>
                                <!-- <img
                                    :src="item.url"
                                    alt=""
                                    v-for="item in detail.touristRoutePictures"
                                    :key="item.id"
                                /> -->
                            </div>
                            <div>
                                <VertiaclTable :data="tableData">
                                    <template #value="{ item: { id, key, value }, data }">
                                        <template v-if="id === 1">
                                            ￥
                                            <span style="color: red">
                                                {{ value }}
                                            </span>
                                        </template>
                                        <template v-if="id === 2">
                                            ￥
                                            <del>
                                                {{ data[2].value }}
                                            </del>
                                            ￥
                                            <span style="color: red">
                                                {{ value }}
                                            </span>
                                        </template>
                                        <template v-if="id === 3">
                                            <span v-if="value">{{ value }}</span>
                                            <span v-else>无优惠卷可领</span>
                                        </template>
                                        <template v-if="id === 4">
                                            <div v-if="value">
                                                <a-rate :value="value" allow-half />
                                                <span>{{ value }}星</span>
                                            </div>
                                            <div v-else>
                                                <span>暂无评分</span>
                                            </div>
                                        </template>
                                    </template>
                                </VertiaclTable>
                            </div>
                        </a-col>
                        <!-- 右边选择日期组件 -->
                        <a-col :span="12">
                            <div class="sekect_date">
                                <a-range-picker v-model:value="selectedDate" open />
                            </div>
                        </a-col>
                    </a-row>
                </div>
            </header>
            <main>
                <!-- 此旅游路线的信息 -->
                <div class="info">
                    <!-- 导航栏 -->
                    <div class="nav" ref="nav">
                        <a-anchor v-for="item in infoArr">
                            <a-anchor-link :href="`#${item}`" :title="item" />
                        </a-anchor>
                    </div>
                    <!-- 文章 -->
                    <div class="article">
                        <div v-for="item in infoArr" :id="item" v-html="info[item]"></div>
                    </div>
                </div>
            </main>
        </div>
        <div v-else>
            <a-skeleton active></a-skeleton>
        </div>
    </div>
</template>
/** */
<style lang="scss" scoped>
.detail {
    width: calc(100% - 300px);
    margin: 20px auto;
    padding: 10px;
}

.card {
    background: #ffffff;
    padding: 10px;
}

.add_shop_car {
    padding: 30px 20px;
}
.price_rating {
    display: flex;
    width: 100%;
    background: #fef9ee;
    justify-content: flex-start;
    padding: 0 1em;
    margin-bottom: 10px;
    & .box:has(+ .box) {
        margin-right: 4em;
    }
    & .box {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        font-size: 18px;
        & .number {
            color: red;
            font-weight: 700;
            font-size: 28px;
            span {
                display: inline-block;
                vertical-align: bottom;
            }
        }
    }
}
.collapse_img {
    display: flex;
    width: 100%;
    margin-bottom: 10px;
    & img {
        height: 200px;
        width: calc(100% / 4);
    }
}
.sekect_date {
    width: 100%;
    height: 100%;
    padding: 20px;
}

.info {
    width: 100%;
    & .nav {
        z-index: 99;
        margin: 10px 0;
        width: 100%;
        background: #ffffff;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: sticky;
        top: 20px;
        & > div {
            margin-left: 40px;
        }
    }
    & .article {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #ffffff;
    }
}
</style>
