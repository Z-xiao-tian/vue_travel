<script lang="ts" setup>
import logo from "@/assets/logo.svg";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { reactive } from "vue";
import http from "@/http";

const router = useRouter();
const { t } = useI18n();

let formState = reactive({
    username: "",
    password: "",
    remember: false
});

async function onFinish(values: any) {
    console.log(values);
    const { data } = await http.post("/auth/login",{
        data:{
            email:values.username,
            password:values.password
        }
    });
    console.log(data)
}
function onFinishFailed(errorInfo: any) {
    console.log(errorInfo);
}
</script>
/** */
<template>
    <div id="login">
        <div class="login_box">
            <div class="logo" @click="router.push(`/`)">
                <img :src="logo" alt="" />
                <span>{{ t("header.title") }}</span>
            </div>
            <div>vue旅游网带你观光世界风采</div>
            <div>
                <a-form
                    :model="formState"
                    name="basic"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 16 }"
                    autocomplete="off"
                    @finish="onFinish"
                    @finishFailed="onFinishFailed"
                >
                    <a-form-item
                        label="Username"
                        name="username"
                        :rules="[{ required: true, message: 'Please input your username!' }]"
                    >
                        <a-input v-model:value="formState.username" />
                    </a-form-item>

                    <a-form-item
                        label="Password"
                        name="password"
                        :rules="[{ required: true, message: 'Please input your password!' }]"
                    >
                        <a-input-password v-model:value="formState.password" />
                    </a-form-item>

                    <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
                        <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
                    </a-form-item>

                    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                        <a-button type="primary" html-type="submit">Submit</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>
/** */
<style lang="scss" scoped>
#login {
    height: 100vh;
    background: url("@/assets/images/login_bg.svg");
}
.login_box {
    width: 50%;
    height: 50%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    // background: white;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    padding: 1em;
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
