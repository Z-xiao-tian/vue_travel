<script lang="ts" setup>
import { toRefs } from "vue";

const props = defineProps<{
    data: { id: number; value: string; key: string }[];
}>();

const { data } = toRefs(props);
</script>
/** */
<template>
    <table>
        <tr v-for="item in data" :key="item.id">
            <td>{{ item.key }}</td>
            <td>
                <slot name="value" v-bind="{item,data}">
                    {{ item.value }}
                </slot>
            </td>
        </tr>
    </table>
</template>
/** */
<style lang="scss" scoped>
table {
    width: 100%;
}
tr {
    height: 3em;
    border-bottom: 1px solid rgb(202, 202, 202);
}
td {
    text-align: center;
}
</style>
