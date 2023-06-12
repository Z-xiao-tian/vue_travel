<script lang="ts" setup>
/**
 * @author Z-xiao-tian
 * 2023-6-9
 * 主页面，进入网站后默认展示此页面
 */

/* 导入自定义组件 */
import BlockMenu from "@/components/BlockMenu.vue";
import Container from "@/components/Container.vue";
import Swipper from "@/components/Swipper.vue";
import ShowRecoInfo from "@/components/ShowRecoInfo.vue";

/* 导入静态资源 */
import carousel1 from "@/assets/images/carousel_1.jpg";
import carousel2 from "@/assets/images/carousel_2.jpg";
import carousel3 from "@/assets/images/carousel_3.jpg";
import sider1 from "@/assets/images/sider_2019_02-04.png";
import sider2 from "@/assets/images/sider_2019_02-04-2.png";
import sider3 from "@/assets/images/sider_2019_12-09.png";

/* 导入自定义插件、hook、工具封装等...*/
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import http from "@/http";

/* router对象 */
const router = useRouter();

/* 轮播图数组,在模板中循环渲染 */
let carousels = ref<string[]>([carousel1, carousel2, carousel3]);

/* 三个板块中的侧边图片资源、title文字颜色，然后将起添加到请求回来的推荐旅游路线的数据中，在模板中循环渲染 */
const siderImgArr = [sider1, sider2, sider3];
const titleColor = ["#fab647", "#fab647", "#53c637"];
const recommendedTravelRoutesList = ref<any[]>([]);
/* 为方便请求回来的数据处理，和对于网络请求的数据类型未知的问题。
将存储请求回来的数据设为any类型，导致模板渲染中会出现数据为空渲染出错的情况，此变量表示数据是否已经请求成功。
在请求数据的方法中请求成功后将其设置为true才会渲染 */
let dataIsResult = ref<boolean>(false);

/**
 * 接口数据的请求和处理
 */
async function init() {
    const { data } = await http.get("/api/productCollections");
    let workedData: any[] = [];
    data?.forEach((item: any, index: number) => {
        const { description, id, title, touristRoutes } = item;
        let DataInProcess = {
            id,
            title,
            description,
            siderImg: siderImgArr[index],
            touristRoutes,
            titleColor: titleColor[index]
        };
        workedData.push(DataInProcess);
    });
    recommendedTravelRoutesList.value = workedData;
    if (recommendedTravelRoutesList.value.length !== 0) {
        dataIsResult.value = true;
    }
}

/**
 * 点击标题进入详情页的处理
 * @param {string} id - 当前点击的标题的id，将其以路由参数传递给详情页面
 */
function handleClcikTitle(id: string) {
    console.log(id);
    router.push({ path: `/detail`, query: { id: id } });
}

/**
 * 在onMounted钩子函数中请求接口数据
 */
onMounted(() => {
    init();
});
</script>
/** */
<template>
    <div class="main_swpper">
        <a-row>
            <a-col :span="6">
                <!-- 方块形侧边菜单 -->
                <BlockMenu />
            </a-col>
            <a-col :span="1"></a-col>
            <a-col :span="17">
                <div style="height: 248px">
                    <!-- 轮播图 -->
                    <Swipper :carousels="carousels" />
                </div>
            </a-col>
        </a-row>
    </div>
    <!-- dataIsResult为false,数据为空，不渲染这里 -->
    <div v-if="dataIsResult">
        <!-- 推荐旅游路线容器，在其中显示title和定位区域的位置 -->
        <Container
            :title="item1.title"
            :titleColor="item1.titleColor"
            v-for="item1 in recommendedTravelRoutesList"
            :key="item1.id"
        >
            <!-- 容器中的内容插槽-包含侧边图片和推荐路线信息 -->
            <template #main>
                <a-layout>
                    <a-layout-sider>
                        <img :src="item1.siderImg" alt="" width="200" />
                    </a-layout-sider>
                    <a-layout-content>
                        <!-- 九个推荐旅游路线，以三行四列 grid布局排列，循环渲染recommendedTravelRoutesList.touristRoutes中的数据-->
                        <div class="info_box">
                            <div class="item" v-for="item2 in item1.touristRoutes" :id="item2.id">
                                <ShowRecoInfo
                                    :carousels="[item2.touristRoutePictures[0].url]"
                                    :title="item2.title"
                                    :price="item2.price"
                                    :handleClickTitle="() => handleClcikTitle(item2.id)"
                                ></ShowRecoInfo>
                            </div>
                        </div>
                    </a-layout-content>
                </a-layout>
            </template>
        </Container>
    </div>
    <!-- 接口数据未请求回来，渲染骨架屏 -->
    <div v-else>
        <a-skeleton active />
    </div>
</template>
/** */
<style lang="scss" scoped>
.main_swpper {
    padding: 20px 180px 0;
}
.info_box {
    $columns_width: calc(100% / 4 - 10px);
    $rows_height: calc(513px / 3 - 10px);
    padding-left: 10px;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: $columns_width $columns_width $columns_width $columns_width;
    grid-template-rows: $rows_height $rows_height $rows_height;
    & :first-child {
        grid-column: 1 / 3;
        grid-row: 1 / 3;
    }
}
.ant-layout :deep(),
.ant-layout-sider :deep() {
    background: none;
}
</style>
